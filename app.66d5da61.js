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
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"scss/app.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../fonts/fontawesome-webfont.eot":[["fontawesome-webfont.a16b4b15.eot","fonts/fontawesome-webfont.eot"],"fonts/fontawesome-webfont.eot"],"./../fonts/fontawesome-webfont.woff2":[["fontawesome-webfont.328ae129.woff2","fonts/fontawesome-webfont.woff2"],"fonts/fontawesome-webfont.woff2"],"./../fonts/fontawesome-webfont.woff":[["fontawesome-webfont.83d56cc7.woff","fonts/fontawesome-webfont.woff"],"fonts/fontawesome-webfont.woff"],"./../fonts/fontawesome-webfont.ttf":[["fontawesome-webfont.c6670704.ttf","fonts/fontawesome-webfont.ttf"],"fonts/fontawesome-webfont.ttf"],"./../fonts/fontawesome-webfont.svg":[["fontawesome-webfont.79dd36ce.svg","fonts/fontawesome-webfont.svg"],"fonts/fontawesome-webfont.svg"],"./ajax-loader.gif":[["ajax-loader.14a74f80.gif","scss/ajax-loader.gif"],"scss/ajax-loader.gif"],"./fonts/slick.eot":[["slick.a4a5a79f.eot","scss/fonts/slick.eot"],"scss/fonts/slick.eot"],"./fonts/slick.woff":[["slick.5c459146.woff","scss/fonts/slick.woff"],"scss/fonts/slick.woff"],"./fonts/slick.ttf":[["slick.4aa3c075.ttf","scss/fonts/slick.ttf"],"scss/fonts/slick.ttf"],"./fonts/slick.svg":[["slick.beeba691.svg","scss/fonts/slick.svg"],"scss/fonts/slick.svg"],"./../fonts/Aeroport.eot":[["Aeroport.297544ac.eot","fonts/Aeroport.eot"],"fonts/Aeroport.eot"],"./../fonts/Aeroport.woff2":[["Aeroport.f8551786.woff2","fonts/Aeroport.woff2"],"fonts/Aeroport.woff2"],"./../fonts/Aeroport.woff":[["Aeroport.05509aaa.woff","fonts/Aeroport.woff"],"fonts/Aeroport.woff"],"./../fonts/Aeroport.ttf":[["Aeroport.5e14c586.ttf","fonts/Aeroport.ttf"],"fonts/Aeroport.ttf"],"./../fonts/Aeroport-Medium.eot":[["Aeroport-Medium.4a822c07.eot","fonts/Aeroport-Medium.eot"],"fonts/Aeroport-Medium.eot"],"./../fonts/Aeroport-Medium.woff2":[["Aeroport-Medium.2008b10e.woff2","fonts/Aeroport-Medium.woff2"],"fonts/Aeroport-Medium.woff2"],"./../fonts/Aeroport-Medium.woff":[["Aeroport-Medium.3d15594c.woff","fonts/Aeroport-Medium.woff"],"fonts/Aeroport-Medium.woff"],"./../fonts/Aeroport-Medium.ttf":[["Aeroport-Medium.9cca29f1.ttf","fonts/Aeroport-Medium.ttf"],"fonts/Aeroport-Medium.ttf"],"./../fonts/Aeroport-Bold.eot":[["Aeroport-Bold.a896e33f.eot","fonts/Aeroport-Bold.eot"],"fonts/Aeroport-Bold.eot"],"./../fonts/Aeroport-Bold.woff2":[["Aeroport-Bold.8ff48a6d.woff2","fonts/Aeroport-Bold.woff2"],"fonts/Aeroport-Bold.woff2"],"./../fonts/Aeroport-Bold.woff":[["Aeroport-Bold.2d853e82.woff","fonts/Aeroport-Bold.woff"],"fonts/Aeroport-Bold.woff"],"./../fonts/Aeroport-Bold.ttf":[["Aeroport-Bold.0adaf567.ttf","fonts/Aeroport-Bold.ttf"],"fonts/Aeroport-Bold.ttf"],"./../images/icons/icon-vk.png":[["icon-vk.357cfd2f.png","images/icons/icon-vk.png"],"images/icons/icon-vk.png"],"./../images/icons/icon-instagram.png":[["icon-instagram.17d04acb.png","images/icons/icon-instagram.png"],"images/icons/icon-instagram.png"],"./../images/quadrocopter.png":[["quadrocopter.198e5525.png","images/quadrocopter.png"],"images/quadrocopter.png"],"./../images/intro-bg.jpg":[["intro-bg.08b49ab3.jpg","images/intro-bg.jpg"],"images/intro-bg.jpg"],"./../images/service-tours-signature.png":[["service-tours-signature.4ad8c78a.png","images/service-tours-signature.png"],"images/service-tours-signature.png"],"./../images/icons/icon-feature-budget.png":[["icon-feature-budget.24409b32.png","images/icons/icon-feature-budget.png"],"images/icons/icon-feature-budget.png"],"./../images/icons/icon-feature-control.png":[["icon-feature-control.56939506.png","images/icons/icon-feature-control.png"],"images/icons/icon-feature-control.png"],"./../images/icons/icon-feature-video.png":[["icon-feature-video.02170918.png","images/icons/icon-feature-video.png"],"images/icons/icon-feature-video.png"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "32877" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/app.66d5da61.js.map