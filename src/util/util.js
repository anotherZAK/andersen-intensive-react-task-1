const sortByAbv = (prevItem, nextItem) => {
  if (prevItem.abv > nextItem.abv) {
    return 0;
  } else {
    return 1;
  }
}

const sortBySrm = (prevItem, nextItem) => {
  if (prevItem.srm > nextItem.srm) {
    return 0;
  } else {
    return 1;
  }
}

const sortByDefault = (prevItem, nextItem) => {
  if (prevItem.id > nextItem.id) {
    return 1;
  } else {
    return 0;
  }
}

const overlayClickHandle = (evt) => {
  let loginModal = document.querySelector('.login');
  let body = document.querySelector('body');

  if (!loginModal.classList.contains('login--hide') && !evt.target.classList.contains('login-btn')) {
    loginModal.classList.add('login--hide');
    body.classList.remove('page--block-modal');
  }
  
  loginModal.addEventListener('click', (evtModal) => {
    if (evtModal.target.classList.contains('login__form-close')) {
      loginModal.classList.add('login--hide');
      body.classList.remove('page--block-modal');
    }
    evtModal.stopPropagation();
  });
};

window.addEventListener('keydown', (evt) => {
  let loginModal = document.querySelector('.login');
  let body = document.querySelector('body');

  if (evt.key === 'Escape') {
    evt.preventDefault();
    loginModal.classList.add('login--hide');
    body.classList.remove('page--block-modal');
    document.removeEventListener('click', overlayClickHandle);
  }
});

export {
  overlayClickHandle,
  sortByAbv,
  sortBySrm,
  sortByDefault,
};
