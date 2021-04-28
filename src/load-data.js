import React from 'react';
import { sortByAbv, sortBySrm, sortByDefault } from "./util/util.js";
import { checkUserName, checkUserEmail, checkUserPassword } from "./util/form-check.js"
import { Sort } from "./components/sort.js";
import { DataSearch } from "./components/main-search.js";
import { ModalLogin } from "./components/modal-login.js";

class LoadDataComponent extends React.Component {
  constructor(props, keyDownHandler) {
    super(props);
    this.keyDownHandler = keyDownHandler;
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      originalData: [],
      sort: null,
      isLoginModalHide: true,
    }

    this.paginationPagesFactor = 25;
    this.sortByAbv = sortByAbv;
    this.sortBySrm = sortBySrm;
    this.sortByDefault = sortByDefault;
    this.handleModalLogin = this.handleModalLogin.bind(this);
  }

  async componentDidMount() {
    const pages = 5;
    let response = null;
    let allData = [];
    let errorMessage;
    for (let i = 1; i <= pages; i++) {
      let responseData = [];
      try {
        response = await fetch(`https://api.punkapi.com/v2/beers?page=${i}&per_page=80`);
        responseData[i] = await response.json();
        allData = allData.concat(...responseData[i]);
      } catch (error) {
        errorMessage = response.status;
      }
    }
    if (allData.length) {
      window.addEventListener("keydown", (evt) => {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          this.setState({
            isLoginModalHide: true,
          });
        }
      });
      this.setState({
        isLoaded: true,
        data: allData.slice(0, this.paginationPagesFactor),
        originalData: allData.slice(0, this.paginationPagesFactor),
        sort: 'sortByDefault',
      });
    } else {
      this.setState({
        error: errorMessage
      });
    }
  }

  handleSortClick(evt) {
    const catalog = this.state.data;
    let sortBtns = document.querySelectorAll('.catalog__sort-btn');
    for (const sortBtn of sortBtns) {
      sortBtn.classList.remove('btn--active');
    }

    if (evt.target.classList.contains('btn--sort-abv') && this.state.sort !== 'sortByAbv') {
      evt.target.classList.add('btn--active');
      let catalogSortedByAbv = catalog.sort(this.sortByAbv);
      this.setState({
        data: catalogSortedByAbv,
        sort: 'sortByAbv',
      });
    } else if ((evt.target.classList.contains('btn--sort-srm') && this.state.sort !== 'sortBySrm')) {
      evt.target.classList.add('btn--active');
      let catalogSortedBySrm = catalog.sort(this.sortBySrm);
      this.setState({
        data: catalogSortedBySrm,
        sort: 'sortBySrm',
      });
    } else if ((evt.target.classList.contains('btn--sort-default') && this.state.sort !== 'sortByDefault')) {
      evt.target.classList.add('btn--active');
      let catalogSortedByDefault = catalog.sort(this.sortByDefault);
      this.setState({
        data: catalogSortedByDefault,
        sort: 'sortByDefault',
      });
    }
  }

  handleSearchInput(evt) {
    let catalog;
    switch (this.state.sort) {
      case 'sortByAbv':
        catalog = this.state.originalData.sort(this.sortByAbv);
        break;
      case 'sortBySrm':
        catalog = this.state.originalData.sort(this.sortBySrm);
        break;
      case 'sortByDefault':
        catalog = this.state.originalData.sort(this.sortByDefault);
        break;
      default:
        break;
    }

    let filteredCatalog = catalog.filter((item) => {
      return item.name.toLowerCase().includes(evt.target.value.toLowerCase());
    });

    this.setState({
      data: filteredCatalog,
    });
  }

  handleFormCheck(evt) {
    if (evt.target.classList.contains('login__user-name')) {
      let userNameInputValue = null;
      checkUserName(evt, userNameInputValue);
    } else if (evt.target.classList.contains('login__user-email')) {
      checkUserEmail(evt);
    } else if (evt.target.classList.contains('login__user-password')) {
      checkUserPassword(evt);
    }
  }

  handleFormSubmit(evt) {
    evt.preventDefault();
    this.setState({
      isLoginModalHide: true,
    });
  }

  handleModalLogin(value) {
    this.setState({
      isLoginModalHide: value,
    });
  }

  handleDocumentClick(evt) {
    if (evt.target.classList.contains('container-edge--fixed') || evt.target.classList.contains('login__form-close')) {
      this.handleModalLogin(true);
    }
  }

  render() {
    const { error, isLoaded, data, isLoginModalHide } = this.state;
    if (error) {
      return <div className="launch launch--error">Ошибка. Код ошибки: {error}</div>;
    } else if (!isLoaded) {
      return <div className="launch launch--loading">Загрузка...</div>;
    } else {
      return (
        <div
          onClick={(evt) => this.handleDocumentClick(evt)}
          className={isLoginModalHide ? "container-edge" : "container-edge container-edge--fixed"}>
          <div className="catalog">
            <h1>Brewdog's DIY Dog</h1>
            {
              !isLoginModalHide &&
              <ModalLogin
                value={this.state}
                onInput={(evt) => this.handleFormCheck(evt)}
                onSubmit={(evt) => this.handleFormSubmit(evt)}
              />
            }
            <DataSearch
              value={this.state}
              onInput={(evt) => this.handleSearchInput(evt)}
              modalLogin={this.handleModalLogin}
            />
            <Sort
              value={this.state}
              onClick={(evt) => this.handleSortClick(evt)} />
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
        </div>
      );
    }
  }
}

export {
  LoadDataComponent
};
