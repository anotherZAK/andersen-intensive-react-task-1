import React from "react";

class DataSearch extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  handleLoginClick() {
    let loginModal = document.querySelector('.login');

    loginModal.classList.remove('login--hide');
  }

  render() {
    return (
      <div className="search">
        <form className="search__form">
          <label htmlFor="main-search-id" aria-label="Поиск"></label>
          <input
            className="search__field"
            type="text"
            id="main-search-id"
            name="main-search"
            placeholder="Поиск..."
            onInput={(evt) => { this.props.onInput(evt) }}>
          </input>
        </form>
        <Login 
        onClick={() => this.handleLoginClick()}/>
      </div>
    )
  }
}

export {
  DataSearch,
};

const Login = (props) => {
  return (
    <button onClick={() => { props.onClick() }}
      className="login-btn btn" type="button">Зарегистрироваться</button>
  )
}
