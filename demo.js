//create a box
alert("hallooooo");
var load_css = (function (){
  var css = document.createElement("style");
  css.innerHTML = "ul#wadokutres {position:fixed !important;top:20px !important; right:20px !important; width:30% !important; float:right !important; background-color:#f5f5f5 !important;margin-bottom:20px !important;padding:5px !important;min-height:40px;border:1px solid #eee;border:1px solid rgba(0,0,0,0.05);-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;list-style-position:inside;list-style-type:none;margin-left:0;text-align:left;font-size:70%;font-family:'myriad-pro-1','myriad-pro-2','LucidaGrande',Sans-Serif;-webkit-box-shadow:0 3px 3px rgba(0,0,0,0.3);-moz-box-shadow:0 3px 3px rgba(0,0,0,0.3);box-shadow:0 3px 3px rgba(0,0,0,0.3);-webkit-background-clip:padding-box;-moz-background-clip:padding-box;text-shadow:0 1px 1px #ffffff;text-indent:4px;filter:alpha(opacity=90);-khtml-opacity:0.9;-moz-opacity:0.9;opacity:0.9;}\n ul#wadokutres li:nth-child(odd) {-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;border:2px solid white;background-color:#f9f9f1;padding:0;text-indent:2px;}#wadokutres li:nth-child(1){text-align:center;background-color:#fefbf1;text-indent:0px;}\ndiv.tres{text-align:center;background-color:#fefbf1;text-indent:0px;}" 
    document.body.appendChild(css);
    alert("load css");
});

var makeWdkBox = (function (){
  load_css();
  var ul = document.createElement("ul");
  ul.innerHTML = "Wort markieren und suchen!";
  ul.id = "wadokutres";
  document.body.appendChild(ul);
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
if(document.getElementById("wadokutres").style.position == "fixed") alert("sheint richtig zu sein?");
