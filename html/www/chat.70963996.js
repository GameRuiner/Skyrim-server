// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"chat_files/chat.ts":[function(require,module,exports) {
"use strict"; // const ipAndPort: string = window.location.href.split('/')[2];
// const ip: string = ipAndPort.split(':')[0];
// const uiPort: number = +ipAndPort.split(':')[1];

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var ip = '127.0.0.1';
var uiPort = 3000;
var chat_size = 50,
    // сколько сообщений помещаем в чат
common_chat_size = 100,
    // размер общего чата
I_AM = 'Exhort'; // никнейм, тянуть с api.

var dom_time = document.getElementById('header__time'),
    head_chatname = document.getElementById('header__chatname'),
    menu_ul = document.getElementById('menu__ul'),
    chat_sendform = document.getElementById('chat__sendform'),
    chat_sendform_button = document.querySelector('#chat__sendform button'); // по этой штуке находим какие менюхи соотносятся с какими чатами

var chats = {
  menu__ul__1: 'chat__1',
  menu__ul__2: 'chat__2',
  menu__ul__3: 'chat__3',
  menu__ul__4: 'chat__4'
};
var isScroll = true,
    // по этой штуке определяется, надо ли опускать скрол при появлении нового сообщения
author_color = {};
chat_sendform_button.addEventListener('click', function () {
  var chat_uls = Array.from(document.querySelectorAll('.chat__ul'));
  var formData = new FormData(chat_sendform);

  for (var i = 0; i < chat_uls.length; i++) {
    if (!chat_uls[i].classList.contains('hide')) {
      if (i > 0) connection.send(JSON.stringify({
        type: 'chatMessage',
        text: formData.get('message'),
        channelIdx: i
      }));
    }
  }

  chat_sendform.reset();
}); // chat_sendform.onsubmit = (event) => {
// 	event.preventDefault();
// 	const chat_uls = [...document.querySelectorAll('.chat__ul')];
// 	for (let i = 0; i < chat_uls.length; i++) {
// 		if (!chat_uls[i].classList.contains('hide')) {
// 			if (i > 0)
// 				connection.send(
// 					JSON.stringify({
// 						type: 'chatMessage',
// 						text: event.srcElement[0].value,
// 						channelIdx: i,
// 					})
// 				);
// 		}
// 	}
// 	chat_sendform.reset(); // отмена перезагрузки странцы, потом в ajax можно сделать, если будет ajax
// };

if (menu_ul) {
  menu_ul.addEventListener('click', function (event) {
    // event - слушатель на все вкладки менюхи
    active(event.target);
  });
} // т.к. нет скайримского времени на данный момент, то поставил реальное покачто


if (dom_time) {
  var showTime = function showTime() {
    dom_time.innerText = realTime();
  };

  setInterval(showTime, 1000);
}

var realTime = function realTime() {
  var time = new Date();
  var hour = time.getHours().toString();
  var minute = time.getMinutes().toString();

  if (hour.length == 1) {
    hour = '0' + hour;
  }

  if (minute.length == 1) {
    minute = '0' + minute;
  }

  return hour + ':' + minute;
};

var active = function active(elem) {
  // смена цвета вкладок менюхи и смена названия в хедере
  if (!elem.classList.contains('active')) {
    var menu_items = document.getElementsByClassName('menu__ul__item');

    try {
      for (var i = 0; i < menu_items.length; i++) {
        menu_items[i].classList.remove('active');
      }
    } catch (e) {
      console.log(e);
    }

    elem.classList.add('active');

    if (chats.hasOwnProperty(elem.id)) {
      chatShowing(chats[elem.id].replace('chat__', ''));
    }

    var chat__sendform = document.getElementById('chat__sendform');
    var chatline = document.getElementById('chatline');

    if (chat__sendform && chatline) {
      if (elem.id == 'menu__ul__1') {
        // либо можно по innerText
        chat__sendform.style.display = 'none';
        chatline.style.height = '295px';
      } else {
        chat__sendform.style.display = 'flex';
        chatline.style.height = '265px';
      }
    } // хз какие будут вкладки, если есть уникальные названия, то сюда


    switch (elem.innerText) {
      case 'Чат':
        head_chatname.innerText = 'Общий Чат';
        break;

      case 'RP':
        head_chatname.innerText = 'Roleplay Чат';
        break;

      default:
        head_chatname.innerText = elem.innerText;
        break;
    }
  }
};

function addMenuItem(name) {
  var mdiv = document.createElement('li'),
      menu_items = document.getElementsByClassName('menu__ul__item'),
      num = Object.keys(chats).length + 1;
  mdiv.innerText = name;
  mdiv.classList.add('menu__ul__item');
  mdiv.id = 'menu__ul__' + num;
  menu_ul.appendChild(mdiv);
  chats[mdiv.id] = 'chat__' + num.toString();
  chat_sendform.insertAdjacentHTML('beforebegin', '<ul class="chat__ul chat__offli hide" id="chat__' + num + '"></ul>');
  var chat = document.getElementById('chat__' + num);

  chat.onscroll = function () {
    if (chat.scrollTop == chat.scrollHeight - chat.clientHeight) {
      isScroll = true;
    } else {
      isScroll = false;
    }
  };

  if (menu_items.length == 8) {
    // разделитель менюхи на 2 части
    menu_ul.style.flexWrap = 'wrap';
    menu_items[3].insertAdjacentHTML('afterend', '<div class="line-break" id="lb"></div>');
  }
}

function removeMenuItem(elem) {
  var menu_items = __spreadArrays(document.querySelectorAll('.menu__ul__item')),
      chat = document.getElementById(chats[elem.id]);

  delete chats[elem.id];
  chat.remove();
  elem.remove();

  if (menu_items.length < 8 && menu_items.length >= 7) {
    // удаление разделителя менюхи
    menu_ul.style.flexWrap = 'nowrap';

    try {
      // чтобы проверку не делать -- в try/catch, потом можно переделать
      document.getElementById('lb').remove();
    } catch (e) {
      console.log(e);
    }
  }

  active(document.getElementById('menu__ul__1')); // переход после удаления на общий чат
}

function chatShowing(id) {
  // хайдит и шовит нужный чат
  var chat_uls = document.getElementsByClassName('chat__ul'),
      chat = document.getElementById('chat__' + id);

  try {
    for (var i = 0; i < chat_uls.length; i++) {
      if (!chat_uls[i].classList.contains('hide')) {
        chat_uls[i].classList.add('hide');
      }
    }
  } catch (e) {
    console.log(e);
  }

  chat.classList.remove('hide');
  chat.scrollTop = chat.scrollHeight - chat.clientHeight; // держит скролл внизу
}

function addMsg(author, msg, time, chat) {
  // наверняка есть более эффективное решение, но покачто в рабочем состоянии
  var common_chat = document.getElementById('chat__1');
  var color; //if (msg.length == 0) { return; } // если не над пустых сообщений, то раскомент

  if (author_color.hasOwnProperty(author)) {
    // можно переделать их различение по id потом, как api будет
    color = author_color[author];
  } else {
    var red = Math.floor(50 + Math.random() * (255 + 1 - 50)),
        green = Math.floor(50 + Math.random() * (255 + 1 - 50)),
        blue = Math.floor(50 + Math.random() * (255 + 1 - 50));
    color = 'rgb(' + red + ',' + green + ',' + blue + ');';
    author_color[author] = color;
  }

  chat.insertAdjacentHTML('beforeend', '<li class="chat__ul__item animate">' + '<div>' + '<span style="color:' + color + '">' + author + '</span>' + ' : ' + '<span>' + msg + '<span></div>' + '</li>');
  setTimeout(delAnimate, 1010, chat.lastElementChild);

  if (chat.childNodes.length >= chat_size) {
    // удаляем самое верхнее сообщение
    chat.removeChild(chat.firstElementChild);
  }

  common_chat.insertAdjacentHTML('beforeend', '<li class="chat__ul__item animate">' + '<div>[' + time + '] ' + '<span style="color:' + color + '">' + author + '</span>' + ' : ' + '<span>' + msg + '<span></div>' + '</li>');
  setTimeout(delAnimate, 1010, common_chat.lastElementChild);

  if (common_chat.childNodes.length >= common_chat_size) {
    // удаляем самое верхнее сообщение
    common_chat.removeChild(common_chat.firstElementChild);
  }

  if (isScroll == true) {
    common_chat.scrollTop = common_chat.scrollHeight - common_chat.clientHeight;
  }

  if (chat != document.getElementById('chat__1')) {
    chat.scrollTop = chat.scrollHeight - chat.clientHeight;
  }

  if (chat.scrollHeight > chat.clientHeight) {
    viewportElems(chat);
  }
}

function delAnimate(elem) {
  elem.classList.remove('animate');
}

var mAreaBot = document.getElementById('magicarea').getBoundingClientRect().bottom,
    mAreaTop = document.getElementById('magicarea').getBoundingClientRect().top;

function viewportElems(chat) {
  var elems = chat.childNodes;

  for (var i = 1; i < elems.length; i++) {
    if (elems[i].getBoundingClientRect().top < mAreaBot && elems[i].getBoundingClientRect().top > mAreaTop) {
      var elemTop = elems[i].getBoundingClientRect().top;
      var elemBot = elems[i].getBoundingClientRect().bottom;
      var rotate = Math.round(Math.abs(elemTop - mAreaBot) / Math.abs(mAreaTop - mAreaBot) * 90);
      elems[i].lastElementChild.style.webkitTransform = 'rotate3d(1, 0, 0, ' + rotate + 'deg)';
      elems[i].lastElementChild.style.opacity = Math.abs(1 - Math.abs(elemTop - mAreaBot) / Math.abs(mAreaTop - mAreaBot));
    }

    if (elems[i].getBoundingClientRect().top > mAreaBot) {
      elems[i].lastElementChild.style.webkitTransform = 'rotate3d(0, 0, 0, 0deg)';
      elems[i].lastElementChild.style.opacity = 1;
    }

    if (elems[i].getBoundingClientRect().top <= mAreaTop) {
      elems[i].lastElementChild.style.webkitTransform = 'rotate3d(1, 0, 0, ' + 90 + 'deg)';
      elems[i].lastElementChild.style.opacity = 0;
    }
  }
}

(function () {
  var items = __spreadArrays(document.querySelectorAll('.chat__ul'));

  var _loop_1 = function _loop_1(i) {
    items[i].onscroll = function () {
      viewportElems(items[i]);

      if (items[i].scrollTop + 2 >= items[i].scrollHeight - items[i].clientHeight) {
        isScroll = true;
      } else {
        isScroll = false;
      }
    };
  };

  for (var i = 0; i < items.length; i++) {
    _loop_1(i);
  }
})();

(function () {
  active(document.getElementById('menu__ul__1'));
})();

var connection;
var interval;

var socketMessageListener = function socketMessageListener(event) {
  // append received message from the server to the DOM element
  //document.write("data:", JSON.stringify(event.data));
  var chat_uls = document.getElementsByClassName('chat__ul');
  var obj = JSON.parse(event.data);
  console.log(obj); //addMsg(obj.author || "Unknown Author", obj.text, realTime(), chat_uls[0]);

  var channelIdx = +obj.channelIdx;
  if (channelIdx >= 0 && channelIdx <= 3) addMsg(obj.author || 'Unknown Author', obj.text, realTime(), chat_uls[channelIdx]);
};

var socketOpenListener = function socketOpenListener(event) {
  interval = setInterval(function () {
    if (window.spBrowserToken) {
      connection.send(JSON.stringify({
        type: 'token',
        token: window.spBrowserToken
      }));
      clearInterval(interval);
    }
  }, 100);
};

var socketCloseListener = function socketCloseListener() {
  var wsendpoint = 'ws://' + ip + ':' + (uiPort === 3000 ? 8080 : uiPort + 1);
  console.log('Connecting to ' + wsendpoint);
  connection = new WebSocket(wsendpoint);
  connection.addEventListener('open', socketOpenListener);
  connection.addEventListener('message', socketMessageListener);
  connection.addEventListener('close', socketCloseListener);
};

socketCloseListener();
},{}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "11209" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","chat_files/chat.ts"], null)