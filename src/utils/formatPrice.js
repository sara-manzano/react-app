const euroFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
})

function formatPrice(value) {
  return euroFormatter.format(value)
}

export default formatPrice