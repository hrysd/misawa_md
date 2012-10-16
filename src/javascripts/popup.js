function copy(text) {
  var clip = document.getElementById('tmp_area');
  clip.value = text;
  clip.select();
  document.execCommand('copy');
}

$(function() {
  var images;
  var clean_list = function() {
    $("#images").html("");
  };
  var add_to_list = function(key, val) {
    $('#images').append("<img class='image" + key + "' src='" + val['image'] + "' />");
    $('.image' + key).click(function() {
      copy("![みさわ](" + $(this).attr('src') + ")");
      $('#notice').fadeIn('normal', function(){
        $('#notice').fadeOut();
      });
    });
  };
      
  $.getJSON('data.json', function(data) {
    clean_list();
    images = data;
    $.each(data, add_to_list);
  });
      
  $(document).ready(function(){
    $("#search").keydown(function(e){
      if (e.which === 13) {
        clean_list();
        chrome.extension.getBackgroundPage().search($(this).val(), add_to_list);
      }
    });
  });
});    
