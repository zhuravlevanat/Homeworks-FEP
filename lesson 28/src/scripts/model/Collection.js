import config from '../../config';
import Model from './Model';

export default class Collection {
  constructor() {
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

  get(id) {
    return this.list.find(el => el.id == id);
  }

  updateUser(data) {
    this.list.forEach(item => {
      if (item.id == data.id) {
        item.name = data.name;
        item.surname = data.surname;
        item.email = data.email;
      }
    });

    const model = this.get(data.id);
        
    return model.save();
  }

  createUser(data) {
    const model = new Model(data);    
    this.list.push(model);

    return model.save();
  }

  deleteUser(id) {
    const model = this.get(id);
    this.list = this.list.filter(item => item.id != id)
    return model.delete();
  }
}