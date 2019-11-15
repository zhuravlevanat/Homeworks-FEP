export class LocalStorage {

  constructor(data) {
    this.data = data;
  }

  getDataFromLS() {
    const data = localStorage.getItem('todos'); 
    return data ? JSON.parse(data) : [];
  }

  setDataInLs() {
    localStorage.setItem('todos', JSON.stringify(this.data))
  }
}



