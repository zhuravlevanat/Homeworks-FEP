// import wsServer from '../config'
//import WebSocket from 'ws';

export default class Chat {
  constructor(config) {
    this.config = config;
    this.socket = new WebSocket('wss://fep-app.herokuapp.com/');
    this.initWS();
  }

  initWS() {
    this.onOpenWS();
    this.onCloseWS();
    this.onMessageWS();
  }

  onOpenWS() {
    this.socket.onopen = () => {
      this.send('Connected', 'Connected');
    }
  }

  onCloseWS() {
    this.socket.onclose = () => {
      this.send('Disconnected', 'Disconnected');
    }
  }

  onMessageWS() {
    this.socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    this.config.onMessage(data);
    }
  }

  send(type, name, message) {
    this.socket.send(
      JSON.stringify ({
          type,
          message,
          name
    }));
  }
}



