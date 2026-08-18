import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import CheckoutPage from './pages/CheckoutPage'
import FavoritesPage from './pages/FavoritesPage'
import HomePage from './pages/HomePage'
import './App.css'

const CATALOG_SOURCES = [
  {
    id: 'beauty',
    label: 'Maquillaje',
    url: 'https://dummyjson.com/products/category/beauty',
  },
  {
    id: 'fragrances',
    label: 'Fragancias',
    url: 'https://dummyjson.com/products/category/fragrances',
  },
  {
    id: 'skin-care',
    label: 'Skincare',
    url: 'https://dummyjson.com/products/category/skin-care',
  },
]

function App() {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortValue, setSortValue] = useState('featured')

  useEffect(() => {
    async function loadCatalog() {
      setStatus('loading')
      setErrorMessage('')

      const responses = await Promise.allSettled(
        CATALOG_SOURCES.map(async (source) => {
          const response = await fetch(source.url)

          if (!response.ok) {
            throw new Error(`No fue posible cargar ${source.label.toLowerCase()}.`)
          }

          const data = await response.json()
          return (data.products ?? []).map((product) => ({
            ...product,
            cosmeticLabel: source.label,
          }))
        }),
      )

      const availableProducts = responses
        .filter((response) => response.status === 'fulfilled')
        .flatMap((response) => response.value)

      if (availableProducts.length > 0) {
        setProducts(availableProducts)
        setStatus('success')
        return
      }

      const firstError = responses.find((response) => response.status === 'rejected')
      setStatus('error')
      setErrorMessage(firstError?.reason?.message ?? 'No fue posible cargar la coleccion.')
    }

    loadCatalog()
  }, [])

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    let list = [...products]

    if (normalizedSearch) {
      list = list.filter((product) => {
        const fullText = `${product.title} ${product.brand} ${product.description}`.toLowerCase()
        return fullText.includes(normalizedSearch)
      })
    }

    if (selectedCategory !== 'all') {
      list = list.filter((product) => product.category === selectedCategory)
    }

    if (sortValue === 'price-asc') {
      list.sort((first, second) => first.price - second.price)
    }

    if (sortValue === 'price-desc') {
      list.sort((first, second) => second.price - first.price)
    }

    if (sortValue === 'rating') {
      list.sort((first, second) => second.rating - first.rating)
    }

    return list
  }, [products, searchTerm, selectedCategory, sortValue])

  const featuredProducts = useMemo(() => products.slice(0, 3), [products])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={
            <HomePage
              errorMessage={errorMessage}
              featuredProducts={featuredProducts}
              filteredProducts={filteredProducts}
              onCategoryChange={setSelectedCategory}
              onSearchChange={setSearchTerm}
              onSortChange={setSortValue}
              productsCount={products.length}
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              sortValue={sortValue}
              status={status}
            />
          }
        />
        <Route element={<FavoritesPage products={products} />} path="favoritos" />
        <Route element={<CheckoutPage />} path="pedido" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Route>
    </Routes>
  )
}

export default App
