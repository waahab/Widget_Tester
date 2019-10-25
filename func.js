var _flagForScroller = false
document.onscroll = function () {
  var pos = showPosition(document.body);
  console.clear();
  console.log(Math.round(pos) + '%')
  if (pos > 40 && _flagForScroller == false) {
    console.log("scroll working")
  }
};
function flagToggler() {
  _flagForScroller = true
};
function showPosition(elm) {
  var parent = elm.parentNode,
    pos = (elm.scrollTop || parent.scrollTop) / (parent.scrollHeight - parent.clientHeight) * 100;
  return pos;
};
let url = 'senseWidget/'+domain_id+'/'+values[0].id
let url = 'senseWidget/'+domain_id+'/'+uid+'/'+values[0].id;