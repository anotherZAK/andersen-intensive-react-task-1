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

    this.paginationPagesFactor = 25;
    this.sortByAbv = sortByAbv;
    this.sortBySrm = sortBySrm;
    this.sortByDefault = sortByDefault;
  }

  async componentDidMount() {
    const pages = 5;
    let response = null;
    let allData = [];
    let errorMessage;
    for (let i = 1; i <= pages; i++) {
      let responseData = [];
      response = await fetch(`https://api.punkapi.com/v2/beers?page=${i}&per_page=80`);
      if (response.ok) {
        responseData[i] = await response.json();
        allData = allData.concat(...responseData[i]);
      } else {
        errorMessage = response.status;
      }
    }
    if (allData.length) {
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

  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <div className="catalog">
          <h1>Brewdog's DIY Dog</h1>
          <ModalLogin />
          <DataSearch
            value={this.state}
            onInput={(evt) => this.handleSearchInput(evt)}
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
      );
    }
  }
}

export {
  LoadDataComponent
};

const ModalLogin = () => {
  return (
    <section className="login login--hide">
      <h2>Форма регистрации</h2>
      <form className="login__form login__user" method="#" action="#">
        <label htmlFor="login-user-name-id">Фамилия, имя, отчество</label>
        <input
          className="login__user-name"
          type="text"
          id="login-user-name-id"
          name="login-user-name"
          placeholder="ФИО"
          required>
        </input>
        <label htmlFor="login-user-date-id">Дата рождения</label>
        <input
          className="login__user-date"
          type="date"
          id="login-user-date-id"
          name="login-user-date"
          placeholder="дд.мм.гггг"
          required>
        </input>
        <label htmlFor="login-user-email-id">Электронная почта</label>
        <input
          className="login__user-email"
          type="email"
          id="login-user-email-id"
          name="login-user-email"
          placeholder="user@mail.com"
          required>
        </input>
        <label htmlFor="login-user-password-id">Пароль</label>
        <input
          className="login__user-password"
          type="password"
          id="login-user-password-id"
          name="login-user-password"
          minLength="6"
          required>
        </input>
        <button className="login-submit btn" type="submit">Зарегистрироваться</button>
        <button className="login__form-close btn-close" aria-label="Закрыть модальное окно"></button>
      </form>
    </section>
  )
}
