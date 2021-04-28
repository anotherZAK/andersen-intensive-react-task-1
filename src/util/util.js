const sortByAbv = (prevItem, nextItem) => {
  if (prevItem.abv > nextItem.abv) {
    return 0;
  } else {
    return 1;
  }
};

const sortBySrm = (prevItem, nextItem) => {
  if (prevItem.srm > nextItem.srm) {
    return 0;
  } else {
    return 1;
  }
};

const sortByDefault = (prevItem, nextItem) => {
  if (prevItem.id > nextItem.id) {
    return 1;
  } else {
    return 0;
  }
};

export {
  sortByAbv,
  sortBySrm,
  sortByDefault,
};
