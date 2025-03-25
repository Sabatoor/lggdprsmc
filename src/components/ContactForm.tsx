'use client'

declare global {
  interface Window {
    grecaptcha: any
  }
}

import * as React from 'react'
import { FormSlice } from '../../prismicio-types'
import { cn } from '@/app/lib/cn'
import { KeyTextField } from '@prismicio/client'
import { useForm } from 'react-hook-form'
import { addContact } from '@/app/actions'

type FormValues = {
  email: string
  fullName: string
  message: string
  token?: string
}

const ContactForm = (data: FormSlice): React.JSX.Element => {
  const {
    primary: {
      name_label,
      name_placeholder,
      email_label,
      email_placeholder,
      message_label,
      message_placeholder,
      button_text,
    },
  } = data

  const {
    register,
    trigger,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>()

  const [success, setSuccess] = React.useState<boolean | null>(null)
  const [formInteraction, setFormInteraction] = React.useState(false)

  const handleFocus = () => {
    !formInteraction && setFormInteraction(true)
  }

  React.useEffect(() => {
    if (formInteraction) {
      const recaptchaScript = document.createElement('script')
      recaptchaScript.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`
      recaptchaScript.async = true
      recaptchaScript.defer = true
      document.head.appendChild(recaptchaScript)
      return () => {
        // Get all script tags: returns HTMLcollection
        const scripts = document.head.querySelectorAll('script')
        // Loop through the HTMLcollection (array-like but not array)
        for (var i = 0; i < scripts.length; i++) {
          // find script whose src value includes "recaptcha/releases"
          // this script is added when main recaptcha script is loaded

          if (
            scripts?.item(i)?.attributes.getNamedItem('src') &&
            scripts
              ?.item(i)
              ?.attributes?.getNamedItem('src')
              ?.value.includes('recaptcha/releases')
          ) {
            document.head.removeChild(scripts.item(i)) // remove script from head
          }
        }
        document.head.removeChild(recaptchaScript) // remove main recaptcha script from head
        // remove the recaptcha badge from the bottom right corner
        let badge = document.querySelector('.grecaptcha-badge')
        if (badge?.parentElement) {
          badge.parentElement.remove()
        }
      }
    }
  }, [formInteraction])

  type SubmitButtonProps = {
    text?: KeyTextField
  }

  function SubmitButton({
    text = 'Submit',
  }: SubmitButtonProps): React.JSX.Element {
    return (
      <button
        disabled={isSubmitting}
        type="submit"
        aria-disabled={isSubmitting}
        className={cn(
          'my-4 inline-block rounded-lg bg-skin-button-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in hover:bg-skin-button-primary-hover hover:shadow-sm',
        )}
      >
        {text}
      </button>
    )
  }

  return (
    <>
      {success === true && (
        <p className="text-color-primary text-xl">
          Thank you for sending us a message. We will contact you soon.
        </p>
      )}
      {success !== true && (
        <form
          className="my-6 flex flex-col gap-y-4"
          action={async (formData: FormData) => {
            trigger()
            if (!isValid) return
            // calling server action passed into the client component here (if the form is valid)
            window.grecaptcha.ready(() => {
              window.grecaptcha
                .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
                  action: 'submit',
                })
                .then(async (recaptchaToken: string) => {
                  formData.set('token', recaptchaToken)
                  const { message } = await addContact(formData)
                  if (message === 200) {
                    reset()
                    setSuccess(true)
                  }
                })
            })
          }}
        >
          <div
            className={cn('grid gap-3', {
              'gap-y-14': errors.email || errors.fullName,
            })}
          >
            <div className="relative">
              {errors?.fullName && (
                <p className="error-text absolute -top-10">
                  {' '}
                  &darr; {errors?.fullName?.message}
                </p>
              )}
              <label htmlFor={'fullName'}>
                <span className="sr-only">
                  {name_label || 'What is your full name?'}
                </span>
                <input
                  id="fullName"
                  {...register('fullName', {
                    required: 'Your full name is required.',
                  })}
                  type="text"
                  placeholder={name_placeholder || 'Enter your name here'}
                  className={`input form-input`}
                  onFocus={handleFocus}
                />
              </label>
            </div>
            <div className="relative">
              {errors?.email && (
                <p className="error-text absolute -top-10">
                  {' '}
                  &darr; {errors?.email?.message}
                </p>
              )}
              <label htmlFor={'email'}>
                <span className="sr-only">
                  {email_label || 'What is your email address?'}
                </span>
                <input
                  id="email"
                  {...register('email', {
                    required: 'Your email address is required.',
                  })}
                  type="email"
                  placeholder={email_placeholder || 'Enter your email here'}
                  className={`input form-input`}
                  onFocus={handleFocus}
                />
              </label>
            </div>
            <div className="relative">
              {errors?.message && (
                <p className="error-text absolute -top-10">
                  {' '}
                  &darr; {errors?.message?.message}
                </p>
              )}
              <label htmlFor={'message'}>
                <span className="sr-only">
                  {message_label || 'What is your message?'}
                </span>
                <textarea
                  id="message"
                  {...register('message', {
                    required: 'Your message is required.',
                  })}
                  placeholder={message_placeholder || 'Enter your message here'}
                  className={`input form-input`}
                  onFocus={handleFocus}
                  rows={5}
                />
              </label>
            </div>
          </div>

          <div className="mx-auto max-w-sm">
            <SubmitButton text={button_text} />
            <p className="prose prose-sm mt-3 prose-a:no-underline prose-a:hover:underline">
              This site is protected by reCAPTCHA and the{' '}
              <a href="https://policies.google.com/privacy">
                Google Privacy Policy
              </a>{' '}
              and{' '}
              <a href="https://policies.google.com/terms">Terms of Service</a>{' '}
              apply.
            </p>
          </div>
        </form>
      )}
    </>
  )
}

export default ContactForm
