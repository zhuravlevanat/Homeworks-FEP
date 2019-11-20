import config from '../../config';
import Model from './Model';

export default class Collection {
  constructor() {
    console.log('coll start');
    this.list = [];
    this.setData = this.setData.bind(this);
  }

  fetchServerData() {
    return fetch(config.contactsUrl)
      .then(res => res.json())
      .then(this.setData);
  }

  setData(data) {
    this.list = data.map((item) => new Model(item));
  }

  updateUser(data) {
    this.list.forEach(item => {
      if (item.id == data.id) {
        item.name = data.name;
        item.surname = data.surname;
        item.email = data.email;
      }
    });

    const model = this.list.find(elem => elem.id == data.id);
    
    return model.save();
  }

  createUser(data) {
    const model = new Model(data);
    
    this.list.push(model);
    console.log(this.list);
    return model.save();
  }

}