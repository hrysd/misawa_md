$(function() {
  // JSONのURL
  var IMAGES_JSON_URL = 'http://cloud.github.com/downloads/june29/horesase-boys/meigens.json';
  // ページ当たりの件数
  var IMAGES_PER_PAGE = 15;
  // 未ロードのjsonを保持する変数
  var current_images_json;


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
      $.getJSON(IMAGES_JSON_URL, function(data) {
        localStorage['images.json'] = JSON.stringify(data);
        current_images_json = data;
        append_image(IMAGES_PER_PAGE);
      });
    } else {
      current_images_json = JSON.parse(localStorage['images.json']);
      append_image(IMAGES_PER_PAGE);
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

    current_images_json = Enumerable.From(JSON.parse(localStorage['images.json']))
                           .Where(function (x) { return x.title.indexOf(keyword) !== -1 || x.character.indexOf(keyword) !== -1 || x.body.indexOf(keyword) !== -1 })
                           .ToArray();
    append_image(IMAGES_PER_PAGE);
  };
  
  /// 指定された数だけ画像を追加します。
  function append_image(image_count) {
    $.each(current_images_json.slice(0, image_count), add_to_list);
    current_images_json = current_images_json.slice(image_count);

    var load_btn = $("#load_next_btn, #load_all_btn");
    (current_images_json.length > 0)? load_btn.show() : load_btn.hide();
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
    
    // 次ボタンを押した時
    $("#load_next_btn").click(function(e) {
      append_image(IMAGES_PER_PAGE);
    });

    // 全部ボタンを押した時
    $("#load_all_btn").click(function(e) {
      append_image(current_images_json.length);
    });

  });  
});
