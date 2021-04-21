const DataSearch = (props) => {
  return (
    <div className="search">
      <form className="search__form">
        <input
          className="search__field"
          type="text"
          id="main-search-id"
          name="main-search"
          placeholder="Поиск..."
          onInput={(evt) => { props.onInput(evt) }}>
        </input>
      </form>
    </div>
  )
}

export {
  DataSearch,
};
