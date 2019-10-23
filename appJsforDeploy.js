// function loadScript(url, callback) {
//   var script = document.createElement("script")
//   script.type = "text/javascript";
//   var check = document.currentScript.getAttribute('widgetUrl');
//   console.log(check, "check")
//   if (script.readyState) {  //IE
//     script.onreadystatechange = function () {
//       if (script.readyState == "loaded" ||
//         script.readyState == "complete") {
//         script.onreadystatechange = null;
//         callback();
//       }
//     };
//   } else {  //Others
//     script.onload = function () {
//       callback();
//     };
//   }

//   script.src = url;
//   document.getElementsByTagName("head")[0].appendChild(script);
// }

// document.currentScript = document.currentScript || (function () {
//   var scripts = document.getElementsByTagName('script');
//   return scripts[scripts.length - 1];
// })();

// loadScript('https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.js', (data) => {
//   console.log(data, 'callback')
//   axios.get('http://waahab-task.herokuapp.com/test').then(data => {
//     console.log(data, "daat")
//     let doc = document.getElementById('widget')
//     doc.innerHTML = data.data
//   }).catch(err => {
//     console.log(err)
//   })
// })


var ispercentageScroller = null;
var _flagForScroller = false;
var idParam = null;
var feedbackValue = 0;

// When does it display --- Second have passed -----
function loadWidget(timer) {
  document.getElementById("sense-widget-container").style.display = "none";
  setTimeout(function () {
    document.getElementById("sense-widget-container").style.display = "block";
  }, timer)
}
function updatedTimer() {
  console.log("Onload Called")
  let checkUser = localStorage.getItem("widget_senseflow_creds")
  if (checkUser) {
    let creds = JSON.parse(checkUser)
    console.log(creds, "if")
    if (creds && creds.pushWidgetTime) {
      document.getElementById("sense-widget-container").style.display = "none";
      let updatedTime = creds.pushWidgetTime - Date.now()
      console.log(updatedTime, "updatedTime")
      creds.timeofClose = Date.now()
      creds.isUser = true
      creds.pushWidgetTime = creds.pushWidgetTime
      localStorage.setItem("widget_senseflow_creds", JSON.stringify(creds))
      setTimeout(function () {
        document.getElementById("sense-widget-container").style.display = "block";
        localStorage.removeItem("widget_senseflow_creds")
      }, updatedTime)
    } else {
      document.getElementById("sense-widget-container").style.display = "block";
    }
  } else { console.log("elseRunning") }
}




// When does it display --- scroll to target id -----
function getIdParam(getidParam) {
  this.idParam = getidParam;
}


// When does it display --- scroll percentage -----
function getPercentageScroller(isPercentage) {
  this.ispercentageScroller = isPercentage;
}

window.onscroll = function () {
  console.log(this.idParam, "idParams")
  if (this.idParam) {
    var hT = document.getElementById(idParam).offsetTop,
      hH = document.getElementById(idParam).offsetHeight,
      wH = document.documentElement.clientHeight,
      wS = document.documentElement.scrollTop;
    console.log((hT + hH - wH), wS);
    if (wS > (hT + hH - wH)) {
      document.getElementById("sense-widget-container").style.display = "block";
    }
  }
  else if (this.ispercentageScroller) {
    var pos = showPosition(document.body);
    console.log(this.ispercentageScroller, '----%')
    console.log(Math.round(pos) + '%')
    if (pos > this.ispercentageScroller && _flagForScroller == false) {
      _flagForScroller = true
      document.getElementById("sense-widget-container").style.display = "block";
    }
    function showPosition(elm) {
      var parent = elm.parentNode,
        pos = (elm.scrollTop || parent.scrollTop) / (parent.scrollHeight - parent.clientHeight) * 100;
      return pos;
    };

  }
};

//~~~~~~~~~~~~~~~~~ Rating ~~~~~~~~~~
function feedyFeedback(isReason, isFeedback, value, color, submittedCss) {
  var icons = document.querySelectorAll('.swr-rating-toggle')
  this.feedbackValue = Number(value) + 1;
  console.log("formData---->", this.feedbackValue, "isMore----->", isReason, isFeedback, submittedCss)
  icons.forEach((icon, index) => {
    if (value == index) {
      document.getElementById(`swr-id-${value}-3`).setAttribute("style", `fill:${color} !important;`)
      let path = document.getElementsByClassName(`swr-id-${value}-2`)
      path[0].setAttribute("style", `fill:${color} !important;`)
      path[1].setAttribute("style", `fill:#fff !important;`)
      path[2].setAttribute("style", `fill:#fff !important;`)
      path[3].setAttribute("style", `fill:#fff !important;`)
    }
    else {
      document.getElementById(`swr-id-${index}-3`).setAttribute("style", `fill:#fff !important;`)
      if (index === 0) colorReset(index, "#ed1c24");
      else if (index === 1) colorReset(index, "#f7901e");
      else if (index === 2) colorReset(index, "#ffce07");
      else if (index === 3) colorReset(index, "#8ac640");
      else if (index === 4) colorReset(index, "#1db24b");
    }
  })
  checkMoreOrSubmit(isReason, isFeedback, submittedCss)
}
function checkMoreOrSubmit(isReason, isFeedback,submittedCss) {
  if (isReason === "Yes" && isFeedback === "Yes") {
    document.getElementById("sense-widget-container").setAttribute('style', `"${submittedCss}"`)
    document.getElementById("sense-widget-title").style.display = 'none';
    document.getElementById("sense-widget-thanks-message").style.display = "block";
    document.getElementById("sense-widget-submitted-state-wrapper").style.display = "block";
    document.getElementById("sense-widget-dropdown").style.display = "inline-block";
    document.getElementById("sense-widget-dropbtn").style.display = 'inline-block';
    document.getElementById("sense-widget-submit-btn").style.display = 'inline-block';
    document.getElementById(`sense-widget-text-area`).style.display = "inline-block";
  } else if (isReason === "No" && isFeedback === "Yes") {
    document.getElementById("sense-widget-container").setAttribute('style', `"${submittedCss}"`)
    document.getElementById("sense-widget-title").style.display = 'none';
    document.getElementById("sense-widget-thanks-message").style.display = "block";
    document.getElementById(`sense-widget-submit-btn`).style.display = "inline-block";
    document.getElementById(`sense-widget-text-area`).style.display = "inline-block";
    document.getElementById(`sense-widget-submitted-state-wrapper`).style.display = " block";
    document.getElementById(`sense-widget-dropbtn`).style.display = "none";
  } else if (isReason === "Yes" && isFeedback === "No") {
    document.getElementById("sense-widget-container").setAttribute('style', `"${submittedCss}"`)
    document.getElementById("sense-widget-title").style.display = 'none';
    document.getElementById("sense-widget-thanks-message").style.display = "block";
    document.getElementById(`sense-widget-submit-btn`).style.display = "inline-block";
    document.getElementById(`sense-widget-text-area`).style.display = "none"
    document.getElementById(`sense-widget-dropbtn`).style.display = "inline-block";
    document.getElementById(`sense-widget-submitted-state-wrapper`).style.display = "block";
  }
  else if (isReason === "No" && isFeedback === "No") {
    document.getElementById("sense-widget-container").setAttribute('style', `"${submittedCss}"`)
    document.getElementById("sense-widget-title").style.display = 'none';
    document.getElementById("sense-widget-thanks-message").style.display = "block";
    let rating = {
      rate: this.feedbackValue,
      date: new Date().getDate(),
      time: new Date().getTime(),
      feedback: ''
    }
    console.log(rating, "rating")
  }
}

function colorReset(index, color) {
  let path = document.getElementsByClassName(`swr-id-${index}-2`)
  let pathColor = `fill:${color} !important;`
  path[0].setAttribute("style", pathColor)
  path[1].setAttribute("style", pathColor)
  path[2].setAttribute("style", pathColor)
  path[3].setAttribute("style", pathColor)
}

function ratingFeedback(isMore, value) {
  console.log("Value---->", value, "isMore---->", isMore)
  if (isMore === "more") {
    console.log("isMore called")
    document.getElementById("sense-widget-title").style.display = 'none';
    document.getElementById("sense-widget-thanks-message").style.display = "block";
    document.getElementById("sense-widget-submitted-state-wrapper").style.display = "block";
    document.getElementById("sense-widget-dropdown").style.display = "inline-block";
    document.getElementById("sense-widget-dropbtn").style.display = 'inline-block';
    document.getElementById("sense-widget-submit-btn").style.display = 'inline-block';
  }
}

// onSubmit hours or days
function onSubmitSenseWidgetPeriodic(timeVal, closeType) {
  let isSameUser = localStorage.getItem("widget_senseflow_creds")
  if (isSameUser) {
    let creds = JSON.parse(isSameUser)
    if (creds && creds.pushWidgetTime) {
      let updatedTime = creds.pushWidgetTime - creds.timeofClose;
      creds.timeofClose = Date.now()
      creds.isUser = true
      creds.pushWidgetTime = creds.pushWidgetTime
      localStorage.setItem("widget_senseflow_creds", JSON.stringify(creds))
      setTimeout(function () {
        document.getElementById("sense-widget-container").style.display = "block";
        localStorage.removeItem("widget_senseflow_creds")
      }, updatedTime)
    } else {
      document.getElementById("sense-widget-container").style.display = "block";
    }
  } else {
    var timestamp;
    var timeToPushWidget;
    if (closeType == 'Hours') {
      timestamp = new Date(Date.now() + 3600000 * timeVal).getTime();
      timeToPushWidget = timeVal * 3600000
    }
    else if (closeType == 'Days') {
      timestamp = new Date(Date.now() + 86400000 * timeVal).getTime();
      timeToPushWidget = timeVal * 86400000
    }
    let creds = {
      timeofClose: Date.now(),
      isUser: true,
      pushWidgetTime: timestamp
    }
    localStorage.setItem("widget_senseflow_creds", JSON.stringify(creds))
    setTimeout(function () {
      document.getElementById("sense-widget-container").style.display = "block";
      localStorage.removeItem("widget_senseflow_creds")
    }, timeToPushWidget)
  }
  document.getElementById("sense-widget-container").style.display = "none";
}


// onSUbmit Never
function senseWidgetNever() {
  let isSameUser = localStorage.getItem("widget_senseflow_creds")
  if (!isSameUser) {
    let creds = {
      timeofClose: Date.now(),
      repeatWidget: 'Never',
    }
    localStorage.setItem("widget_senseflow_creds", JSON.stringify(creds))
    document.getElementById("sense-widget-container").style.display = "none";
  } else if (isSameUser && JSON.stringify(isSameUser).repeatWidget === "Never") {
    document.getElementById("sense-widget-container").style.display = "none";
  }
}

//onSubmit Always
function senseWidgetAlways() {
  document.getElementById("sense-widget-container").style.display = "block";
}