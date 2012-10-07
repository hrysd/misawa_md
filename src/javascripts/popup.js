function copy(text) {
  var clip = document.getElementById('tmp_area');
  clip.value = text;
  clip.select();
  document.execCommand('copy');
}

$(function() {
  $.getJSON('data.json', function(data) {
    var images;
    images = data;
    $.each(data, function(key, val) {
      $('#images').append("<img class='image" + key + "' src='" + val['image'] + "' />");
      $('.image' + key).click(function(){
        copy("![みさわ](" + $(this).attr('src') + ")");
        $('#notice').fadeIn('normal', function(){
                           $('#notice').fadeOut();
        });
      })
    });
  });
});
