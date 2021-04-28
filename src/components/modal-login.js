const ModalLogin = (props) => {
  return (
    <section className= "login">
      <h2>Форма регистрации</h2>
      <form
        onInput={(evt) => props.onInput(evt)}
        onSubmit={(evt) => props.onSubmit(evt)}
        className="login__form login__user" method="#" action="#">
        <label htmlFor="login-user-name-id">Фамилия, имя, отчество</label>
        <input
          className="login__user-name"
          type="text"
          id="login-user-name-id"
          name="login-user-name"
          placeholder="ФИО"
          maxLength="60"
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
          placeholder="Email"
          required>
        </input>
        <label htmlFor="login-user-password-id">Пароль</label>
        <input
          className="login__user-password"
          type="password"
          id="login-user-password-id"
          name="login-user-password"
          minLength="6"
          maxLength="24"
          required>
        </input>
        <button className="login-submit btn" type="submit">Зарегистрироваться</button>
        <button className="login__form-close btn-close" type="button" aria-label="Закрыть модальное окно"></button>
      </form>
    </section>
  )
}

export {
  ModalLogin
};
