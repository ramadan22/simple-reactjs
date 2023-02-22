import React from 'react';

class SimpleClass extends React.Component {
  constructor() {
    super();
    this.state = { userName: 'Haris Ramadan' };
  };

  changeName = () => {
    this.setState({
      userName: this.state.userName === 'Haris Ramadan'
        ? 'Agung'
        : 'Haris Ramadan'
    });
  };

  render() {
    return (
      <>
        <h3>ini adalah component class</h3>
        <p>user {this.state.userName}</p>
        <button type="button" onClick={this.changeName}>Ganti Nama</button>
      </>
    );
  };
};

export default SimpleClass;