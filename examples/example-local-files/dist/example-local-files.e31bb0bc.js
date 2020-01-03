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
})({"../../src/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startPlaying = exports.stopPlaying = exports.isPlaying = exports.getRandomNumberUpto = void 0;

var getRandomNumberUpto = function getRandomNumberUpto(max) {
  return Math.floor(Math.random() * max);
};

exports.getRandomNumberUpto = getRandomNumberUpto;

var isPlaying = function isPlaying($audioElement) {
  return $audioElement.duration > 0 && !$audioElement.paused;
};

exports.isPlaying = isPlaying;

var stopPlaying = function stopPlaying($audioElement) {
  $audioElement.pause();
  $audioElement.currentTime = 0;
};

exports.stopPlaying = stopPlaying;

var startPlaying = function startPlaying($audioElement) {
  $audioElement.loop = true;
  $audioElement.play();
};

exports.startPlaying = startPlaying;
},{}],"../../src/keyboard-buffer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var KeyBoardBuffer =
/*#__PURE__*/
function () {
  function KeyBoardBuffer() {
    _classCallCheck(this, KeyBoardBuffer);

    this.clear();
  }

  _createClass(KeyBoardBuffer, [{
    key: "store",
    value: function store(key) {
      if (this.length == 2) {
        this.head = this.head.next;
        this.length--;
      }

      var entry = {
        key: key
      };

      if (!this.head) {
        this.head = entry;
        this.length++;
        return;
      }

      this.head.next = entry;
      this.length++;
    }
  }, {
    key: "pressed",
    value: function pressed() {
      var constructPattern = function constructPattern(current) {
        if (!current) return "";
        return current.key + constructPattern(current.next);
      };

      if (!this.head) return "";
      return constructPattern(this.head);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = undefined;
      this.length = 0;
    }
  }, {
    key: "triggered",
    value: function triggered(pattern) {
      var pressed = this.pressed();
      var reversedPattern = pattern.split("").reverse().join("");
      return pressed == pattern || pattern == reversedPattern;
    }
  }]);

  return KeyBoardBuffer;
}();

exports.default = KeyBoardBuffer;
},{}],"../../src/state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var State =
/*#__PURE__*/
function () {
  function State() {
    _classCallCheck(this, State);

    this.state = {
      activatedBullets: false,
      activatedMoney: false
    };
  }

  _createClass(State, [{
    key: "get",
    value: function get() {
      return this.state;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.state = {
        activatedBullets: false,
        activatedMoney: false
      };
    }
  }]);

  return State;
}();

exports.default = State;
},{}],"../../src/markup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attachKmToDom = void 0;

var getMarkup = function getMarkup(config) {
  return "\n  <canvas id=\"km-canvas\" width=\"".concat(document.body.clientWidth, "\" height=\"").concat(document.body.clientHeight, "\" style=\"position:absolute; margin:0; padding:0;\"></canvas>\n  <img\n    src=\"").concat(config.images.bulletAbsoluteUrl, "\"\n    id=\"km-bullet\"\n    width=\"28\"\n    height=\"32\"\n    style=\"visibility:hidden;\"\n  />\n  <img\n    src=\"").concat(config.images.moneyAbsoluteUrl, "\"\n    id=\"km-money\"\n    width=\"256\"\n    height=\"64\"\n    style=\"visibility:hidden;\"\n  />\n  <audio id=\"km-konan\" src=\"").concat(config.sounds.konanAbsoluteUrl, "\"></audio>\n  <audio id=\"km-daj-pare\" src=\"").concat(config.sounds.dajPareAbsoluteUrl, "\"></audio>");
};

var attachKmToDom = function attachKmToDom(config) {
  var div = document.createElement("div");
  div.id = "km";
  div.innerHTML = getMarkup(config);
  document.body.appendChild(div);
};

exports.attachKmToDom = attachKmToDom;
},{}],"../../src/index.js":[function(require,module,exports) {
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

var canvasId = "km-canvas";
var buffer = new _keyboardBuffer.default();
var state = new _state.default();
var bulletsTrigger = "km";
var moneyTrigger = "dp";
var drawnBullets = [];
var drawnMoney = [];
var bulletRefreshInterval = 10;
var moneyRefreshInterval = 250;
var bulletFallingSpeed = 2.5;
var moneyFallingSpeed = 1;
var $bulletImageElement = undefined;
var $moneyImageElement = undefined;
var $konanAudioElement = undefined;
var $dajPareAudioElement = undefined;
var $canvas = undefined;
var $ctx = undefined;

var getRandomBulletPosition = function getRandomBulletPosition() {
  return {
    x: (0, _utils.getRandomNumberUpto)($canvas.width),
    y: -10
  };
};

var getRandomMoneyPosition = function getRandomMoneyPosition() {
  return {
    x: (0, _utils.getRandomNumberUpto)($canvas.width),
    y: (0, _utils.getRandomNumberUpto)($canvas.height)
  };
};

var clearCanvas = function clearCanvas() {
  $ctx.clearRect(0, 0, $canvas.width, $canvas.height);
};

var drawBullet = function drawBullet() {
  if (!state.get().activatedBullets) return;
  clearCanvas();
  drawnBullets.push(getRandomBulletPosition());
  drawnBullets.forEach(function (drawnBullet) {
    drawnBullet.y += bulletFallingSpeed;
    $ctx.beginPath();
    $ctx.drawImage($bulletImageElement, drawnBullet.x, drawnBullet.y);
  });
};

var drawMoney = function drawMoney() {
  if (!state.get().activatedMoney) return;
  clearCanvas();
  drawnMoney.push(getRandomMoneyPosition());
  drawnMoney.forEach(function (note) {
    note.y += moneyFallingSpeed;
    $ctx.beginPath();
    $ctx.drawImage($moneyImageElement, note.x, note.y);
  });
};

var updateStateOnKeyPress = function updateStateOnKeyPress(key) {
  buffer.store(key);
  var oldActivatedBullets = state.get().activatedBullets;
  var oldActivatedMoney = state.get().activatedMoney;

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

var onStateChange = function onStateChange() {
  var activatedBullets = state.get().activatedBullets;
  var activatedMoney = state.get().activatedMoney;

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

var initialize = function initialize(config) {
  (0, _markup.attachKmToDom)(config);
  $bulletImageElement = document.getElementById("km-bullet");
  $moneyImageElement = document.getElementById("km-money");
  $konanAudioElement = document.getElementById("km-konan");
  $dajPareAudioElement = document.getElementById("km-daj-pare");
  $canvas = document.getElementById(canvasId);
  $ctx = $canvas.getContext("2d");

  var _ref = config.params | {},
      customBulletRefreshInterval = _ref.customBulletRefreshInterval,
      customMoneyRefreshInterval = _ref.customMoneyRefreshInterval,
      customBulletFallingSpeed = _ref.customBulletFallingSpeed,
      customMoneyFallingSpeed = _ref.customMoneyFallingSpeed;

  bulletRefreshInterval = bulletRefreshInterval | customBulletRefreshInterval;
  moneyRefreshInterval = moneyRefreshInterval | customMoneyRefreshInterval;
  bulletFallingSpeed = bulletFallingSpeed | customBulletFallingSpeed;
  moneyFallingSpeed = moneyFallingSpeed | customMoneyFallingSpeed;

  document.onkeypress = function (event) {
    updateStateOnKeyPress(event.key);
    onStateChange();
  };

  setInterval(drawBullet, bulletRefreshInterval);
  setInterval(drawMoney, moneyRefreshInterval);
};

exports.initialize = initialize;
},{"./utils":"../../src/utils.js","./keyboard-buffer":"../../src/keyboard-buffer.js","./state":"../../src/state.js","./markup":"../../src/markup.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _index = require("../../src/index");

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
  (0, _index.initialize)(config);
})();
},{"../../src/index":"../../src/index.js"}],"../../../../../../Users/gboduljak/.nvm/versions/node/v13.5.0/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51565" + '/');

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
},{}]},{},["../../../../../../Users/gboduljak/.nvm/versions/node/v13.5.0/lib/node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/example-local-files.e31bb0bc.js.map