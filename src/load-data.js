import React from 'react';
import { sortByAbv, sortBySrm, sortByDefault } from "./util/util.js";
import { Sort } from "./components/sort.js";
import { DataSearch } from "./components/main-search.js";

class LoadDataComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      originalData: [],
      sort: null,
    }

    this.sortByAbv = sortByAbv;
    this.sortBySrm = sortBySrm;
    this.sortByDefault = sortByDefault;
  }

  async componentDidMount() {
    const url = 'https://api.punkapi.com/v2/beers';
    let response = await fetch(url);

    if (response.ok) {
      let responseData = await response.json();
      this.setState({
        isLoaded: true,
        data: responseData,
        originalData: responseData,
        sort: 'sortByDefault',
      });
    } else {
      this.setState({
        error: response.status,
      });
    }
  }

  handleClick(evt) {
    const catalog = this.state.data.slice();

    if (evt.target.classList.contains('btn--sort-abv') && this.state.sort !== 'sortByAbv') {
      let catalogSortedByAbv = catalog.sort(this.sortByAbv);
      this.setState({
        data: catalogSortedByAbv,
        sort: 'sortByAbv',
      });
    } else if ((evt.target.classList.contains('btn--sort-srm') && this.state.sort !== 'sortBySrm')) {
      let catalogSortedBySrm = catalog.sort(this.sortBySrm);
      this.setState({
        data: catalogSortedBySrm,
        sort: 'sortBySrm',
      });
    } else if ((evt.target.classList.contains('btn--sort-default') && this.state.sort !== 'sortByDefault')) {
      let catalogSortedByDefault = catalog.sort(this.sortByDefault);
      this.setState({
        data: catalogSortedByDefault,
        sort: 'sortByDefault',
      });
    }
  }

  handleSearchInput(evt) {
    const catalog = this.state.originalData.slice();
    let filteredCatalog = catalog.filter((item) => {
      return item.name.toLowerCase().includes(evt.target.value.toLowerCase());
    });

    this.setState({
      data: filteredCatalog,
    });
  }

  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else
      return (
        <div className="catalog">
          <h1>Brewdog's DIY Dog</h1>
          <DataSearch
            value={this.state}
            onInput={(evt) => this.handleSearchInput(evt)}
          />
          <Sort
            value={this.state}
            onClick={(evt) => this.handleClick(evt)} />
          <div className="product">
            <ul className="product__list">
              {data.map(item => (
                <li className="product__item" key={item.id} >
                  <div className="product__card">
                    <a href="https://punkapi.com" target="_blank" rel="noreferrer">
                      <h2>{item.name}</h2>
                      <p>Крепость пива: {item.abv}</p>
                      <p>Цветность пива: {item.srm}</p>
                      <img src={item.image_url} width='15%' height="auto" alt={item.name} />
                      <p>{item.description}</p>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
  }
}

export {
  LoadDataComponent
};
