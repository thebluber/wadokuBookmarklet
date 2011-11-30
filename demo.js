//create a box
var load_css = (function (){
  var css = document.createElement("style");
  css.innerHTML = "ul#wadokutres {z-index:999;position:fixed !important;top:20px !important; right:20px !important; width:30% !important; float:right !important; background-color:#f5f5f5 !important;margin-bottom:20px !important;padding:5px !important;min-height:40px !important;border:1px solid #eee;border:1px solid rgba(0,0,0,0.05);-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;list-style-position:inside !important;list-style-type:none !important;margin-left:0 !important;text-align:left !important;font-size:70% !important;font-family:'myriad-pro-1','myriad-pro-2','LucidaGrande',Sans-Serif !important;-webkit-box-shadow:0 3px 3px rgba(0,0,0,0.3);-moz-box-shadow:0 3px 3px rgba(0,0,0,0.3);box-shadow:0 3px 3px rgba(0,0,0,0.3);-webkit-background-clip:padding-box;-moz-background-clip:padding-box;text-shadow:0 1px 1px #ffffff !important;text-indent:4px !important; filter:alpha(opacity=100);-khtml-opacity:1;-moz-opacity:1;opacity:1;}\n ul#wadokutres li:nth-child(odd) {-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;border:2px solid white;background-color:#f9f9f1;padding:0;text-indent:2px;}#wadokutres li:nth-child(1){text-align:center !important;background-color:#fefbf1 !important;text-indent:0px;}" 
    document.body.appendChild(css);
});

var makeWdkBox = (function (){
  if (document.getElementById("wadokutres") == null) {
    load_css();
    var ul = document.createElement("ul");
    ul.innerHTML = "Wort markieren und suchen!";
    ul.id = "wadokutres";
    document.body.appendChild(ul);} else {
    return;
  }
});

//select words => range
var selectWdk = (function (){
    var t = "";
    try{
      t = ((window.getSelection && window.getSelection()) || (document.getSelection && document.getSelection()) || (document.selection && document.selection.createRange && document.selection.createRange().text));
    }
    catch(e){
      t = "";
    }
    return t.toString();
  });

//lookup in wdk
var wdkLookup = (function (w, callback) {
    var link = "http://www.wadoku.eu/entries/tres?callback=" + callback + "&search=" + w;
    var head = document.getElementsByTagName("head")[0];
    var s = document.createElement("script");
    s.src = encodeURI(link);
    head.appendChild(s);
  });

//display results
var displayWdk = (function () {
  var t = selectWdk().replace(/[\s、「」、。\(\)\[\]\t（）]/g, "");
  var reg = /[\s\d\t]/g;
    if(reg.test(t) || t.length > 10 || t == "") {
      return t;
    } else {
      var ul = document.getElementById("wadokutres");
      ul.innerHTML = "";
      var li = document.createElement("li");
      li.innerHTML = t;
      ul.appendChild(li);
      wdkLookup(t, "writeTres");
      };
  });

//handle event
var startWdk = (function(e){
  makeWdkBox();
  var b = document.body;
  b.onclick = e;
  if (b.captureEvents) b.captureEvents(Event.CLICK);
});

var writeTres = (function (results) {
  var ul = document.getElementById("wadokutres");
  var li = document.createElement("li");
  if(results.length == 0) {
    li.innerHTML = "Nichts gefunden!";
    ul.appendChild(li);
  } else { 
    results.forEach(function(r){
    var li = document.createElement("li");
    li.innerHTML = "" + r;
    ul.appendChild(li);
    });}
  return ul;
  });

window.onload = startWdk(displayWdk);
