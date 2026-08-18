function FilterBar({
  onCategoryChange,
  onSearchChange,
  onSortChange,
  searchTerm,
  selectedCategory,
  sortValue,
}) {
  return (
    <div className="filter-bar fade-in">
      <div className="filter-bar__fields">
        <label>
          Buscar
          <input
            type="search"
            placeholder="serum, gloss, rose, gucci..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <label>
          Categoria
          <select value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)}>
            <option value="all">Todas</option>
            <option value="beauty">Maquillaje</option>
            <option value="skin-care">Skincare</option>
            <option value="fragrances">Fragancias</option>
          </select>
        </label>

        <label>
          Ordenar
          <select value={sortValue} onChange={(event) => onSortChange(event.target.value)}>
            <option value="featured">Destacados</option>
            <option value="rating">Mejor valorados</option>
            <option value="price-asc">Precio ascendente</option>
            <option value="price-desc">Precio descendente</option>
          </select>
        </label>
      </div>

      <p className="filter-bar__hint">
        Usa los filtros para quedarte solo con lo que realmente te interesa.
      </p>
    </div>
  )
}

export default FilterBar