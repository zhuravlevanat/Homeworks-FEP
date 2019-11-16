import $ from 'jquery';

export default class ListView {
  constructor(config) {
    this.config = config;
    this.$todoListElement = this.createTodo();
    this.$todoItemTemplate = $('#todoItemTemplate').html();
    this.$todoListElement.on('click', '.todo-item', this.onTodoItemClick.bind(this));
    this.$todoListElement.on('click', '.delete-btn', this.onDeleteBtnClick.bind(this))
  }

  getElemId($elem) {
    return $elem.data('todoId');
  }

  onTodoItemClick(e){
    const id = this.getElemId($(e.target));    
    this.config.onTodoClick(id);
  }

  onDeleteBtnClick(e) {
    e.stopPropagation();
    this.config.onDelBtnClick(this.getElemId($(e.target).parent()));
  }

  createTodo() {
    return $('<div class="todo-list"></div>');
  }

  renderTodosList(data) {
    this.$todoListElement.empty();
    data.forEach(item => this.renderTodo(item));
  }

  renderTodo(todo) {
    this.$todoListElement.append(this.getTodoItemHtml(todo))
  }

  getTodoItemHtml({id, title, completed}) {
    return this.$todoItemTemplate.replace('{{title}}', title)
                                  .replace('{{id}}', id)
                                  .replace('{{doneClass}}', completed ? 'done' : '');
  }

}