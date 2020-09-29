/**
 * check scripts for bitbili.net
 * @author Bekcpear
 * */

'use strict';

// Set google analystic ignore param
var searchParams = new URLSearchParams(new URL(document.URL).search);
if (searchParams.has('gavisitor')) {
  localStorage.setItem('ga_visitor', searchParams.get('gavisitor'))
}

// check if from my old domain and notify
if (searchParams.has('from')) {
  if(searchParams.get('from') == "moego") {
    var popf        = document.createElement("div");
    popf.id     = "popf";
		var closePopf = function() {
      let popfparams = new URL(document.URL).search;
      popfparams = popfparams.replace(/(&from=moego)|(from=moego[&]?)/, '');
      window.history.replaceState(null, '', popfparams);
      popf.style.bottom = "-100px";
      setTimeout(function() {
        document.body.removeChild(popf);
      }, 500);
    }
    var popf_t0     = document.createTextNode("您好，本站原域名 moego.me 已经停用，之后请改用新域名 bitbili.net 访问。 ");
    var popf_a      = document.createElement("a");
		var popf_at     = document.createTextNode("已知悉");
    popf.style  = "position: fixed; bottom: -100px; left: 0; padding: 20px 10px; width: 100%; box-sizing: border-box; text-align: center; background-color: #eb1846; color: #fff; font-size: 16px; z-index: 99; transition-property: bottom; transition-duration: 0.2s;";

    popf_a.addEventListener("click", closePopf);
		popf_a.style= "cursor: pointer; color: #fff; font-weight: bold; margin: 0 5px; text-decoration: underline dotted;";
    popf_a.appendChild(popf_at);

    popf.appendChild(popf_t0);
    popf.appendChild(popf_a);

    document.body.appendChild(popf);
    setTimeout(function() {
      popf.style.bottom = 0;
    }, 500);
  }
}

// Browser checking script START
async function checkBrowser() {
  if (localStorage.getItem('iBc') || sessionStorage.getItem('iBc')) return false;
  else if (navigator.userAgent.indexOf('Edge/') > -1) true;
  // 不是很懂为什么之前未使用 Blink 引擎的 Edge 浏览器也会有 AppleWebKit 和 Chrome 字段，可能是使用了老版本的引擎？反正渲染出错。
  else if (navigator.userAgent.indexOf('Chrome/') > -1
        && parseInt(navigator.userAgent.match(/Chrome\/(\d+)\./)[1]) >= 70) return true;
  else if ( navigator.userAgent.indexOf('AppleWebKit/') > -1
            && navigator.userAgent.indexOf('Version/') > -1
            && parseInt(navigator.userAgent.match(/Version\/(\d+)\./)[1]) >= 13 ) return true;
  // Safari 版本大于 13 实测问题不大
  else if ( navigator.userAgent.indexOf('AppleWebKit/') > -1
            && parseInt(navigator.userAgent.match(/AppleWebKit\/(\d+)\./)[1]) >= 604 ) return true;
  // AppleWebkit 引擎目前看着问题不大 以后再二次确认
  else if ( navigator.userAgent.indexOf('Firefox/') > -1
            && parseInt(navigator.userAgent.match(/Firefox\/(\d+)\./)[1]) >= 68 ) return true;

  var popd    = document.createElement("div");
  var popd_t  = document.createElement("div");
  var popd_tt = document.createTextNode("本站仅对主流且内核较新的浏览器（Chromium, Google Chrome, Firefox, Safari, Opera 等）做最佳阅读支持。");
  var popd_a  = document.createElement("a");
  var popd_at = document.createTextNode("本次关闭");
  var popd_s  = document.createElement("span");
  var popd_d  = document.createElement("a");
  var popd_dt = document.createTextNode("永久忽略");

  popd_t.appendChild(popd_tt);
  popd_t.style.marginTop    = "0";
  popd_t.style.marginRight  = "auto";
  popd_t.style.marginBottom = "10px";
  popd_t.style.marginLeft   = "auto";

  popd_a.appendChild(popd_at);
  popd_d.appendChild(popd_dt);
  var popd_a_a = [popd_a, popd_d];
  for (var i = 0; i < popd_a_a.length; i++) {
    popd_a_a[i].style.display = "inline-block";
    popd_a_a[i].style.paddingTop     = "3px";
    popd_a_a[i].style.paddingRight   = "10px";
    popd_a_a[i].style.paddingBottom  = "3px";
    popd_a_a[i].style.paddingLeft    = "10px";
    popd_a_a[i].style.textDecoration = "none";
    popd_a_a[i].style.cursor         = "pointer";
    popd_a_a[i].style.color          = "#fff";
    popd_a_a[i].style.borderWidth    = "1px";
    popd_a_a[i].style.borderStyle    = "solid";
    popd_a_a[i].style.borderColor    = "#fff";
    popd_a_a[i].style.borderRadius   = "3px";
    popd_a_a[i].style.fontSize       = "80%";
    popd_a_a[i].style.lineHeight     = "1.5em";
  }
  popd_s.style.display = "inline-block";
  popd_s.style.padding = "3px";

  popd.appendChild(popd_t);
  popd.appendChild(popd_a);
  popd.appendChild(popd_s);
  popd.appendChild(popd_d);
  popd.id     = "popd";
  popd.style.position       = "fixed";
  popd.style.left           = "0";
  popd.style.bottom         = " -200px";
  popd.style.paddingTop     = "40px";
  popd.style.paddingRight   = "10px";
  popd.style.paddingBottom  = "40px";
  popd.style.paddingLeft    = "10px";
  popd.style.width          = "100%";
  popd.style.boxSizing      = "border-box";
  popd.style.textAlign      = "center";
  popd.style.backgroundColor= "#2c5aa0";
  popd.style.color          = "#fff";
  popd.style.fontWeight     = "bold";
  popd.style.zIndex         = "99";
  popd.style.transitionProperty = "bottom";
  popd.style.transitionDuration = "0.1s";

  popd_a.addEventListener("click", function() {
    popd.style.bottom = "-200px";
    sessionStorage.setItem('iBc', true);
    setTimeout(function() {
      document.body.removeChild(popd);
    }, 500);
  });
  popd_d.addEventListener("click", function() {
    popd.style.bottom = "-200px";
    localStorage.setItem('iBc', true);
    setTimeout(function() {
      document.body.removeChild(popd);
    }, 500);
  });
  popd.appendChild(popd_d);
  document.body.appendChild(popd);
  setTimeout(function() {
    popd.style.bottom = '0';
  }, 2000);
}
checkBrowser();
// Browser checking script END 
