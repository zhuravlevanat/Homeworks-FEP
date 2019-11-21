import $ from 'jquery';

import listView from '../view/List'
import Collection from '../model/Collection';
import Form from '../view/Form';

export default class Controller {
  constructor() {

    const container = $('#container');
    this.collection = new Collection;
    this.listView = new listView({
      onItemClick: this.onListItemClick.bind(this),
      onAddBtnClick: this.onAddUserBtnClick.bind(this)
    });

    this.formView = new Form({
      onSubmit: this.onFormSubmit.bind(this),
      onDelete: this.onDeleteBtn.bind(this),
    });
        
    container.append(this.listView.$el);
    container.append(this.formView.$el);

    this.renderData = this.renderData.bind(this);
    
    this.refreshData();
  }

  refreshData() {
    this.collection
      .fetchServerData()
      .then(this.renderData)
  }

  renderData() {
    this.listView.renderList(this.collection.list);
  }

  onListItemClick(id) {
    const model = this.collection.get(id);
    this.formView.showData(model);   
  }

  onAddUserBtnClick() {
    this.formView.openNewUserForm()
  }

  onFormSubmit(data) {
    if (data.id){
      this.collection.updateUser(data)
                        .then(this.renderData)
    } else {
    this.collection.createUser(data)
                      .then(this.renderData)
    }    
  }

  onDeleteBtn(id) {
    this.collection.deleteUser(id)
                      .then(this.renderData)
  }
    
}