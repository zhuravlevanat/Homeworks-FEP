'use strict';

const STICKER_HEADER_CLASS = 'sticker-header';
const STICKER_BODY_CLASS = 'sticker-body';
const DELETE_BUTTON_CLASS = 'delete-btn';
const STICKER_ITEM_CLASS = 'sticker-item';

const boardElement = document.getElementById('boardElement');
const stickerItemTemplate = document.getElementById('stickerItemTemplate').innerHTML;
const newStickerHeaderInput = document.getElementById('stickerHeader');
const newStickerBodyArea = document.getElementById('stickerBody');
const addStickerButton = document.getElementById('addStickerButton');
const stickerItem = document.querySelector('sticker-item');


addStickerButton.addEventListener('click', onAddStickerButtonClick);
boardElement.addEventListener('blur', onBoardElementBlur, true);
boardElement.addEventListener('click', onBoardElementClick);
 
let stickerItems=[];

init();

function onAddStickerButtonClick() {
  addSticker();
}

function onBoardElementBlur(e) {
  if (e.target.classList.contains(STICKER_HEADER_CLASS)) {
    addStickerTitle(e.target.parentElement.dataset.stickerId, e.target.value);
  } else if (e.target.classList.contains(STICKER_BODY_CLASS)) {
    addStickerText(e.target.parentElement.dataset.stickerId, e.target.value);
  }
}

function onBoardElementClick(e) {
  if (e.target.classList.contains(DELETE_BUTTON_CLASS)) {
    deleteSticker(e.target.parentElement.dataset.stickerId);
  }
}

function init() {
  stickerItems = getState();
  renderStikersOnBoard(stickerItems);
}

function renderStikersOnBoard(stickers) { 
  stickers.forEach(sticker => addStickerOnBoard(sticker));  
}

function addSticker() {
  const newSticker = createSticker();
  stickerItems.push(newSticker);
  addStickerOnBoard(newSticker);
}

function createSticker() {
  return {
    title: '',
    id: Date.now(),
    text: ''
  }
}

function addStickerOnBoard(newSticker) {
  newSticker = stickerItemTemplate.replace('{{id}}', newSticker.id)
                                  .replace('{{title}}', newSticker.title)
                                  .replace('{{text}}', newSticker.text);
  boardElement.insertAdjacentHTML('beforeend', newSticker);
}

function getSticker(id) {
  const sticker = stickerItems.find(elem => elem.id == id);
  return sticker
}

function addStickerTitle(id, title) {
  const sticker = getSticker(id);
  sticker.title = title;
  saveState();  
}

function addStickerText(id, text) {
  const sticker = getSticker(id);
  sticker.text = text;
  saveState();
}

function deleteSticker(id) {
  stickerItems = stickerItems.filter(elem => elem.id != id);
  deleteStickerFromBoard(id);
  saveState();
}

function deleteStickerFromBoard(id) {
  const sticker = boardElement.querySelector(`[data-sticker-id="${id}"]`);
  sticker.remove();
}

function saveState() {
  localStorage.setItem('board', JSON.stringify(stickerItems))
}

function getState() {
  const data = localStorage.getItem('board'); 
  return data ? JSON.parse(data) : [];
}