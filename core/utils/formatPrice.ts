export default function formatPrice(price: string | number): string {
  const priceNumber = typeof price === 'string' ? Number(price) : price
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB'
  }).format(priceNumber)
}
