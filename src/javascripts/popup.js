$(function() {
  
  // リストを初期化
  function clean_list() {
    $("#images").html("");
  };
    
  
  /// クリップボードに文字列を転送します。
  /// @param text 転送する文字列
  function copy(text) {
    var clip = $('#clipbox');
    clip.val(text);
    clip.select();
    document.execCommand('copy');
  };
  
  
  /// 画像のリストを初期化します。
  function init_list() {
    clean_list();
    
    if (typeof(localStorage['images.json']) == 'undefined') {
      $.getJSON('http://cloud.github.com/downloads/june29/horesase-boys/meigens.json', function(data) {
        localStorage['images.json'] = JSON.stringify(data);
        $.each(data, add_to_list);
      });
    } else {
      $.each(JSON.parse(localStorage['images.json']), add_to_list);
    }
  };
  
  
  /// リストに画像を登録します。
  /// @param key 画像のキー
  /// @param val 画像のURL
  var add_to_list = function(key, val) {
    $('#images').append("<img class='image" + key + "' src='" + val['image'] + "' />");
    $('.image' + key).click(function() {
      copy("![みさわ](" + $(this).attr('src') + ")");
      $('#notice').fadeIn('normal', function() {
        $('#notice').fadeOut();
      });
    });
  };
  
  /// キーワードで画像を検索します。
  function search_image(keyword) {        
    // キーワードが空の場合にリストを再初期化
    if (keyword == "")
    {
      init_list();
      return;
    }
    
    clean_list();

    var queryResult = Enumerable.From(JSON.parse(localStorage['images.json']))
                        .Where(function (x) { return x.title.indexOf(keyword) !== -1 || x.character.indexOf(keyword) !== -1 || x.body.indexOf(keyword) !== -1 })
                        .ToArray();
    $.each(queryResult, add_to_list);
  };
  
  
  $(document).ready(function() {
    // リストを初期化
    init_list();
  
    // 検索ボックスでEnterを押した時
    $("#keyword").keydown(function(e) {
      if (e.which === 13) {
        search_image($(this).val());
      }
    });
    
    // 検索ボタンを押した時
    $("#search_btn").click(function(e) {
      search_image($("#keyword").val());
    });
    
  });  
});
