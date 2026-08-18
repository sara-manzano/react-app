import { useContext } from 'react'
import { ShopContext } from './ShopContext'

function useShop() {
  const context = useContext(ShopContext)

  if (!context) {
    throw new Error('useShop must be used within ShopProvider')
  }

  return context
}

export { useShop }