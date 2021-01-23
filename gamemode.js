var parcelRequire = undefined;
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
})({"index.ts":[function(require,module,exports) {
System.register(["./utility", "./properties", "./events", "./systems"], function (exports_1, context_1) {
  "use strict";

  var utility_1, properties_1, events_1, systems_1;

  var __moduleName = context_1 && context_1.id;

  return {
    setters: [function (utility_1_1) {
      utility_1 = utility_1_1;
    }, function (properties_1_1) {
      properties_1 = properties_1_1;
    }, function (events_1_1) {
      events_1 = events_1_1;
    }, function (systems_1_1) {
      systems_1 = systems_1_1;
    }],
    execute: function () {
      utility_1.initUtils();
      events_1.initHitEvent();
      properties_1.initIsDead();
      events_1.initSprintStateChangeEvent();
      events_1.initPowerAttacksEvent();
      events_1.initBashEvent();
      properties_1.initConsoleOutput();
      properties_1.initActorValue();
      events_1.initActorValueFlushRequiredEvent();
      properties_1.initSpawnPoint();
      events_1.initConsoleCommandEvent();
      systems_1.initDevCommands();
      events_1.initAnimationEvent();
      properties_1.initAnimation();
      events_1.initCurrentCellChangeEvent();
      properties_1.initScale();
      events_1.initEmptyAnimationEvent();
      events_1.initHitStatic();
      events_1.initInputF5Event();
      events_1.initActivateEvent();
      systems_1.initFarmSystem();
      properties_1.initActiveProfession();
      systems_1.initMinesSystem();
      systems_1.initWoodsmanSystem();
      utility_1.utils.hook('onInit', function (pcFormId) {
        mp.onReinit(pcFormId);
      });
    }
  };
});
},{}]},{},["index.ts"], null)
