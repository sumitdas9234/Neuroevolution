! function(o) {
  console.old = console.log, console.log = function() {
    var n, e, t = ">  ";
    for (e = 0; e < arguments.length; e++) t += '<span class="log-' + typeof(n = arguments[e]) + '">', "object" == typeof n && "object" == typeof JSON && "function" == typeof JSON.stringify ? t += JSON.stringify(n) : t += n, t +=
      "</span>&nbsp;";
    o.innerHTML += t + "<br>", console.old.apply(void 0, arguments)
  }
}
(document.body.firstElementChild.childNodes[3]);


function setTitle(title) {
  var header = document.getElementById('title');
  header.innerHTML = title;
}