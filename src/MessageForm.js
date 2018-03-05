// @flow

import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

type State = {
  name: string,
  message: string
};

export default class MessageForm extends Component<Object, State> {
  constructor() {
    super();
    this.state = {
      name: '',
      message: ''
    };
  }

  handleNameChange = ({ target }: { target: Object }): void => {
    this.setState({
      name: target.value // обновить значения поля Имя
    });
  };

  handleMessageChange = ({ target }: { target: Object }): void => {
    this.setState({
      message: target.value // Обновить значение поля Сообщение
    });
  };

  handleSubmit = (e: Object) => {
    console.log(e);
    e.preventDefault();
    // При запросе на отправку и заполненных полях вызвать обработчик отправки с данными из полей
    if (this.state.name && this.state.message && this.props.onSubmit) {
      this.props.onSubmit({
        name: this.state.name,
        message: this.state.message
      });
    }
  };

  render() {
    return (
      <MuiThemeProvider>
        <form onSubmit={this.handleSubmit}>
          <TextField
            fullWidth={true}
            hintText="Введите имя"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <TextField
            fullWidth={true}
            multiline={true}
            hintText="Введите сообщение"
            value={this.state.message}
            onChange={this.handleMessageChange}
          />
          <RaisedButton
            label="Submit"
            primary={true}
            onClick={this.handleSubmit}
          />
        </form>
      </MuiThemeProvider>
    );
  }
}
