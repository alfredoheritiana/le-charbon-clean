/**
 * Mauritian Rupee (MUR / Rs) Price formatting helper for Le Charbon
 */

export function formatPrice(amount: number): string {
  // e.g. 350 -> "Rs 350"
  return `Rs ${amount}`;
}

export function formatPriceTiers(prices: Record<string, number>): string {
  const entries = Object.entries(prices);
  if (entries.length === 0) return '';
  if (entries.length === 1) {
    return `Rs ${entries[0][1]}`;
  }
  return entries.map(([tier, price]) => `${tier} Rs ${price}`).join(' / ');
}
