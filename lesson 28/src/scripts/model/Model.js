import config from '../../config';

export default class Model {
  constructor(data) {
    Object.assign(this, data);
  }

  update(data) {
    Object.assign(this, data);
    return this.save();
  }

  save() {
    return this.id ? this.saveUpdate() : this.saveCreate()
  }

  saveUpdate() {
    return fetch(config.contactsUrl+`/${this.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(this)
    });
  }

  saveCreate() {
    console.log(this);
    return fetch(config.contactsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(this)})
      .then(res => res.json())
      .then(data => console.log(data))
  }
}