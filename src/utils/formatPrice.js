const euroFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
})

export function getPriceBreakdown(currentValue, discountPercentage = 0) {
  const normalizedCurrent = Number(currentValue) || 0
  const normalizedDiscount = Math.max(0, Number(discountPercentage) || 0)

  if (normalizedDiscount <= 0 || normalizedDiscount >= 100) {
    return {
      current: normalizedCurrent,
      original: normalizedCurrent,
      savings: 0,
    }
  }

  const original = normalizedCurrent / (1 - normalizedDiscount / 100)

  return {
    current: normalizedCurrent,
    original,
    savings: Math.max(0, original - normalizedCurrent),
  }
}

function formatPrice(value) {
  return euroFormatter.format(value)
}

export default formatPrice