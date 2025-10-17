export function formatPriceFromCents(priceCents: number, currency: string = 'USD'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  })
  return formatter.format(priceCents / 100)
}
