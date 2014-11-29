var loadCss = function (){
  var css = document.createElement("style");
  css.innerHTML = ".wadokuLabel{display:block;padding:.2em .6em .3em;font-size:150%;font-weight:700;text-align:center;vertical-align:baseline}button#clearResults{float: right}div#entries {z-index:999;position:fixed !important;background-color: #F1F2F4 !important;top:10px !important; right:10px !important; width:30% !important; float:right !important; margin-bottom:10px !important;padding:5px !important;min-height:40px !important;border:1px solid #eee;border:1px solid rgba(0,0,0,0.05);-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;list-style-position:inside !important;list-style-type:none !important;margin-left:0 !important;text-align:left !important;font-size:70% !important;font-family:'myriad-pro-1','myriad-pro-2','LucidaGrande',Sans-Serif !important;-webkit-box-shadow:0 3px 3px rgba(0,0,0,0.3);-moz-box-shadow:0 3px 3px rgba(0,0,0,0.3);box-shadow:0 3px 3px rgba(0,0,0,0.3);-webkit-background-clip:padding-box;-moz-background-clip:padding-box;text-shadow:0 1px 1px #ffffff !important;text-indent:4px !important; filter:alpha(opacity=90);-khtml-opacity:0.9;-moz-opacity:0.9;opacity:0.9;}\n.emph{font-weight:700}span.genus{font-weight:700;color:orange;font-size:xx-small}span.f{font-weight:700;color:red;font-size:xx-small}span.m{font-weight:700;color:#00f;font-size:xx-small}span.n{font-weight:700;color:purple;font-size:xx-small}span.dom{font-size:x-small}span.fore,span.scientif,span.title,span.transcr,span.usage{font-style:italic}span.def{color:green}#entries{font-family:'Crimson Text',arial,serif;font-size:1em;padding-top:6px}.entry .writing{font-size:1.5em}.entry p{margin:0}.entry{padding:3px 10px}.entry.odd{background:#EBEEF5}.entries .span6:nth-child(even){border-left:1px solid gray;padding-left:20px;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.genki_k9,.jlpt1,.jlpt2,.jlpt3,.jlpt4,.prior_1,.prior_2,.prior_3,.prior_4{display:none}.famn{font-variant:small-caps}#entries-left:first-child{-moz-border-radius-topleft:5px;-moz-border-radius-topright:5px;-moz-border-radius-bottomright:0;-moz-border-radius-bottomleft:0;-webkit-border-radius:5px 5px 0 0;border-radius:5px 5px 0 0}input#searchInWadoku{margin-right:20px;display:inline-block;vertical-align:middle;padding-left:14px;padding-right:14px;border:1px solid #ccc;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition:border linear .2s,box-shadow linear .2s;-moz-transition:border linear .2s,box-shadow linear .2s;-o-transition:border linear .2s,box-shadow linear .2s;transition:border linear .2s,box-shadow linear .2s;height:20px;font-size:14px}"
    document.body.appendChild(css);
}

//create a box
var makeWdkBox = function (){
  if (document.getElementById("entries") == null) {
    loadCss();
    var div = document.createElement("div");
    div.innerHTML = "<span class='wadokuLabel'>Wort markieren und suchen!</span>";
    div.id = "entries";
    document.body.appendChild(div);
  }
}

var clearResults = function (){
  var div = document.getElementById("entries");
  div.innerHTML = "<span class='wadokuLabel'>Wort markieren und suchen!</span>";
  //clean selectedtext
  var sel = window.getSelection ? window.getSelection() : document.selection;
  if (sel) {
    if (sel.removeAllRanges) {
      sel.removeAllRanges();
    } else if (sel.empty) {
      sel.empty();
    }
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
  var div = document.getElementById("entries");
  div.innerHTML = "";
  if(results.entries.length == 0) {
    div.innerHTML = "<span id='notFound'>Nichts gefunden!</span>";
  } else {
    var button = document.createElement("button");
    button.id = "clearResults";
    button.innerHTML = "X"
    button.onclick = clearResults;
    div.appendChild(button);
    var reg = /\[[a-z0-9]*\]/g;
    results.entries.sort(function(a, b){
      var midashigoA, midashigoB;
      midashigoA = a.midashigo.replace(reg, "").trim();
      midashigoB = b.midashigo.replace(reg, "").trim();
      return midashigoA.length - midashigoB.length;
    }).slice(0,6).forEach(function(entry, index){
      var entryDiv = document.createElement("div");
      entryDiv.className = "entry";
      if (index % 2 != 0) entryDiv.className += " odd";
      var p = document.createElement("p");

      var writing = document.createElement("span");
      writing.className = "writing";
      writing.innerHTML = "<ruby><rb>" + entry.midashigo + "</rb><rt>" + entry.furigana + "</rt></ruby> ";

      p.appendChild(writing);
      p.innerHTML += entry.definition;
      entryDiv.appendChild(p);

      entryDiv.onclick = function (){
        var url = "http://www.wadoku.eu/entries/by-daid/" + entry.wadoku_id;
        window.open(url,'_blank');
      }
      div.appendChild(entryDiv);
    });
  }

  //Render search form
  var form = document.createElement("form");
  form.className = "entry";
  var input = document.createElement("input");
  input.type = "text";
  input.id = "searchInWadoku";
  input.value = results.query;
  var btn = document.createElement("button");
  btn.type = "submit";
  btn.innerHTML = "In WadokuJT suchen!";
  form.appendChild(input);
  form.appendChild(btn);
  form.onsubmit = function (){
    var url = "http://www.wadoku.eu?query=" + results.query;
    window.open(url,'_blank');
    return false;
  }
  div.appendChild(form);
  return div;
}

var renderSearchInput = function (selectedtext) {
  var div = document.getElementById("entries");
  var form = document.createElement("form");
  form.className = "entry";
  var input = document.createElement("input");
  input.type = "text";
  input.id = "searchInWadoku";
  input.value = selectedtext;
  var btn = document.createElement("button");
  btn.type = "submit";
  btn.innerHTML = "Suchen!";
  form.appendChild(input);
  form.appendChild(btn);
  form.onsubmit = function (){
    var url = "http://www.wadoku.eu?query=" + selectedtext;
    window.open(url,'_blank');
  }
  div.appendChild(form);
}


window.onload = function () {
  makeWdkBox();
  var b = document.body;
  //display results
  b.onclick = function () {
    var selectedText = selectWdk().replace(/[\s、「」、。\(\)\[\]\t（）]/g, "");
    var reg = /[\s\d\t]/g;
    if(!reg.test(selectedText) && selectedText.length < 10 && selectedText.trim() != "") {
      search(selectedText, 'renderResult');
    };
  }
  if (b.captureEvents) b.captureEvents(Event.CLICK);
} ();
