import React from 'react';

class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      props
    }
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <button>Button</button>
      </div>
    )
  }
}

export {
  Sort
}