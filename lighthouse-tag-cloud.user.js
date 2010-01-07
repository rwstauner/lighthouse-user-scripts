// ==UserScript==
// @name           lighthouse-tag-cloud
// @namespace      http://magnificent-tears.com
// @include        https://*.lighthouseapp.com/*
// ==/UserScript==

(function(){
setTimeout(function(){
  var name = 'lighthouse_tag_cloud';
  var url_all_tags = new RegExp('^https://.+?.lighthouseapp.com/.+/(overview|tickets)$');

  var get_cloud = function(){
    var xr = document.evaluate('//div[@class="taglist"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if( xr.snapshotLength != 1 )
      throw('Not One Taglist!')
    return xr.snapshotItem(0);
  };

  if( url_all_tags.test(document.location.href) ){
    try {
      var tags = get_cloud().innerHTML.replace(/\bhref="[^"]+"/g, 'href="javascript:alert(\'no clicking\')"');
      if( tags )
        localStorage.setItem(name, tags);
    }catch(e){ if(console) console.error(name + ':' + e); }
  }else{
      var alltags = localStorage.getItem(name)
      if( !alltags )
        alltags = 'Tags not found.  Please visit overview page to refresh list.';
      var tagfield = document.getElementById('taggings')
      if( tagfield ){
      var allcloud = document.createElement('div');
        allcloud.className = 'taglist';
        var s = allcloud.style;
        s.background = '#eee';
        s.border = '5px solid #fc9';
        s.padding = '5px';
        s.margin = '10px 5px';
        s.textAlign = 'right';
      allcloud.innerHTML = '<h3 style="font-style: italic; text-align: right;">* ALL TAGS *</h3>' + alltags;  // cheater
      //get_cloud().appendChild(allcloud);
      tagfield.parentNode.insertBefore(allcloud, tagfield);
    }
  }
}, 1000);
})();
