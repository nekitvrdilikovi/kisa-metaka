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
})({"node_modules/kisa-metaka/src/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startPlaying = exports.stopPlaying = exports.isPlaying = exports.getRandomNumberUpto = void 0;

const getRandomNumberUpto = max => Math.floor(Math.random() * max);

exports.getRandomNumberUpto = getRandomNumberUpto;

const isPlaying = $audioElement => $audioElement.duration > 0 && !$audioElement.paused;

exports.isPlaying = isPlaying;

const stopPlaying = $audioElement => {
  $audioElement.pause();
  $audioElement.currentTime = 0;
};

exports.stopPlaying = stopPlaying;

const startPlaying = $audioElement => {
  $audioElement.loop = true;
  $audioElement.play();
};

exports.startPlaying = startPlaying;
},{}],"node_modules/kisa-metaka/src/keyboard-buffer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class KeyBoardBuffer {
  constructor() {
    this.clear();
  }

  store(key) {
    this.buffer[this.head] = key;
    this.head = (this.head + 1) % this.buffer.length;
  }

  pressed() {
    return this.buffer.reduce((accumulator, current) => accumulator.concat(current), "");
  }

  clear() {
    this.buffer = [undefined, undefined];
    this.head = 0;
  }

  triggered(pattern) {
    const pressed = this.pressed();
    const reversedPattern = pattern.split("").reverse().join("");
    return pressed == pattern || pattern == reversedPattern;
  }

}

exports.default = KeyBoardBuffer;
},{}],"node_modules/kisa-metaka/src/state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class State {
  constructor() {
    this.state = {
      activatedBullets: false,
      activatedMoney: false
    };
  }

  get() {
    return this.state;
  }

  clear() {
    this.state = {
      activatedBullets: false,
      activatedMoney: false
    };
  }

}

exports.default = State;
},{}],"node_modules/kisa-metaka/src/markup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attachKmToDom = void 0;

const getMarkup = config => `
  <canvas id="km-canvas" width="${window.outerWidth}" height="${window.outerHeight}"></canvas>
  <img
    style="visibility:hidden"
    src="${config.images.bulletAbsoluteUrl}"
    id="km-bullet"
    width="28"
    height="32"
  />
  <img
    style="visibility:hidden"
    src="${config.images.moneyAbsoluteUrl}"
    id="km-money"
    width="256"
    height="64"
  />
  <audio id="km-konan" src="${config.sounds.konanAbsoluteUrl}"></audio>
  <audio id="km-daj-pare" src="${config.sounds.dajPareAbsoluteUrl}"></audio>`;

const attachKmToDom = config => {
  const div = document.createElement("div");
  div.id = "km";
  div.innerHTML = getMarkup(config);
  document.body.appendChild(div);
};

exports.attachKmToDom = attachKmToDom;
},{}],"node_modules/kisa-metaka/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = void 0;

var _utils = require("./utils");

var _keyboardBuffer = _interopRequireDefault(require("./keyboard-buffer"));

var _state = _interopRequireDefault(require("./state"));

var _markup = require("./markup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const canvasId = "km-canvas";
const buffer = new _keyboardBuffer.default();
const state = new _state.default();
const bulletsTrigger = "km";
const moneyTrigger = "dp";
const drawnBullets = [];
const drawnMoney = [];
const bulletRefreshInterval = 10;
const moneyRefreshInterval = 250;
const bulletFallingSpeed = 2.5;
const moneyFallingSpeed = 1;
let $bulletImageElement = undefined;
let $moneyImageElement = undefined;
let $konanAudioElement = undefined;
let $dajPareAudioElement = undefined;
let $canvas = undefined;
let $ctx = undefined;

const getRandomBulletPosition = () => {
  return {
    x: (0, _utils.getRandomNumberUpto)($canvas.width),
    y: -10
  };
};

const getRandomMoneyPosition = () => {
  return {
    x: (0, _utils.getRandomNumberUpto)($canvas.width),
    y: (0, _utils.getRandomNumberUpto)($canvas.height)
  };
};

const clearCanvas = () => {
  $ctx.clearRect(0, 0, $canvas.width, $canvas.height);
};

const drawBullet = () => {
  if (!state.get().activatedBullets) return;
  clearCanvas();
  const bullet = getRandomBulletPosition();
  drawnBullets.push(bullet);
  drawnBullets.forEach(drawnBullet => {
    drawnBullet.y += bulletFallingSpeed;
    $ctx.beginPath();
    $ctx.drawImage($bulletImageElement, drawnBullet.x, drawnBullet.y);
  });
};

const drawMoney = () => {
  if (!state.get().activatedMoney) return;
  clearCanvas();
  const money = getRandomMoneyPosition();
  drawnMoney.push(money);
  drawnMoney.forEach(note => {
    note.y += moneyFallingSpeed;
    $ctx.beginPath();
    $ctx.drawImage($moneyImageElement, note.x, note.y);
  });
};

const updateStateOnKeyPress = key => {
  buffer.store(key);
  const oldActivatedBullets = state.get().activatedBullets;
  const oldActivatedMoney = state.get().activatedMoney;

  if (buffer.triggered(bulletsTrigger)) {
    state.get().activatedBullets = !oldActivatedBullets;
    if (state.get().activatedBullets) state.get().activatedMoney = false;
    buffer.clear();
  }

  if (buffer.triggered(moneyTrigger)) {
    state.get().activatedMoney = !oldActivatedMoney;
    if (state.get().activatedMoney) state.get().activatedBullets = false;
    buffer.clear();
  }
};

const onStateChange = () => {
  const activatedBullets = state.get().activatedBullets;
  const activatedMoney = state.get().activatedMoney;
  console.log(state.get());

  if (activatedBullets) {
    if ((0, _utils.isPlaying)($konanAudioElement)) return;
    if ((0, _utils.isPlaying)($dajPareAudioElement)) (0, _utils.stopPlaying)($dajPareAudioElement);
    (0, _utils.startPlaying)($konanAudioElement);
    return;
  }

  if (activatedMoney) {
    if ((0, _utils.isPlaying)($dajPareAudioElement)) return;
    if ((0, _utils.isPlaying)($konanAudioElement)) (0, _utils.stopPlaying)($konanAudioElement);
    (0, _utils.startPlaying)($dajPareAudioElement);
    return;
  }

  if (!activatedBullets) {
    clearCanvas();
    drawnBullets.length = 0;
    (0, _utils.stopPlaying)($konanAudioElement);
  }

  if (!activatedMoney) {
    clearCanvas();
    drawnMoney.length = 0;
    (0, _utils.stopPlaying)($dajPareAudioElement);
  }
};

const initialize = config => {
  (0, _markup.attachKmToDom)(config);
  $bulletImageElement = document.getElementById("km-bullet");
  $moneyImageElement = document.getElementById("km-money");
  $konanAudioElement = document.getElementById("km-konan");
  $dajPareAudioElement = document.getElementById("km-daj-pare");
  $canvas = document.getElementById(canvasId);
  $ctx = $canvas.getContext("2d");

  document.onkeypress = event => {
    updateStateOnKeyPress(event.key);
    onStateChange();
  };

  setInterval(drawBullet, bulletRefreshInterval);
  setInterval(drawMoney, moneyRefreshInterval);
};

exports.initialize = initialize;
},{"./utils":"node_modules/kisa-metaka/src/utils.js","./keyboard-buffer":"node_modules/kisa-metaka/src/keyboard-buffer.js","./state":"node_modules/kisa-metaka/src/state.js","./markup":"node_modules/kisa-metaka/src/markup.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _kisaMetaka = require("kisa-metaka");

(function () {
  var config = {
    images: {
      bulletAbsoluteUrl: window.location.href + "bullet.png",
      moneyAbsoluteUrl: window.location.href + "money.png"
    },
    sounds: {
      konanAbsoluteUrl: window.location.href + "konan.mp3",
      dajPareAbsoluteUrl: window.location.href + "daj-pare.mp3"
    },
    rootElementId: "km"
  };
  (0, _kisaMetaka.initialize)(config);
})();
},{"kisa-metaka":"node_modules/kisa-metaka/src/index.js"}],"../../../../../Users/gboduljak/.nvm/versions/node/v13.5.0/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52086" + '/');

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
},{}]},{},["../../../../../Users/gboduljak/.nvm/versions/node/v13.5.0/lib/node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/test.e31bb0bc.js.map