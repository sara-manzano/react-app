import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'lumina-beauty-favorites'
const CART_STORAGE_KEY = 'lumina-beauty-cart'

const INITIAL_CHECKOUT_FORM = {
  name: '',
  email: '',
  address: '',
  notes: '',
}

const INITIAL_CONTACT_FORM = {
  name: '',
  email: '',
  service: 'Maquillaje editorial',
  message: '',
}

const ShopContext = createContext(null)

function readStoredList(storageKey) {
  const storedValue = localStorage.getItem(storageKey)

  if (!storedValue) {
    return []
  }

  try {
    return JSON.parse(storedValue)
  } catch {
    return []
  }
}

function ShopProvider({ children }) {
  const [favorites, setFavorites] = useState(() => readStoredList(STORAGE_KEY))
  const [cartItems, setCartItems] = useState(() => readStoredList(CART_STORAGE_KEY))
  const [checkoutForm, setCheckoutForm] = useState(INITIAL_CHECKOUT_FORM)
  const [contactForm, setContactForm] = useState(INITIAL_CONTACT_FORM)
  const [checkoutStatus, setCheckoutStatus] = useState('idle')
  const [contactStatus, setContactStatus] = useState('idle')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const toggleFavorite = useCallback((productId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(productId)
        ? currentFavorites.filter((favoriteId) => favoriteId !== productId)
        : [...currentFavorites, productId],
    )
  }, [])

  const addToCart = useCallback((product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [
        ...currentItems,
        {
          id: product.id,
          brand: product.brand,
          price: product.price,
          quantity: 1,
          thumbnail: product.thumbnail,
          title: product.title,
        },
      ]
    })
  }, [])

  const updateCartQuantity = useCallback((productId, change) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + change } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== productId))
  }, [])

  const handleCheckoutChange = useCallback((field, value) => {
    setCheckoutForm((currentForm) => ({ ...currentForm, [field]: value }))
  }, [])

  const handleContactChange = useCallback((field, value) => {
    setContactForm((currentForm) => ({ ...currentForm, [field]: value }))
  }, [])

  const handleCheckoutSubmit = useCallback((event) => {
    event.preventDefault()

    if (cartItems.length === 0) {
      setCheckoutStatus('empty')
      return
    }

    setCheckoutStatus('success')
    setCartItems([])
    setCheckoutForm(INITIAL_CHECKOUT_FORM)
  }, [cartItems.length])

  const handleContactSubmit = useCallback((event) => {
    event.preventDefault()
    setContactStatus('success')
    setContactForm(INITIAL_CONTACT_FORM)
  }, [])

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const value = useMemo(
    () => ({
      addToCart,
      cartCount,
      cartItems,
      checkoutForm,
      checkoutStatus,
      contactForm,
      contactStatus,
      favorites,
      handleCheckoutChange,
      handleCheckoutSubmit,
      handleContactChange,
      handleContactSubmit,
      removeFromCart,
      subtotal,
      toggleFavorite,
      updateCartQuantity,
    }),
    [
      addToCart,
      cartCount,
      cartItems,
      checkoutForm,
      checkoutStatus,
      contactForm,
      contactStatus,
      favorites,
      handleCheckoutChange,
      handleCheckoutSubmit,
      handleContactChange,
      handleContactSubmit,
      removeFromCart,
      subtotal,
      toggleFavorite,
      updateCartQuantity,
    ],
  )

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export { ShopContext, ShopProvider }