import $ from 'jquery';
import  './css/normalize.css';
import  './css/skeleton.css';
import './style.css';
import {LocalStorage} from './localStorage';

class TodoList {   
  constructor() {    
    this.form = document.getElementById('addTodoForm'); 
    this.list = document.querySelector('#todoList');
    this.$addTodoForm = $('#addTodoForm');
    this.$todoNameInput = $('#todoNameInput');
    this.$todoList = $('#todoList');
    this.$todoItemTemplate = $('#todoItemTemplate').html();
    this.todoItems=[];
    this.storage;
    this.$todoNameInput.focus();
    this.init();
    this.bindEventListeners();
  }
  
  init() {
    this.getState();
    this.renderTodosInList(this.todoItems);
  }

  bindEventListeners() {
    this.$addTodoForm.on('submit', this.onAddTodoFormSubmit.bind(this));
    this.$todoList.on('click', this.onTodoListClick.bind(this));
 }

  onAddTodoFormSubmit(ev) {
    ev.preventDefault();
    this.addTodo();
  }

  onTodoListClick(event) {
    switch(true) {
      case ($(event.target).hasClass('delete-btn')):
        this.deleteTodo($(event.target).parent().data('todoId'));
      break;
      case ($(event.target).hasClass('done-btn')):
        this.toggleTodo($(event.target).parent().data('todoId'));
      break;
    }  
  }

  addTodo() {
    const newTodo = this.createTodo();
    this.setTodoValues(newTodo);
    this.displayTodoInList(newTodo);
    this.todoItems.push(newTodo);   
    this.saveState();
    this.clearInput();
  }

  createTodo() {
    return {
      title: '',
      id: Date.now(),
      isDone: false
    }
  } 

  displayTodoInList(todo) {
    this.$todoList.append(this.getTodoItemHtml(todo))

  }

  setTodoValues(todo) {
    todo.title = this.$todoNameInput.val();
  }

  getTodoItemHtml(todo) {
    return this.$todoItemTemplate.replace('{{title}}', todo.title)
                                  .replace('{{id}}', todo.id)
                                  .replace('{{doneClass}}', todo.isDone ? 'done' : '');
  }

  renderTodosInList(todos) { 
    todos.forEach(todo => this.displayTodoInList(todo));  
  } 

  getTodoById(id) {
    return $('div[data-todo-id="'+id+'"]');  
  }

  deleteTodo(id) {
    this.deleteTodoFromList(id);
    this.todoItems = this.todoItems.filter(elem => elem.id != id);
    this.saveState();
  }

  deleteTodoFromList(id) {
    this.getTodoById(id).remove();
  }

  toggleTodo(id) {
    this.getTodoById(id).toggleClass('done');
    this.todoItems.forEach(elem => {
      if (elem.id == id) {
        elem.isDone = !elem.isDone;        
      }
    });
    this.saveState();
  }

  saveState() {
    this.storage = new LocalStorage(this.todoItems);
    this.storage.setDataInLs();
  }

  getState() {
    this.storage = new LocalStorage(this.todoItems);
    this.todoItems = this.storage.getDataFromLS();
  }
  
  clearInput() {
    this.$todoNameInput.val('');
  }
}

const todo = new TodoList();
