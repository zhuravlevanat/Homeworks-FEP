import Chat from './Chat';
import $ from 'jquery';

const talk= new Chat({
    onMessage: addLog
});

const $log = $('#log');
const $input = $('#message');
const name = 'John Doe';


$('#sendBtn').on('click', sendMessage);


function addLog(message) {
    $log.append(
        `<div class="${message.type}">${message.name}: ${message.message}</div>`
    );
}

function sendMessage() {
    talk.send('message', name, $input.val())
}