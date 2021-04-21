const Sort = (props) => {
  return (
    <div className="catalog__nav">
      <p>Сортировать:</p>
      <ul className="catalog__sort-list"
        onClick={(evt) => { props.onClick(evt) }}>
        <li className="catalog__sort-item"><button className="catalog__sort-btn btn btn--sort-default">По умолчанию</button></li>
        <li className="catalog__sort-item"><button className="catalog__sort-btn btn btn--sort-abv">По крепости</button></li>
        <li className="catalog__sort-item"><button className="catalog__sort-btn btn btn--sort-srm">По цветности</button></li>
      </ul>
    </div>
  )
};

export {
  Sort,
};
