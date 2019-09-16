function loadScript(url, callback) {

  var script = document.createElement("script")
  script.type = "text/javascript";
  var check = document.currentScript.getAttribute('widgetUrl');
  console.log(check, "check")
  if (script.readyState) {  //IE
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" ||
        script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function () {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

document.currentScript = document.currentScript || (function () {
  var scripts = document.getElementsByTagName('script');
  return scripts[scripts.length - 1];
})();

loadScript('https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.js', (data) => {
  console.log(data, 'callback')
  axios.get('http://waahab-task.herokuapp.com/test').then(data => {
    console.log(data, "daat")
    let doc = document.getElementById('widget')
    doc.innerHTML = data.data
  }).catch(err => {
    console.log(err)
  })
})
