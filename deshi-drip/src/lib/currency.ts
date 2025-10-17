export function formatCurrencyFromCents(cents: number): string {
  return (cents / 100).toLocaleString("en-BD", {
    style: "currency",
    currency: "BDT",
    currencyDisplay: "symbol",
  });
}
