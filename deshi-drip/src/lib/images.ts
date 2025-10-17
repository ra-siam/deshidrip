export function firstImage(images: unknown): string | undefined {
  if (Array.isArray(images) && images.length > 0 && typeof images[0] === 'string') {
    return images[0] as string
  }
  return undefined
}
