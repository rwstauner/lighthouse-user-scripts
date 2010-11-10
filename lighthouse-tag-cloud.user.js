// ==UserScript==
// @name           lighthouse-tag-cloud
// @namespace      http://magnificent-tears.com
// @include        https://*.lighthouseapp.com/*
// @version        2
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
      // TODO: tlist2.maininput.autoShow('idea');
      var tags = get_cloud().innerHTML.replace(/\bhref="[^"]+"/g, 'href="javascript://" onclick="cached_tag_cloud_click(this);"');
      if( tags )
        localStorage.setItem(name, tags);
    }catch(e){ if(console) console.error(name + ':' + e); }
  }else{

    var script = document.createElement('script');
    var scripttxt = ''+
'   function cached_tag_cloud_click(link){  '+
'     var tags, txt, inp;                   '+
'     try {                                 '+
'       tags = tlist2;                      '+
'       if(!tags)throw("var not found");    '+
'       txt = link.innerHTML;               '+
'       inp = tags.maininput.firstChild;    '+
'       inp.focus();                        '+
'       inp.value = txt;                    '+
'       tags.autoShow(txt);                 '+
'     }catch(e){                            '+
'       alert("no clicking:\\n\\n" + e);    '+
'     }                                     '+
'   };                                      '+
''    ;
    script.setAttribute('type', 'text/javascript');
    //script.setAttribute('data:,', encodeURIComponent(scripttxt));
    script.textContent = scripttxt;
    //setTimeout(function(){
      document.body.appendChild(script);
      document.body.removeChild(script);
    //}, 0);

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
