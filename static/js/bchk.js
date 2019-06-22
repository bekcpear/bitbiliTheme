/**
 * A browser checking script for moego.me
 * @author Bekcpear
 * */

'use strict';

window.addEventListener('load', function(){
  var ignoreBrowserCheck = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent('iBc').replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

  if (ignoreBrowserCheck) return false;
  else if (navigator.userAgent.indexOf('Edge/') > -1) true;
  // 不是很懂为什么之前未使用 Blink 引擎的 Edge 浏览器也会有 AppleWebKit 和 Chrome 字段，可能是使用了老版本的引擎？反正渲染出错。
  else if (navigator.userAgent.indexOf('Chrome/') > -1
        && parseInt(navigator.userAgent.match(/Chrome\/(\d+)\./)[1]) >= 70) return true;
  else if ( navigator.userAgent.indexOf('AppleWebKit/') > -1
            && ( navigator.userAgent.indexOf('iPhone') > -1
                 || navigator.userAgent.indexOf('iPad') > -1) ) return true;
  // iOS 上的 Safari 实测问题也不大，不过要是显示范围扩大的话，大概会和 MacOS 上的 Safari 一样出现菜单无法固定显示的问题。

  var popd    = document.createElement("div");
  var popd_t  = document.createElement("div");
  var popd_tt = document.createTextNode("本站仅对基于 Chromium 且内核较新的浏览器（Chromium, Google Chrome, Opera, Vivaldi 等）做最佳阅读支持。");
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
    document.cookie = "iBc=true; path=/"
    setTimeout(function() {
      document.body.removeChild(popd);
    }, 500);
  });
  popd_d.addEventListener("click", function() {
    popd.style.bottom = "-200px";
    document.cookie = "iBc=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/"
    setTimeout(function() {
      document.body.removeChild(popd);
    }, 500);
  });
  popd.appendChild(popd_d);
  document.body.appendChild(popd);
  setTimeout(function() {
    popd.style.bottom = '0';
  }, 500);
});
