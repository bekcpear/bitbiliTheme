/**
 * A script for moego.me
 * @author Bekcpear
 * */

'use strict';

var w       = '20px';
var h       = '30px';
var f       = '12px';
var ff      = '"Noto Sans", "Noto Sans CJK SC", "Noto Sans CJK TC", "Source Han Sans", "Source Han Sans SC", "Source Han Sans TC", "Hiragino Sans GB", SimSun, 宋体, STXihei, 华文细黑, arial, sans-serif';
var iw      = 68;
var cw      = 14;
var bw      = 1;
var pw      = 2;
var mw      = 5;
var bcLL    = '#a1aab8';
var bcNN    = '#2c5aa0';
var bc      = bcNN;
var bcd     = '#162d50';
var bcL     = '#95accf';
var bcl     = bcl;
var dc      = '#ffffff';

var b       = document.getElementsByTagName('body')[0];
var tool    = document.getElementById('tool');
var chBg    = document.createElement('a');
var jTop    = document.createElement('a');

function getCompSty(e, p) {
  return window.getComputedStyle(e, null).getPropertyValue(p);
}

function hexToDec(h) {
    var r = 0, d;
    h = h.toLowerCase();
    for (var i = 0; i < h.length; i++) {
        d = '0123456789abcdefgh'.indexOf(h[i]);
        r = r * 16 + d;
    }
    return r;
}

function rgbToHex(s) {
  var a = s.match(/[\.0-9]+/g);
  var c = "#" + ((1 << 24) + (parseInt(a[0]) << 16) + (parseInt(a[1]) << 8) + parseInt(a[2])).toString(16).slice(1);
  if (a[3] != undefined) {
    c = c + Math.round(parseFloat(a[3]) * 255).toString(16);
  }
  return c;
}

function setMaskImage(e, i) {
  e.style.webkitMaskImage = i;
  e.style.webkitMaskSize = (cw + pw) + 'px';
  e.style.webkitMaskRepeat = 'no-repeat';
  e.style.webkitMaskPosition = 'center';
  e.style.maskImage = i;
  e.style.maskSize = (cw + pw) + 'px';
  e.style.maskRepeat = 'no-repeat';
  e.style.maskPosition = 'center';
}
function unsetMaskImage(e) {
  e.style.webkitMask = 'none';
  e.style.mask = 'none';
}

var buttons = [chBg, jTop];
for (var i = 0; i < buttons.length; ++i) {
  buttons[i].style.display = 'inline-block';
  buttons[i].style.textDecoration = 'none';
  buttons[i].style.cursor = 'pointer';
  buttons[i].style.whiteSpace = 'pre';
  buttons[i].style.height = h;
  buttons[i].style.padding = '7px 10px 5px 10px';
  buttons[i].style.border = 'none';
  buttons[i].style.boxSizing = 'border-box';
  buttons[i].style.color = '#fff';
  buttons[i].style.backgroundColor = bc;
  buttons[i].style.fontSize = f;
  buttons[i].style.fontFamily = ff;
  buttons[i].style.lineHeight = '1.5em';
  buttons[i].style.verticalAlign = 'bottom';
}
jTop.style.borderRight = 'solid 1px ' + bcl;
jTop.style.width = h;
setMaskImage(jTop, 'url(/theme/images/fa/solid/caret-square-up.svg)');
chBg.style.width = h;
setMaskImage(chBg, 'url(/theme/images/fa/solid/fill.svg)');

var chBgDiv = document.createElement('div');
chBgDiv.style.width = 0;
chBgDiv.style.overflow = 'hidden';
chBgDiv.style.display = 'inline-block';
chBgDiv.style.backgroundColor = bc;
chBgDiv.style.height = h;
chBgDiv.style.maxHeight = h;
chBgDiv.style.boxSizing = 'content-box';
chBgDiv.style.position = 'relative';
chBgDiv.style.verticalAlign = 'bottom';
function closePanel() {
  if (chBg.getAttribute('opened') == 1) {
    setTimeout(function() {
      chBgDiv.style.width = 0;
      while(chBgDiv.firstChild) {
        chBgDiv.removeChild(chBgDiv.firstChild);
      }
      chBg.setAttribute('opened', 0);
    }, 100);
  }
}

var colorNotif = document.createElement('span');
var colorWarni = document.createElement('span');
var colorAlert = document.createElement('span');
var colorNotis = [colorNotif, colorWarni, colorAlert];
for (var i = 0; i < colorNotis.length; ++i) {
  colorNotis[i].style.transitionProperty = 'right';
  colorNotis[i].style.transitionDuration = '0.1s';
  colorNotis[i].style.display = 'block';
  colorNotis[i].style.position = 'fixed';
  colorNotis[i].style.zIndex = -1;
  colorNotis[i].style.bottom = '30px';
  colorNotis[i].style.color = '#fff';
  colorNotis[i].style.padding = '6px 12px';
  colorNotis[i].style.height = h;
  colorNotis[i].style.boxSizing = 'border-box';
  colorNotis[i].style.border = 'none';
  colorNotis[i].style.fontSize = f;
  colorNotis[i].style.fontWeight = 'bold';
  colorNotis[i].style.textAlign = 'center';
  colorNotis[i].style.right = '-100%';
}
colorWarni.style.bottom = '60px';
colorNotif.style.backgroundColor = bcd;
colorWarni.style.backgroundColor = '#ff6d00';
colorAlert.style.backgroundColor = '#dd2c00';
var ao = [];
var tHiddenTime = 3000;
async function showMsg(o) {
  for (var i = 0; i < ao.length; ++i) {
    if (ao[i].el == o.el) {
      ao[i].show(o.msg);
      return true;
    }
  }
  ao[i] = o;
  ao[i].hide = async function(tio) {
    if (tio == undefined) {
      tio = tHiddenTime;
    }
    this.timeStart = Date.now();
    this.timer = setTimeout(function(aoo){
      aoo.el.style.right = '-' + getCompSty(aoo.el, 'width');
      aoo.showing = false;
    }, tio, this);
  };
  ao[i].show = async function(newMsg) {
    if (this.showing == true) {
      if (newMsg == this.msg) {
        clearTimeout(this.timer);
        this.hide();
      } else {
        if (this.secTimer > 0) {
          alert("请不要玩弄小工具！");
          return false;
        } else {
          var leftTime = tHiddenTime + 200 - Date.now() + this.timeStart;
          leftTime = leftTime < 1000 ? 200 : (leftTime - 1000 < 200 ? 200 : leftTime - 1000);
          clearTimeout(this.timer);
          this.hide(leftTime - 200);
          this.secTimer = setTimeout(function(aoo){
            aoo.show(newMsg);
            aoo.secTimer = null;
          }, leftTime, this);
        }
      }
    } else {
      var thT = tHiddenTime;
      for (var i = 0; i < ao.length; ++i) {
        if (ao[i].showing == true) {
          thT = thT + (tHiddenTime * 0.5);
          clearTimeout(ao[i].timer);
          ao[i].hide(thT);
        }
      }
      this.showing = true;
      this.el.firstChild ? this.el.removeChild(this.el.firstChild) : true;
      if (newMsg != undefined) {
        this.el.appendChild(document.createTextNode(newMsg));
      } else {
        this.el.appendChild(document.createTextNode(this.msg));
      }
      this.el.style.right = 0;
      this.hide(thT);
    }
  };
  ao[i].show();
  return true;
}
/**
 * do action:
 * m => array[{msg: '', act: num}, ...]
 *  act => 0: set cookie
 *         1: show error
 *         2: show warning
 *        -1: clear cookie
 **/
async function doAct(m) {
  for (var i = 0; i < m.length; i++) {
    switch(m[i].act) {
      case 0:
        var c  = window.getComputedStyle(b, null).getPropertyValue('background-color');
        document.cookie = "bgColor=" + encodeURIComponent(c) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
        showMsg({el: colorNotif, msg: m[i].msg});
        closePanel();
        break;
      case 1:
        showMsg({el: colorAlert, msg: m[i].msg});
        break;
      case 2:
        showMsg({el: colorWarni, msg: m[i].msg});
        break;
      case -1:
        document.cookie = "bgColor=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        showMsg({el: colorNotif, msg: m[i].msg});
        closePanel();
        break;
      default:
    }
  }
}

chBg.addEventListener('click', function() {
  if (chBg.getAttribute('opened') == 1) {
    closePanel();
    return;
  }
  var cc = window.getComputedStyle(b, null).getPropertyValue('background-color');
  chBg.setAttribute('opened', 1);
  chBgDiv.style.transitionProperty = 'width';
  chBgDiv.style.transitionDuration = '0.1s';

  var colorInput = document.createElement('input');
  var colorSubmi = document.createElement('button');
  var colorReset = document.createElement('button');
  var inputs     = [colorInput, colorSubmi, colorReset];
  for (var i = 0; i < inputs.length; ++i) {
    inputs[i].style.width = cw + 'px';
    inputs[i].style.height = cw + 'px';
    inputs[i].style.padding = pw + 'px';
    inputs[i].style.margin = mw + 'px';
    inputs[i].style.border = bw + 'px solid ' + bc;
    inputs[i].style.outline = 'none';
    inputs[i].style.backgroundColor = bcl;
    inputs[i].style.boxSizing = 'content-box';
    inputs[i].style.verticalAlign = 'bottom';
  }
  colorInput.style.width = iw + 'px';
  colorInput.style.fontFamily = 'monospace';
  colorInput.style.fontSize = '12px';
  colorInput.style.textAlign = 'center';
  colorInput.setAttribute('spellcheck', false);
  colorInput.value = rgbToHex(window.getComputedStyle(b, null).getPropertyValue('background-color'));

  colorSubmi.style.cursor = 'pointer';
  colorReset.style.cursor = 'pointer';
  setMaskImage(colorSubmi, 'url(/theme/images/fa/solid/check.svg)');
  setMaskImage(colorReset, 'url(/theme/images/fa/solid/undo-alt.svg)');

  var gray   = document.createElement('a');
  var yellow = document.createElement('a');
  var green  = document.createElement('a');
  var colors = [gray, yellow, green];
  for (var i = 0; i < colors.length; ++i) {
    colors[i].style.display = 'inline-block';
    colors[i].style.padding = pw + 'px';
    colors[i].style.margin  = mw + 'px';
    colors[i].style.width   = cw + 'px';
    colors[i].style.height  = cw + 'px';
    colors[i].style.cursor  = 'pointer';
    colors[i].style.borderStyle = 'solid';
    colors[i].style.borderWidth = bw + 'px';
    colors[i].style.boxSizing = 'content-box';
    colors[i].style.verticalAlign = 'bottom';
    colors[i].onclick = function() {
      colorInput.value = rgbToHex(this.style.backgroundColor);
      setBackground(this.style.backgroundColor);
    };
  }
  gray.style.marginLeft        = (mw * 2) + 'px';
  gray.style.backgroundColor   = '#eee';
  gray.style.borderColor       = '#e7e7e7';
  yellow.style.backgroundColor = '#f5eab3';
  yellow.style.borderColor     = '#ede2df';
  green.style.backgroundColor  = '#c8e6c9';
  green.style.borderColor      = '#c0dec1';

  /* check the validity of color value
   * return false when check failed
   * return an array when color is not suitable */
  function checkValid(c) {
    var hC = true;
    var rC = true;
    var ca = [];
    if (c.search(/^#?([a-f0-9]{3}|[a-f0-9]{6}|[a-f0-9]{8})$/i) !== 0) {
      hC = false;
    } else if (c.search(/^#/) !== 0) {
      c = '#' + c;
    }
    if (c.search(/^rgb[a]?\((?:[01]?\d{1,2}|2[0-4]\d{1}|25[0-5]{1}),\s*(?:[01]?\d{1,2}|2[0-4]\d{1}|25[0-5]{1}),\s*(?:[01]?\d{1,2}|2[0-4]\d{1}|25[0-5]{1})\s*(?:,\s*(?:1|0?\.[0-9]+))?\)$/i) !== 0) {
      rC = false;
    }
    if (!hC && !rC) {
      return false;
    } else if (hC) {
      if (c.length < 7) {
        c = c[0] + c[1] + c[1] + c[2] + c[2] + c[3] + c[3];
      }
      ca = c.match(/[a-f0-9]{2}/g);
      for (var i = 0; i < ca.length; ++i) {
        if (i == 3) {
          ca[i] = hexToDec(ca[i]) / 255;
        } else {
          ca[i] = hexToDec(ca[i]);
        }
      }
    } else if (rC) {
      ca = c.match(/[\.0-9]+/g);
    }
    // check brightness; HSP color model http://alienryderflex.com/hsp.html
    var brightness = 0;
    brightness = Math.sqrt(ca[0]*ca[0] * 0.299 + ca[1]*ca[1] * 0.587 + ca[2]*ca[2] * 0.114);
    if (ca[3] != undefined) {
      brightness = ca[3] * brightness + (1 - ca[3]) * 255;
    }
    if (brightness < 128) {
      return [c, brightness];
    }
    return c;
  }
  
  colorInput.oninput = function() {
    var c = checkValid(colorInput.value);
    if (typeof(c) == 'object') {
      c = c[0];
    }
    if (c != false) {
      setBackground(c);
    } else {
      setBackground(cc);
    }
  };

  colorSubmi.onmousedown = function() {
    colorSubmi.style.backgroundColor = '#fff';
  };
  colorSubmi.onmouseup = function() {
    colorSubmi.style.backgroundColor = bcl;
  };
  colorSubmi.onclick = function() {
    var c = checkValid(colorInput.value);
    var m = [];
    if (c == false) {
      doAct([{msg: '无效的颜色，支持 HEX 和 RGB 格式', act: 1}]);
      return;
    } else if (typeof(c) == "object") {
      m[m.length] = {msg: '我对过暗的底色未配置前景色转换', act: 2};
    }
    m[m.length] = {msg: '当前底色已存入 Cookie', act: 0};
    doAct(m);
  };

  colorReset.onmousedown = function() {
    colorReset.style.backgroundColor = '#fff';
  };
  colorReset.onmouseup = function() {
    colorReset.style.backgroundColor = bcl;
  };
  colorReset.onclick = function() {
    setBackground(null);
    colorInput.value = dc;
    doAct([{msg: '已重置底色并移除该 Cookie', act: -1}]);
  };

  chBgDiv.appendChild(gray);
  chBgDiv.appendChild(yellow);
  chBgDiv.appendChild(green);
  chBgDiv.appendChild(colorInput);
  chBgDiv.appendChild(colorSubmi);
  chBgDiv.appendChild(colorReset);

  chBgDiv.style.width = (mw + 5 * (cw + bw * 2 + pw * 2 + mw * 2) + iw + bw * 2 + pw * 2 + mw * 2) + 'px';
});

var docFooter = document.querySelector('footer');
var footerHeight = parseInt(getCompSty(docFooter, 'height'));
function htsTools() {
  var innerW = window.innerWidth;
  if (innerW < 1110) {
    bc = bcLL;
    bcl = '#fff';
    tool.style.position = 'absolute';
    tool.style.top = 0;
    tool.style.bottom = 'unset';
    chBg.style.backgroundColor = bc;
    jTop.style.backgroundColor = bc;
    chBgDiv.style.backgroundColor = bc;
    var alertOffsetHeighx = window.innerHeight 
        - parseInt(getCompSty(document.querySelector('body'), 'height'));
    var alertOffsetHeight = (alertOffsetHeighx > 0 ? alertOffsetHeighx : 0) 
        + footerHeight;
    for (var i = 0; i < colorNotis.length; ++i) {
      colorNotis[i].style.bottom = alertOffsetHeight + 'px';
    }
    colorWarni.style.bottom = (alertOffsetHeight + 30) + 'px';
  } else {
    bc  = bcNN;
    bcl = bcL;
    tool.style.position = 'fixed';
    tool.style.top = 'unset';
    tool.style.bottom = 0;
    chBg.style.backgroundColor = bc;
    jTop.style.backgroundColor = bc;
    chBgDiv.style.backgroundColor = bc;
    for (var i = 0; i < colorNotis.length; ++i) {
      colorNotis[i].style.bottom = '30px';
    }
    colorWarni.style.bottom = '60px';
  }
}
htsTools();
// check footer height 10 times
(async function() {
  var loopTime = 0;
  var loopFunc = function() {
    setTimeout(function(){
      if (parseInt(getCompSty(docFooter, 'height')) != footerHeight) {
        footerHeight = parseInt(getCompSty(docFooter, 'height'));
        htsTools();
      }
      loopTime++;
      loopTime < 10 ? loopFunc() : false;
    }, 500);
  }
  loopFunc();
})();

tool.appendChild(jTop);
tool.appendChild(colorAlert);
tool.appendChild(colorWarni);
tool.appendChild(colorNotif);
tool.appendChild(chBgDiv);
tool.appendChild(chBg);

jTop.addEventListener('click', function() {
  window.scrollTo(0, 0);
});

// redraw menu list
var menuList  = document.querySelector('#menu').cloneNode(true);
menuList.setAttribute('id', 'footerMenu');
var appendBox = document.createElement('div');
docFooter.appendChild(appendBox);
function rdMenu() {
  var innerW = window.innerWidth;
  if (innerW <= 1110) {
    appendBox.appendChild(menuList);
  } else {
    while(appendBox.firstChild) {
      appendBox.removeChild(appendBox.firstChild);
    }
  }
}
rdMenu();

window.addEventListener('resize', function(){
  htsTools();
  rdMenu();
});
