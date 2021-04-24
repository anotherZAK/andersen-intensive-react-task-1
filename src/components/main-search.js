import React from "react";
import {overlayClickHandle} from "../util/util.js"

class DataSearch extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  handleLoginClick(evt) {
    evt.preventDefault();
    let loginModal = document.querySelector('.login');
    let body = document.querySelector('body');

    loginModal.classList.remove('login--hide');
    body.classList.add('page--block-modal');
    document.addEventListener('click', overlayClickHandle);
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
        onClick={(evt) => this.handleLoginClick(evt)}/>
      </div>
    )
  }
}

export {
  DataSearch,
};

const Login = (props) => {
  return (
    <a onClick={(evt) => { props.onClick(evt) }}
      className="login-btn btn" href="modal-login.html">Зарегистрироваться</a>
  )
}
