// ==UserScript==
// @name           lighthouse-syntax-highlighter
// @namespace      http://magnificent-tears.com
// @include        https://*.lighthouseapp.com/projects/*/tickets/*
// ==/UserScript==

(function(){
  var prefix = 'http://localhost/javascripts/syntax-highlighter/';
  var resources = {
    script: {tag: 'script', atts:{src:  null, type: 'text/javascript'           }, suffix: '.js',  dir: ''},
    style:  {tag: 'link',   atts:{href: null, type: 'text/css', rel:'stylesheet'}, suffix: '.css', dir: ''}
  };
  var hlfunc; // use string to avoid GM scope chain
    // http://shjs.sourceforge.net/
      prefix += 'shjs/';
      resources.script.suffix = '.min.js'
      resources.style.suffix  = '.min.css'
      resources.script.files  = ['sh_main']
      resources.style.files   = ['sh_vim-dark', 'mods']
      hlfunc = 'sh_highlightDocument()';

  var head = document.getElementsByTagName('head')[0];
  if(!head){
    head = document.createElement('head');
    document.body.parentNode.insertBefore(head, document.body);
  }

  var codes = document.body.getElementsByTagName('code');
  var shjsclasses = {};   // for uniqueness
  var shjsclass = null;
  for(var c=0; c<codes.length; ++c){
    var code = codes[c];
    console.log(code.className);
    if((shjsclass = code.className)){
      shjsclasses[shjsclass] = 1;
      var pre = document.createElement('pre');
      //pre.innerHTML = code.textContent; // discard markup instead of using innerHTML
      pre.innerHTML = code.innerHTML; // discard markup instead of using innerHTML
      pre.className = 'shjs sh_' + shjsclass;
      code.parentNode.replaceChild(pre, code);
    }
  }

  for(var s in shjsclasses)
    resources.script.files.push('sh_'+s);

  for(var j in resources){
    var r = resources[j];
    for(var i=0; i<r.files.length; ++i){
      var s = document.createElement(r.tag);
      for(var a in r.atts)
        s[a] = (r.atts[a] == null ? prefix + r.dir + r.files[i] + r.suffix : r.atts[a]);
      head.appendChild(s);
    }
  }

  setTimeout(function(){
    var darn = document.createElement('script');
    darn.type = 'text/javascript'
    darn.innerHTML = hlfunc;
    //darn.innerHTML = 'setTimeout('+hlfunc+', 5000);';
    document.body.appendChild(darn);
  }, 1000);
})();
