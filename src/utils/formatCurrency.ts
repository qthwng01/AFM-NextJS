export function formatPrice(amount: number): string {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  })
  return formatter.format(amount)
}

export function formatPercents(per: any) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'percent',
    currency: 'VND',
  }).format(per / 100)
}
