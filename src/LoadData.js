import React from 'react';

class LoadDataComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    }
  }

  async componentDidMount() {
    const url = 'https://api.punkapi.com/v2/beers';
    let response = await fetch(url);

    if (response.ok) {
      let responseData = await response.json();
      this.setState({
        isLoaded: true,
        data: responseData,
      });
    } else {
      this.setState({
        error: response.status,
      });
    }
  }

  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else
      return (
        <div className="product">
          <ul className="product__list">
            {data.map(item => (
              <li className="product__item" key={item.id} >
                <div>
                  <h2>{item.name}</h2>
                  <img src={item.image_url} width='4%' alt={item.name} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
  }
}

export {
  LoadDataComponent
};
