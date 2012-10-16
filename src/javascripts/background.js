var search = function(word, func) {
  var search_inner;
  search_inner = function(word, offset, func) {
    var url = "http://misawa-solr.np-complete-doj.in:8983/solr/misawa/select";
    var params = {
      q: word,
      start: offset,
      wt: 'json'
    }
    $.ajax({
      url: url,
      method: 'GET',
      data: params,
      dataType: 'json',
      success: function(result) {
        offset += result.response.docs.length;
        $.each(result.response.docs, function(key, value) {
          func(key, value);
        });
        if (result.response.numFound > offset) {
          search_inner(word, offset, func);
        }
      }
    });
  };
  search_inner(word, 0, func);
};

