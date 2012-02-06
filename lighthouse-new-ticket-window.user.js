// ==UserScript==
// @name           lighthouse-new-ticket-window
// @namespace      http://magnificent-tears.com
// @include        https://*.lighthouseapp.com/projects/*
// ==/UserScript==

(function(){
  var i, button,
    atext = "Create new ticket",
    ahref = document.location.pathname.replace(/(\/projects\/[^\/]+).+/, '$1/tickets/new'); // "/projects/*/tickets/new",
    xtext = '[contains(text(),"' + atext + '")]',
    xhref = '[@href="'  + ahref + '"]',
    xboth = xtext.replace(/\]$/, ' and ') + xhref.replace(/^\[/, ''),
    p = [
      // try most specific first, try a few others if not found
      '//*[@id="sbar"]/*[@class="sbar-btn"]/a' + xboth,
      '//a' + xboth,
      '//a' + xtext,
      '//a' + xhref,
    ];
  for(i=0; i<p.length; ++i){
    if(console) console.log(p[i]);
    button = document.evaluate(p[i], document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if((button = button.singleNodeValue)){
      button.setAttribute('target', "_new");
      break;
    }
  }
})();
