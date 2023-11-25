export default function bytesToMegabytes(bytes: number): number {
  const megabytes = bytes / (1024 * 1024)
  return Math.round(megabytes * 100) / 100 // Round to two decimal places
}
