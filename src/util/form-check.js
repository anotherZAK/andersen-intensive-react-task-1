const PASSWORD_LENGTH = 6;

const checkUserName = (evt, userNameValue) => {
  const userNamePattern = /[^а-я- ]/i;
  if (userNamePattern.test(evt.target.value)) {
    evt.target.setCustomValidity('Введите ФИО в формате Фамилия Имя Отчество');
    evt.target.classList.add('login__user-name--error');
    evt.target.placeholder = 'Введите ФИО в формате Фамилия Имя Отчество';
    evt.target.value = userNameValue;
  } else {
    evt.target.value = evt.target.value.replace(userNamePattern, '');
    evt.target.placeholder = 'ФИО';
    evt.target.classList.remove('login__user-name--error');
    userNameValue = evt.target.value;
    evt.target.setCustomValidity('');
  }
}

const checkUserEmail = (evt) => {
  if (!evt.target.value.includes('@')) {
    evt.target.setCustomValidity('Введите корректный email');
    evt.target.classList.add('login__user-email--error');
    evt.target.placeholder = 'Введите корректный email';
  } else {
    evt.target.placeholder = 'Email';
    evt.target.classList.remove('login__user-email--error');
    evt.target.setCustomValidity('');
  }
}

const checkUserPassword = (evt) => {
  if (evt.target.value.length < PASSWORD_LENGTH) {
    evt.target.setCustomValidity(`Введите не менее ${PASSWORD_LENGTH} символов`);
    evt.target.classList.add('login__user-password--error');
  } else {
    evt.target.classList.remove('login__user-password--error');
    evt.target.setCustomValidity('');
  }
}

export {
  checkUserName,
  checkUserEmail,
  checkUserPassword,
}