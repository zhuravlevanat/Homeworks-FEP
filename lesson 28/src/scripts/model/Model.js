import config from '../../config';

export default class Model {

  get url () {
    return `${config.contactsUrl}/${this.id}`
  }
  constructor(data) {
    this.setData(data);
  }

  setData(data) {
    Object.assign(this, data);    
  }

  save() {    
    return this.id ? this.saveUpdate() : this.saveCreate()
  }
  
  saveUpdate() {
    return fetch(`${this.url}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(this)
    });
  }

  saveCreate() {
    return fetch(`${this.url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(this)})
      .then(res => res.json())
      .then((data) => {
        this.id = data.id;
        this.setData(this)
    })
  }

  delete() {
    return fetch(`${this.url}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }        
  });
  }
}