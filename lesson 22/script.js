$(function() {
  const $addStickerButton = $('#addStickerButton');
  const $stickersContainer = $('#stickersContainer');
  const $stickerItemTemplate = $('#stickerItemTemplate').html();
  //const $form = $('form');
  
  const dialog = $( "#dialog-form" ).dialog({
    autoOpen: false,
    height: 350,
    width: 350,
    modal: true,
    buttons: {
      "Create a sticker": addSticker,
      Cancel: function() {
        dialog.dialog( "close" );
      }
    },
    close: function() {
      form[ 0 ].reset();
    }
  });

  let stickerItems=[];
  const form = dialog.find( 'form' );

  init();  

  $addStickerButton.on('click', onAddStickerButtonClick);
  form.on( "submit", onFormSubmit);
  $stickersContainer.on('click', '.delete-btn', onDeleteBtnClick);

  function onAddStickerButtonClick() {
    dialog.dialog( "open" );
  }

  function onFormSubmit(event) {    
    event.preventDefault();
    addSticker();
}
  
  function onDeleteBtnClick() {
    const $stickerId = $(this).parent().data('stickerId');
    deleteSticker($stickerId);   
  }

  function addSticker() {
    const newSticker = createSticker();
    setStickerValues(newSticker);    
    dialog.dialog( "close" );
    addStickerOnBoard(newSticker);
    stickerItems.push(newSticker);   
    saveState();
  }

  function createSticker() {
    return {
      title: '',
      id: Date.now(),
      description: ''
    }
  }

  function setStickerValues(sticker) {
    form.serializeArray().forEach(({name, value}) => sticker[name] = value);
  }

  function addStickerOnBoard(sticker) {
    $stickersContainer.append(getStickerItemsHtml(sticker));
  }

  function getStickerItemsHtml({id, title, description}) { 
    return  $stickerItemTemplate.replace('{{id}}', id)
                                .replace('{{title}}', title)
                                .replace('{{description}}', description);
  }

  function deleteSticker(id) {    
    deleteStickerFromBoard(id);
    stickerItems = stickerItems.filter(elem => elem.id != id);
    saveState();
  }
  
  function deleteStickerFromBoard(id) {
    getSkikerById(id).remove();
  }

  function getSkikerById(id) {
    return $stickersContainer.children().filter((index, elem)=>$(elem).data('stickerId') == id)
  }  

  function init() {
    stickerItems = getState();
    renderStikersOnBoard(stickerItems);
  }

  function renderStikersOnBoard(stickers) { 
    stickers.forEach(sticker => addStickerOnBoard(sticker));  
  }       
    
  function saveState() {
    localStorage.setItem('board', JSON.stringify(stickerItems))
  }
  
  function getState() {
    const data = localStorage.getItem('board'); 
    return data ? JSON.parse(data) : [];
  } 
})

// Инкапсуляция через замыкание
// function CreateName() {
//   let name
//   this.setName = function() {

//   }
// }

// const myName = new CreateName();
