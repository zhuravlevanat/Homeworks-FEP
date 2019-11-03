$(function(){
  const $input = $('#tags');
  const $userTemplate = $('#userItemTemplate').html();
  const $userDataContainer = $('#user-data-container');  

  $input.autocomplete({
    source: function (request, response) {
      $.ajax({
        url: 'https://api.github.com/search/users?q=' + request.term,
        dataType: "jsonp",
        success: function(data) {
          response($.map(data.data.items, (elem) => elem.login));
        }
      });
    },
    select: function(event, ui) {
      $.ajax( {
        url: 'https://api.github.com/users/'+ ui.item.value,
        dataType: "jsonp",        
        success: function(data){
          const date = changeDateFormat(data.data.created_at);
          const html = getUserItemsHtml(data.data.avatar_url, data.data.name, data.data.followers, date);
          displayUserData(html);
        }
      });      
    },
    minLength: 2,    
  }); 
  
  function changeDateFormat(date) {
    return new Date(Date.parse(date)).toLocaleDateString('ru-RU');
  }

  function getUserItemsHtml(url, name, followers, date) { 
    return  $userTemplate.replace('{{url}}', url)
                          .replace('{{name}}', name)
                          .replace('{{date}}', date)
                          .replace('{{followers}}', followers);
  }

  function displayUserData(elem) {
    $userDataContainer.html(elem);
  }
});