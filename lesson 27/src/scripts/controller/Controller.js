import $ from 'jquery';

import Collection from "../model/Collection";
import ListView from "../view/ListView";

export default class Controller {
  constructor() {
    this.collection = new Collection();
    this.listView = new ListView({
      onTodoClick: this.onTodoItemClick.bind(this),
      onDelBtnClick: this.onDeleteBtnClick.bind(this)
  });
    $('#container').append(this.listView.$todoListElement);
    this.collection.fetchTodos()
      .then(() => this.listView.renderTodosList(this.collection.listTodos));
  }

  getModelById(id) {
    return this.collection.listTodos.find((item) => item.id == id)
  }

  onTodoItemClick(id){
    const model = this.getModelById(id);
    model.changeState({completed: !model.completed})
      .then(() => this.listView.renderTodosList(this.collection.listTodos));    
  }

  onDeleteBtnClick(id){
    const model = this.getModelById(id);
    model.deleteTodo(null)
      .then(() => this.listView.renderTodosList(this.collection.listTodos));

  }
}