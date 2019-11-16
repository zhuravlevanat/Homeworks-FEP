import config from '../config';
import Model from './Model';

export default class Collection {
  constructor() {
    this.listTodos = [];
  }

  fetchTodos() {
    return fetch(config.todosUrl)
      .then(resp => resp.json())
      .then((data) => this.setData(data));
  }

  setData(data) {
    this.listTodos = data.map((item) => new Model(item));
  }
}