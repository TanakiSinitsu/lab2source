// @flow
import React, { Component } from 'react';
import axios from 'axios';
import shortid from 'shortid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Paper, RaisedButton } from 'material-ui';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import MessageForm from './MessageForm'; // Компонент формы

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/hse_board/'
    : 'https://tsynitsina.azurewebsites.net/hse_board'; // Если в режиме разработки, отправлять запросы на локальную машину

const api = axios.create({
  baseURL
}); // Создать обработчик запросов к серверу

type State = {
  todoList: Array<Todo>
};

class App extends Component<*, State> {
  constructor() {
    super();

    this.state = {
      messages: [] // Начальное состояние приложения
    };
  }

  // Когда компонент захочет отрисоваться
  componentWillMount() {
    // сделать запрос для подгрузки сообщений
    api.get('/messages').then(response => {
      // когда получим ответ от сервера
      const messages = response.data.messages;
      this.setState({ messages }); // обновить состояние приложения, устновив сообщения принятые от сервера
    });
  }

  sendMessage = ({ name, message }: Object): void => {
    const data = {
      message,
      name
    };
    // отправить сообщение используя данные полученые из MessageForm
    api.post('/messages', data).then(response => {
      const message = response.data.message;
      this.setState(({ messages }) => ({ messages: [message, ...messages] }));
    });
  };

  deleteMessage = (id: string) => {
    api.delete('/messages/' + id).then(() => {
      this.setState(({ messages }) => ({
        messages: messages.filter(message => message.id !== id)
      }));
    });
  };

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <AppBar title="HSE Message Board" />

          <MessageForm onSubmit={this.sendMessage} />

          <div>
            {/*
              * Отображениe списка сообщений
              */}
            {this.state.messages.map((message, index) => (
              <div key={message.id} className="message">
                <Paper style={{ padding: '16px' }}>
                  <div>Имя: {message.name}</div>
                  <div>Сообщение: {message.message}</div>
                  <RaisedButton onClick={() => this.deleteMessage(message.id)}>
                    Удалить
                  </RaisedButton>
                </Paper>
              </div>
            ))}
          </div>
        </MuiThemeProvider>
        <div className="footer">by Tatiana Sinitsyna</div>
      </div>
    );
  }
}

export default App;
