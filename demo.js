var loadCss = function (){
  var css = document.createElement("style");
  css.innerHTML = "ul#wadokutres {z-index:999;position:fixed !important;top:20px !important; right:20px !important; width:30% !important; float:right !important; background-color:#f5f5f5 !important;margin-bottom:20px !important;padding:5px !important;min-height:40px !important;border:1px solid #eee;border:1px solid rgba(0,0,0,0.05);-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;list-style-position:inside !important;list-style-type:none !important;margin-left:0 !important;text-align:left !important;font-size:70% !important;font-family:'myriad-pro-1','myriad-pro-2','LucidaGrande',Sans-Serif !important;-webkit-box-shadow:0 3px 3px rgba(0,0,0,0.3);-moz-box-shadow:0 3px 3px rgba(0,0,0,0.3);box-shadow:0 3px 3px rgba(0,0,0,0.3);-webkit-background-clip:padding-box;-moz-background-clip:padding-box;text-shadow:0 1px 1px #ffffff !important;text-indent:4px !important; filter:alpha(opacity=100);-khtml-opacity:1;-moz-opacity:1;opacity:1;}\n ul#wadokutres li:nth-child(odd) {-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;border:2px solid white;background-color:#f9f9f1;padding:0;text-indent:2px;}"
    document.body.appendChild(css);
}

//create a box
var makeWdkBox = function (){
  if (document.getElementById("wadokutres") == null) {
    loadCss();
    var ul = document.createElement("ul");
    ul.innerHTML = "Wort markieren und suchen!";
    ul.id = "wadokutres";
    document.body.appendChild(ul);
  }
}

//select words => range
var selectWdk = function (){
  var t = "";
  try{
    t = ((window.getSelection && window.getSelection()) || (document.getSelection && document.getSelection()) || (document.selection && document.selection.createRange && document.selection.createRange().text));
  }
  catch(e){
    t = "";
  }
  return t.toString();
}

//make request on wadoku api using jsonp callback
var search = function (w, callback) {
    var url = encodeURI("http://www.wadoku.eu:10010/api/v1/search?query=" + w + "&callback=" + callback);
    var head = document.getElementsByTagName("head")[0];
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = url;
    head.appendChild(s);
}


var renderResult = function (results) {
  var ul = document.getElementById("wadokutres");
  ul.innerHTML = "";
  if(results.entries.length == 0) {
    var li = document.createElement("li");
    li.innerHTML = "Nichts gefunden!";
    ul.appendChild(li);
  } else {
    results.entries.forEach(function(entry){
      var li = document.createElement("li");
      li.innerHTML = entry.midashigo + "| " + entry.definition;
      ul.appendChild(li);
    });
  }
  return ul;
}


window.onload = function () {
  makeWdkBox();
  var b = document.body;
  //display results
  b.onclick = function () {
    var selectedText = selectWdk().replace(/[\s、「」、。\(\)\[\]\t（）]/g, "");
    var reg = /[\s\d\t]/g;
    if(reg.test(selectedText) || selectedText.length > 10 || selectedText == "") {
      return selectedText;
    } else {
      search(selectedText, 'renderResult');
    };
  }
  if (b.captureEvents) b.captureEvents(Event.CLICK);
} ();
