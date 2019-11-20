import $ from 'jquery';

import listView from '../view/List'
import Collection from '../model/Collection';
import Form from '../view/Form';

export default class Controller {
  constructor() {

    const container = $('#container');
    this.collection = new Collection;
    this.listView = new listView({
      onItemClick: this.onListItemClick.bind(this)
    });
    this.formView = new Form({
      onSubmit: this.onFormSubmit.bind(this),
    });
        
    container.append(this.listView.$el);
    this.listView.$el.after(this.listView.$addBtn);
    container.append(this.formView.$el);
    

    this.collection.fetchServerData()
      .then(() => this.listView.renderList(this.collection.list))

  }

  onFormSubmit(data) {
    if (data.id){
      this.collection.updateUser(data)
        .then(() => this.listView.renderList(this.collection.list))
  } else {
    console.log('adding')
      this.collection.createUser(data)
        .then(() => this.listView.renderList(this.collection.list))
  }
    //this.collection.add(data)
      
 
    
  }

  onListItemClick(id) {
    const model = this.collection.list.find(item => item.id == id);
    this.formView.showData(model);
      

  //   console.log('clicked', id);
  //   const model = this.collection.list.find(item => item.id == id);

  //   model.showData(id)
  //     .then(() => this.listView.renderList(this.collection.list))
  //     console.log('model', model);  
  }
  
}