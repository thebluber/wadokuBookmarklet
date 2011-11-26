//create a box
alert("hallooooo");
var makeWdkBox = (function (){
  var ul = document.createElement("ul");
  ul.id = "wadokutres";
  ul.addClass("tres");
  ul.style = "z-index='1000' important; position='fixed' !important;";
  ul.innerHTML = "Wort markieren und suchen!";
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

if (document.getElementById("wadokutres")) {
  startWdk(displayWdk);
} else {
  alert("irgendwie nicht loaded");
};
