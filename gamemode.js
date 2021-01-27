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
})({"utility/utils.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initUtils = exports.genClientFunction = exports.getFunctionText = exports.utils = void 0;
exports.utils = {
  log: function () {
    var _a;

    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    (_a = console.log).call.apply(_a, __spreadArrays([console, '[GM]'], args));
  },
  isActor: function (formId) {
    return mp.get(formId, 'type') === 'MpActor';
  },
  hook: function (eventName, callback) {
    if (!global.knownEvents.includes(eventName)) {
      global.knownEvents.push(eventName);
    }

    var prev = mp[eventName];

    mp[eventName] = function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      try {
        var prevRes = prev ? prev.apply(void 0, args) : undefined;
        var callbackRes = callback.apply(void 0, args);
        return callbackRes !== undefined ? callbackRes : prevRes;
      } catch (e) {
        exports.utils.log("'" + eventName + "' threw an error: " + e);

        if (e['stack']) {
          exports.utils.log(e['stack']);
        }

        return undefined;
      }
    };
  }
};

var getFunctionText = function (func, functionName) {
  var funcString = func.toString().substring(0, func.toString().length - 1).replace(new RegExp('^.+?{', 'm'), '').trim();
  funcString = "\n\ttry {\n\t\t" + funcString + "\n\t} catch(err) {\n\t\tctx.sp.printConsole('[ERROR getFunctionText] (" + functionName + ")', err)\n\t}\n\t";
  return funcString;
};

exports.getFunctionText = getFunctionText;

var genClientFunction = function (func, functionName, args, log) {
  if (log === void 0) {
    log = false;
  }

  var result = exports.getFunctionText(func, functionName);

  if (log) {
    result = Array(10).fill('/').join('') + 'end params' + Array(10).fill('/').join('') + '\n' + result;
  }

  for (var name in args) {
    switch (typeof args[name]) {
      case 'number':
        result = "const " + name + " = " + args[name] + ";\n" + result;
        break;

      case 'string':
        result = "const " + name + " = '" + args[name] + "';\n" + result;
        break;

      case 'boolean':
        result = "const " + name + " = " + args[name] + ";\n" + result;
        break;
    }
  }

  if (log) {
    result = Array(10).fill('/').join('') + 'params' + Array(10).fill('/').join('') + '\n' + result;
  }

  if (log) {
    exports.utils.log('[DEBUG] Generated function\n', result);
  }

  return result;
};

exports.genClientFunction = genClientFunction;

var initUtils = function () {
  exports.utils.log('Gamemode init');

  if (!Array.isArray(global.knownEvents)) {
    global.knownEvents = [];
  }

  for (var _i = 0, _a = global.knownEvents; _i < _a.length; _i++) {
    var eventName = _a[_i];
    delete mp[eventName];
  }
};

exports.initUtils = initUtils;
},{}],"utility/index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(require("./utils"), exports);
},{"./utils":"utility/utils.ts"}],"properties/actorValues/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initActorValue = exports.actorValues = void 0;

var utility_1 = require("../../utility");

var rate = function (attr) {
  return attr === 'health' ? 'av_healrate' : "av_" + attr + "rate";
};

var mult = function (attr) {
  return attr === 'health' ? 'av_healratemult' : "av_" + attr + "ratemult";
};

var drain = function (attr) {
  return "av_mp_" + attr + "drain";
};

var updateAttributeCommon2 = function (attrParam, isOwner) {
  if (isOwner === void 0) {
    isOwner = false;
  }

  return utility_1.genClientFunction(function () {
    var rateAV = function (attr) {
      return attr === 'health' ? 'av_healrate' : "av_" + attr + "rate";
    };

    var multAV = function (attr) {
      return attr === 'health' ? 'av_healratemult' : "av_" + attr + "ratemult";
    };

    var drainAV = function (attr) {
      return "av_mp_" + attr + "drain";
    };

    var av = attrParam;
    var ac = ctx.sp.Actor.from(ctx.refr);
    if (!ac) return;
    var base = ctx.value.base || 0;
    var perm = ctx.value.permanent || 0;
    var temp = ctx.value.temporary || 0;
    var targetMax = base + perm + temp;
    var numChangesKey = av + "NumChanges";
    var numChanges = ctx.get(numChangesKey);

    if (ctx.state[numChangesKey] !== numChanges) {
      ctx.state[numChangesKey] = numChanges;
      ctx.state[av + "RegenStart"] = +Date.now();
    }

    var realTargetDmg = ctx.value.damage || 0;
    var targetDmg = realTargetDmg;

    if (av === 'health' || ac.getFormID() == 0x14) {
      var multName = multAV(av);
      var rateName = rateAV(av);
      var drainName = drainAV(av);
      var additionalRegenMult = 1.0;
      var regenDuration = (+Date.now() - (ctx.state[av + "RegenStart"] || 0)) / 1000;
      var healRateMult = ctx.get(multName);
      var healRateMultCurrent = (healRateMult.base || 0) + (healRateMult.permanent || 0) + (healRateMult.temporary || 0) + (healRateMult.damage || 0);
      var healRate = ctx.get(rateName);
      var healRateCurrent = (healRate.base || 0) + (healRate.permanent || 0) + (healRate.temporary || 0) + (healRate.damage || 0);
      var drain_1 = ctx.get(drainName);
      var drainCurrent = (drain_1.base || 0) + (drain_1.permanent || 0) + (drain_1.temporary || 0) + (drain_1.damage || 0);

      if (drainCurrent) {
        targetDmg += regenDuration * drainCurrent;
      } else {
        targetDmg += regenDuration * additionalRegenMult * healRateCurrent * healRateMultCurrent * 0.01 * targetMax * 0.01;
      }

      if (targetDmg > 0) {
        targetDmg = 0;
      }
    }

    var currentPercentage = ac.getActorValuePercentage(av);
    var currentMax = ac.getBaseActorValue(av);
    var targetPercentage = (targetMax + targetDmg) / targetMax;

    if (ctx.get('isDead') && av === 'health') {
      targetPercentage = 0;
    }

    var deltaPercentage = targetPercentage - currentPercentage;
    var k = !targetPercentage || av === 'stamina' || av === 'magicka' ? 1 : 0.25;

    if (deltaPercentage > 0) {
      ac.restoreActorValue(av, deltaPercentage * currentMax * k);
    } else if (deltaPercentage < 0) {
      ac.damageActorValue(av, deltaPercentage * currentMax * k);
    }

    if (isOwner) {
      ac.setActorValue(av, base);
    } else if (av === 'health') {
      ac.setActorValue(av, 9999);
    }
  }, 'updateAttributeCommon2', {
    attrParam: attrParam,
    isOwner: isOwner
  });
};

var avs = ['healrate', 'healratemult', 'staminarate', 'staminaratemult', 'magickarate', 'magickaratemult', 'mp_healthdrain', 'mp_magickadrain', 'mp_staminadrain'];
var relatedPropNames = ['healthNumChanges', 'magickaNumChanges', 'staminaNumChanges'];

var getAvMaximum = function (avOps, formId, avName) {
  var sum = 0;

  for (var _i = 0, _a = ['base', 'permanent', 'temporary']; _i < _a.length; _i++) {
    var modifierName = _a[_i];
    sum += avOps.get(formId, avName, modifierName);
  }

  return sum;
};

var getAvCurrent = function (avOps, formId, avName) {
  var res = getAvMaximum(avOps, formId, avName);
  res += avOps.get(formId, avName, 'damage');
  return res;
};

var regen = function (avOps, avNameTarget, avNameRate, avNameRateMult, avNameDrain) {
  return {
    parent: avOps,
    set: function (formId, avName, modifierName, newValue) {
      var _a;

      var dangerousAvNames = [avNameTarget, avNameRate, avNameRateMult, avNameDrain];
      dangerousAvNames = dangerousAvNames.map(function (x) {
        return x.toLowerCase();
      });

      if (dangerousAvNames.indexOf(avName.toLowerCase()) !== -1 && this.applyRegenerationToParent) {
        this.applyRegenerationToParent(formId);
      }

      (_a = this.parent) === null || _a === void 0 ? void 0 : _a.set(formId, avName, modifierName, newValue);
    },
    get: function (formId, avName, modifierName) {
      if (!this.parent || !this.getSecondsMatched) {
        return 0;
      }

      var drain = getAvCurrent(this.parent, formId, avNameDrain);
      var realValue = this.parent.get(formId, avName, modifierName);

      if (avName.toLowerCase() === avNameTarget.toLowerCase()) {
        if (modifierName === 'damage') {
          var avMax = getAvMaximum(this.parent, formId, avName);
          var regenDuration = timeSource.getSecondsPassed() - this.getSecondsMatched(formId);
          var rate_1 = getAvCurrent(this.parent, formId, avNameRate);
          var rateMult = getAvCurrent(this.parent, formId, avNameRateMult);
          var damageMod = realValue;

          if (drain) {
            damageMod += regenDuration * drain;
          } else {
            damageMod += regenDuration * rate_1 * rateMult * 0.01 * avMax * 0.01;
          }

          return Math.min(0, damageMod);
        }
      }

      return realValue;
    },
    getSecondsMatched: function (formId) {
      return this.secondsMatched && this.secondsMatched[formId] || 0;
    },
    setSecondsMatched: function (formId, secondsMatched) {
      if (!this.secondsMatched) {
        this.secondsMatched = {};
      }

      this.secondsMatched[formId] = secondsMatched;
    },
    applyRegenerationToParent: function (formId) {
      if (!this.parent || !this.setSecondsMatched) {
        return 0;
      }

      var damageAfterRegen = this.get(formId, avNameTarget, 'damage');
      this.parent.set(formId, avNameTarget, 'damage', damageAfterRegen);
      this.setSecondsMatched(formId, timeSource.getSecondsPassed());
    }
  };
};

var timeSource = {
  startMoment: Date.now(),
  getSecondsPassed: function () {
    if (!this.startMoment) {
      this.startMoment = Date.now();
    }

    return (+Date.now() - +this.startMoment) / 1000.0;
  }
};

var initActorValue = function () {
  for (var _i = 0, _a = ['health', 'magicka', 'stamina']; _i < _a.length; _i++) {
    var attr = _a[_i];
    mp.makeProperty('av_' + attr, {
      isVisibleByOwner: true,
      isVisibleByNeighbors: attr === 'health',
      updateNeighbor: updateAttributeCommon2(attr, false),
      updateOwner: updateAttributeCommon2(attr, true)
    });
  }

  for (var _b = 0, avs_1 = avs; _b < avs_1.length; _b++) {
    var avName = avs_1[_b];
    mp.makeProperty('av_' + avName, {
      isVisibleByOwner: true,
      isVisibleByNeighbors: true,
      updateNeighbor: '',
      updateOwner: ''
    });
  }

  for (var _c = 0, relatedPropNames_1 = relatedPropNames; _c < relatedPropNames_1.length; _c++) {
    var propName = relatedPropNames_1[_c];
    mp.makeProperty(propName, {
      isVisibleByOwner: true,
      isVisibleByNeighbors: true,
      updateNeighbor: '',
      updateOwner: ''
    });
  }

  var avOps = {
    set: function (formId, avName, modifierName, newValue) {
      var propName = 'av_' + avName.toLowerCase();
      var value = mp.get(formId, propName);
      value[modifierName] = newValue;
      mp.set(formId, propName, value);

      if (['health', 'magicka', 'stamina'].indexOf(avName.toLowerCase()) !== -1) {
        var propName_1 = avName.toLowerCase() + "NumChanges";
        mp.set(formId, propName_1, 1 + (mp.get(formId, propName_1) || 0));
      }
    },
    get: function (formId, avName, modifierName) {
      var propName = 'av_' + avName.toLowerCase();
      var propValue = mp.get(formId, propName);

      if (propValue === undefined) {
        var s = "'" + propName + "' was '" + propValue + "' for " + formId.toString(16);
        throw new Error(s);
      }

      return propValue[modifierName] || 0;
    }
  };
  avOps = {
    parent: avOps,
    set: function (formId, avName, modifierName, newValue) {
      if (!this.parent) {
        return;
      }

      if (modifierName == 'damage') {
        if (newValue > 0) {
          newValue = 0;
        } else if (newValue < -getAvMaximum(this.parent, formId, avName)) {
          newValue = -getAvMaximum(this.parent, formId, avName);
        }
      }

      this.parent.set(formId, avName, modifierName, newValue);
    },
    get: function (formId, avName, modifierName) {
      if (!this.parent) {
        return 0;
      }

      return this.parent.get(formId, avName, modifierName);
    }
  };
  avOps = regen(avOps, 'health', 'healrate', 'healratemult', 'mp_healthdrain');
  avOps = regen(avOps, 'magicka', 'magickarate', 'magickaratemult', 'mp_magickadrain');
  avOps = regen(avOps, 'stamina', 'staminarate', 'staminaratemult', 'mp_staminadrain');
  avOps = {
    parent: avOps,
    set: function (formId, avName, modifierName, newValue) {
      if (!this.parent) {
        return;
      }

      var oldMaximum, newMaximum;
      oldMaximum = getAvMaximum(this.parent, formId, avName);
      this.parent.set(formId, avName, modifierName, newValue);
      newMaximum = getAvMaximum(this.parent, formId, avName);
      var k = newMaximum / oldMaximum;

      if (isFinite(k) && k != 1 && this.multiplyDamage) {
        this.multiplyDamage(formId, avName, k);
      }
    },
    get: function (formId, avName, modifierName) {
      if (!this.parent) {
        return 0;
      }

      return this.parent.get(formId, avName, modifierName);
    },
    multiplyDamage: function (formId, avName, k) {
      if (!this.parent) {
        return;
      }

      var previousDamage = this.parent.get(formId, avName, 'damage');
      this.parent.set(formId, avName, 'damage', previousDamage * k);
    }
  };
  exports.actorValues = {
    set: function (formId, avName, modifierName, newValue) {
      return avOps.set(formId, avName, modifierName, newValue);
    },
    get: function (formId, avName, modifierName) {
      return avOps.get(formId, avName, modifierName);
    },
    getMaximum: function (formId, avName) {
      return getAvMaximum(avOps, formId, avName);
    },
    getCurrent: function (formId, avName) {
      return getAvCurrent(avOps, formId, avName);
    },
    flushRegen: function (formId, avName) {
      var damageModAfterRegen = avOps.get(formId, avName, 'damage');
      avOps.set(formId, avName, 'damage', damageModAfterRegen);
    },
    setDefaults: function (formId, options) {
      var force = options && options.force;

      if (utility_1.utils.isActor(formId)) {
        if (mp.get(formId, 'isDead') === undefined || force) {
          mp.set(formId, 'isDead', false);
        }

        for (var _i = 0, _a = ['health', 'magicka', 'stamina']; _i < _a.length; _i++) {
          var avName = _a[_i];

          if (!mp.get(formId, 'av_' + avName) || force) {
            mp.set(formId, 'av_' + avName, {
              base: 100
            });
          }
        }

        for (var _b = 0, _c = ['healrate', 'magickarate', 'staminarate']; _b < _c.length; _b++) {
          var avName = _c[_b];

          if (!mp.get(formId, 'av_' + avName) || force) {
            mp.set(formId, 'av_' + avName, {
              base: 5
            });
          }
        }

        for (var _d = 0, _e = ['healratemult', 'magickaratemult', 'staminaratemult']; _d < _e.length; _d++) {
          var avName = _e[_d];

          if (!mp.get(formId, 'av_' + avName) || force) {
            mp.set(formId, 'av_' + avName, {
              base: 100
            });
          }
        }

        for (var _f = 0, _g = ['mp_healthdrain', 'mp_magickadrain', 'mp_staminadrain']; _f < _g.length; _f++) {
          var avName = _g[_f];

          if (!mp.get(formId, 'av_' + avName) || force) {
            mp.set(formId, 'av_' + avName, {
              base: 0
            });
          }
        }
      }
    }
  };
  utility_1.utils.hook('onReinit', function (pcFormId, options) {
    if (exports.actorValues.setDefaults) {
      exports.actorValues.setDefaults(pcFormId, options);
    }
  });
};

exports.initActorValue = initActorValue;
},{"../../utility":"utility/index.ts"}],"properties/consoleOutput.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initConsoleOutput = exports.consoleOutput = void 0;

var genericPrint = function (propName, formId) {
  var printConsoleArgs = [];

  for (var _i = 2; _i < arguments.length; _i++) {
    printConsoleArgs[_i - 2] = arguments[_i];
  }

  var prev = mp.get(formId, propName);
  var n = prev ? prev.n : 0;
  mp.set(formId, propName, {
    n: n + 1,
    args: printConsoleArgs,
    date: +Date.now()
  });
};

exports.consoleOutput = {
  print: function (formId) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    return genericPrint.apply(void 0, __spreadArrays(['consoleOutput', formId], args));
  },
  printNote: function (formId) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    return genericPrint.apply(void 0, __spreadArrays(['notification', formId], args));
  },
  evalClient: function (formId) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    return genericPrint.apply(void 0, __spreadArrays(['eval', formId], args));
  }
};
var printTargets = {
  consoleOutput: 'ctx.sp.printConsole(...ctx.value.args);',
  notification: 'ctx.sp.Debug.notification(...ctx.value.args);',
  eval: 'eval(...ctx.value.args)'
};
var props = ['consoleOutput', 'notification', 'eval'];

var initConsoleOutput = function () {
  var _loop_1 = function (propName) {
    var updateOwner = function () {
      return "\n      if (ctx.state.n" + propName + " === ctx.value.n) return;\n      ctx.state.n" + propName + " = ctx.value.n;\n      if (ctx.value.date) {\n        if (Math.abs(ctx.value.date - +Date.now()) > 2000) return;\n      }\n      " + printTargets[propName] + "\n    ";
    };

    mp.makeProperty(propName, {
      isVisibleByOwner: true,
      isVisibleByNeighbors: false,
      updateNeighbor: '',
      updateOwner: updateOwner()
    });
  };

  for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
    var propName = props_1[_i];

    _loop_1(propName);
  }
};

exports.initConsoleOutput = initConsoleOutput;
},{}],"properties/isDead.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initIsDead = void 0;

var utility_1 = require("../utility");

var updateNeighbor = utility_1.getFunctionText(function () {
  var ac = ctx.sp.Actor.from(ctx.refr);
  var isDead = ctx.value;

  if (isDead) {
    ac.endDeferredKill();
    ac.kill(null);
  } else {
    ac.startDeferredKill();
  }

  if (!isDead && ac.isDead()) {
    ctx.sp.printConsole(ac.getBaseObject().getFormID());
    ctx.respawn();
  }
}, 'updateNeighbor');
var updateOwner = utility_1.getFunctionText(function () {
  var ac = ctx.sp.Actor.from(ctx.refr);
  ac.startDeferredKill();
  var value = ctx.value;

  if (value !== ctx.state.value) {
    var die = !!value;

    if (die) {
      var pos = [ac.getPositionX(), ac.getPositionY(), ac.getPositionZ()];

      for (var i = 0; i < 200; ++i) {
        var randomActor = ctx.sp.Game.findRandomActor(pos[0], pos[1], pos[2], 10000);
        if (!randomActor) continue;
        var tgt = randomActor.getCombatTarget();
        if (!tgt || tgt.getFormID() !== 0x14) continue;
        randomActor.stopCombat();
      }

      ac.pushActorAway(ac, 0);
    }

    if (!die) {
      ctx.sp.Debug.sendAnimationEvent(ac, 'GetUpBegin');
    }

    ctx.state.value = value;
  }
}, 'updateOwner');

var initIsDead = function () {
  mp.makeProperty('isDead', {
    isVisibleByOwner: true,
    isVisibleByNeighbors: true,
    updateNeighbor: updateNeighbor,
    updateOwner: updateOwner
  });
  utility_1.utils.hook('onDeath', function (pcFormId) {
    utility_1.utils.log(pcFormId.toString(16) + " died");
    mp.set(pcFormId, 'isDead', true);
  });
};

exports.initIsDead = initIsDead;
},{"../utility":"utility/index.ts"}],"constants/constants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PRODUCTION = exports.TRACE_ANIMATION = exports.EVENTS_NAME = exports.defaultSpawnPoint = exports.currentActor = void 0;
exports.currentActor = 0x14;
exports.defaultSpawnPoint = {
  pos: [227, 239, 53],
  angle: [0, 0, 0],
  worldOrCellDesc: '165a7:Skyrim.esm'
};
exports.EVENTS_NAME = {
  _: '_',
  bash: '_onBash',
  consoleCommand: '_onConsoleCommand',
  currentCellChange: '_onCurrentCellChange',
  hit: '_onHit',
  localDeath: '_onLocalDeath',
  powerAttack: '_onPowerAttack',
  actorValueFlushRequiredhealth: '_onActorValueFlushRequiredhealth',
  actorValueFlushRequiredstamina: '_onActorValueFlushRequiredstamina',
  actorValueFlushRequiredmagicka: '_onActorValueFlushRequiredmagicka',
  sprintStateChange: '_onSprintStateChange',
  hitScale: '_onHitScale'
};
exports.TRACE_ANIMATION = true;
exports.PRODUCTION = false;
},{}],"constants/index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(require("./constants"), exports);
},{"./constants":"constants/constants.ts"}],"systems/spawnSystem.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spawnSystem = void 0;

var utility_1 = require("../utility");

var properties_1 = require("../properties");

var constants_1 = require("../constants");

exports.spawnSystem = {
  timeToRespawn: 6000,
  spawn: function (targetFormId) {
    var spawnPoint = mp.get(targetFormId, 'spawnPoint');

    for (var _i = 0, _a = Object.keys(spawnPoint || constants_1.defaultSpawnPoint); _i < _a.length; _i++) {
      var propName = _a[_i];
      mp.set(targetFormId, propName, (spawnPoint || constants_1.defaultSpawnPoint)[propName]);
    }

    properties_1.actorValues.set(targetFormId, 'health', 'damage', 0);
    properties_1.actorValues.set(targetFormId, 'magicka', 'damage', 0);
    properties_1.actorValues.set(targetFormId, 'stamina', 'damage', 0);
    setTimeout(function () {
      mp.set(targetFormId, 'isDead', false);
    }, 500);
    utility_1.utils.log(targetFormId.toString(16) + " respawns");
  },
  updateSpawnPoint: function (targetFormId) {
    mp.set(targetFormId, 'spawnPoint', {
      pos: mp.get(targetFormId, 'pos'),
      angle: mp.get(targetFormId, 'angle'),
      worldOrCellDesc: mp.get(targetFormId, 'worldOrCellDesc')
    });
  }
};
},{"../utility":"utility/index.ts","../properties":"properties/index.ts","../constants":"constants/index.ts"}],"systems/inventorySystem.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inventorySystem = void 0;

var properties_1 = require("../properties");

var utility_1 = require("../utility");

exports.inventorySystem = {
  get: function (formId) {
    return properties_1.getInventar(formId);
  },
  getAllEquipedItems: function (formId) {
    var equipment = properties_1.getEquipment(formId);
    equipment.inv.entries = equipment.inv.entries.filter(function (item) {
      return item.worn;
    });
    return equipment;
  },
  addItem: function (formId, baseId, count, isSilent) {
    if (count === void 0) {
      count = 1;
    }

    if (isSilent === void 0) {
      isSilent = false;
    }

    if (!baseId) return;
    if (count <= 0) return;
    var inv = properties_1.getInventar(formId);
    var added = false;

    for (var _i = 0, _a = inv.entries; _i < _a.length; _i++) {
      var value = _a[_i];

      if (Object.keys(value).length == 2 && value.baseId == baseId) {
        value.count += count;
        added = true;
        break;
      }
    }

    if (!added) {
      inv.entries.push({
        baseId: baseId,
        count: count
      });
    }

    mp.set(formId, 'inventory', inv);

    if (!isSilent) {
      properties_1.consoleOutput.evalClient(formId, utility_1.genClientFunction(function () {
        var name = ctx.sp.Game.getFormEx(baseId).getName();
        ctx.sp.Debug.notification(name + " " + (count > 1 ? '(' + count + ') ' : '') + "- \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E");
      }, 'notification add item', {
        baseId: baseId,
        count: count
      }));
    }
  },
  deleteItem: function (formId, baseId, count, isSilent) {
    if (isSilent === void 0) {
      isSilent = false;
    }

    var result = {
      success: false,
      message: 'Error: deleteItem()!'
    };

    if (count <= 0) {
      result.message = 'Ошибка: Количество предметов для удаления должны быть больше 0!';
      return result;
    }

    var inv = properties_1.getInventar(formId);
    var deletedItemIndex = inv.entries.findIndex(function (item) {
      return item.baseId === baseId;
    });

    if (deletedItemIndex === -1) {
      result.message = 'Ошибка: Предмет не найден!';
      return result;
    }

    var newCount = inv.entries[deletedItemIndex].count - count;

    if (newCount < 0) {
      result.message = 'Ошибка: Нехватает предметов чтобы их удалить!';
      return result;
    } else if (newCount === 0) {
      inv.entries = inv.entries.filter(function (item) {
        return item.baseId !== baseId;
      });
      mp.set(formId, 'inventory', inv);
      result.success = true;
      result.message = isSilent ? '' : 'Успех: Предмет удален из инвентаря.';
      return result;
    } else if (newCount > 0) {
      inv.entries = inv.entries;
      inv.entries[deletedItemIndex].count = newCount;
      mp.set(formId, 'inventory', inv);
      result.success = true;
      result.message = isSilent ? '' : "\u0423\u0441\u043F\u0435\u0445: \u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043E \u043D\u0430 " + newCount + ".";
      return result;
    }

    return result;
  },
  eqiupItem: function (formId, baseId) {
    properties_1.consoleOutput.evalClient(formId, utility_1.genClientFunction(function () {
      var form = ctx.sp.Game.getFormEx(baseId);
      ctx.sp.Game.getPlayer().equipItem(form, false, false);
    }, 'equip item', {
      baseId: baseId
    }));
  },
  isInInventory: function (formId, baseId) {
    return properties_1.getInventar(formId).entries.find(function (el) {
      return el.baseId === baseId;
    }) ? true : false;
  },
  isEquip: function (formId, baseId) {
    var _a, _b;

    if (!baseId) return false;
    return (_b = (_a = properties_1.getEquipment(formId).inv.entries.find(function (item) {
      return item.baseId === baseId;
    })) === null || _a === void 0 ? void 0 : _a.worn) !== null && _b !== void 0 ? _b : false;
  },
  find: function (inv, baseId) {
    return inv.entries.find(function (x) {
      return x.baseId === baseId;
    });
  }
};
},{"../properties":"properties/index.ts","../utility":"utility/index.ts"}],"systems/developerCommands.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initDevCommands = exports.reinit = void 0;

var utility_1 = require("../utility");

var properties_1 = require("../properties");

var constants_1 = require("../constants");

var spawnSystem_1 = require("./spawnSystem");

var inventorySystem_1 = require("./inventorySystem");

var chooseFormId = function (pcFormId, selectedFormId) {
  return selectedFormId ? selectedFormId : pcFormId;
};

var chooseTip = function (pcFormId, selectedFormId) {
  return selectedFormId ? '(selected)' : '(your character)';
};

var reinit = function (pcFormId, selectedFormId) {
  var targetFormId = chooseFormId(pcFormId, selectedFormId);
  var tip = chooseTip(pcFormId, selectedFormId);
  mp.onReinit(targetFormId, {
    force: true
  });
  properties_1.consoleOutput.print(targetFormId, "Reinit " + targetFormId.toString(16) + " " + tip);
};

exports.reinit = reinit;

var setav = function (pcFormId, selectedFormId, avName, newValueStr) {
  var newValue = parseFloat(newValueStr);
  newValue = isFinite(newValue) ? newValue : 1;
  var targetFormId = chooseFormId(pcFormId, selectedFormId);
  var tip = chooseTip(pcFormId, selectedFormId);
  properties_1.actorValues.set(targetFormId, avName, 'base', newValue);
  properties_1.consoleOutput.print(targetFormId, "Set " + avName + " to " + newValue + " " + tip);
};

var kill = function (pcFormId, selectedFormId) {
  var targetFormId = chooseFormId(pcFormId, selectedFormId);
  var tip = chooseTip(pcFormId, selectedFormId);
  var prev = mp.get(targetFormId, 'isDead');
  mp.set(targetFormId, 'isDead', !prev);
  properties_1.consoleOutput.print(targetFormId, 'Play visual effects for killing/resurrection', targetFormId.toString(16) + " " + tip);
};

var spawn = function (pcFormId, selectedFormId) {
  var targetFormId = chooseFormId(pcFormId, selectedFormId);
  var tip = chooseTip(pcFormId, selectedFormId);
  spawnSystem_1.spawnSystem.spawn(targetFormId);
  properties_1.consoleOutput.print(targetFormId, "Teleporting to the spawnpoint " + targetFormId.toString(16) + " " + tip);
};

var spawnpoint = function (pcFormId, selectedFormId) {
  var targetFormId = chooseFormId(pcFormId, selectedFormId);
  var tip = chooseTip(pcFormId, selectedFormId);
  spawnSystem_1.spawnSystem.updateSpawnPoint(targetFormId);
  properties_1.consoleOutput.print(targetFormId, "Spawnpoint has been updated for " + targetFormId.toString(16) + " " + tip);
};

var tp = function (pcFormId, selectedFormId) {
  var targetFormId = chooseFormId(pcFormId, selectedFormId);
  var p = mp.get(targetFormId, 'pos');
  mp.set(pcFormId, 'pos', p);
};

var initDevCommands = function () {
  utility_1.utils.hook('_onConsoleCommand', function (pcFormId) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    var selectedFormId = args[0] !== constants_1.currentActor ? args[0] : pcFormId;
    var sub = args[1];
    var arg0 = args[2];
    var arg1 = args[3];
    var arg2 = args[4];

    switch (sub) {
      case 'reinit':
        exports.reinit(pcFormId, selectedFormId);
        break;

      case 'setav':
        setav(pcFormId, selectedFormId, arg0, arg1);
        break;

      case 'kill':
        kill(pcFormId, selectedFormId);
        break;

      case 'spawn':
        spawn(pcFormId, selectedFormId);
        break;

      case 'spawnpoint':
        spawnpoint(pcFormId, selectedFormId);
        break;

      case 'tp':
        tp(pcFormId, 127529);
        break;

      case 'scale':
        var scale = mp.get(pcFormId, 'scale');
        utility_1.utils.log(scale);
        mp.set(pcFormId, 'scale', scale === 1 ? 2 : 1);
        break;

      case 'msg':
        var pos = mp.get(pcFormId, 'pos');
        break;

      case 'additem':
        if (!arg0) return;
        inventorySystem_1.inventorySystem.addItem(pcFormId, arg0, arg1 ? +arg1 : 1, arg2 ? true : false);
        break;

      default:
        break;
    }
  });
};

exports.initDevCommands = initDevCommands;
},{"../utility":"utility/index.ts","../properties":"properties/index.ts","../constants":"constants/index.ts","./spawnSystem":"systems/spawnSystem.ts","./inventorySystem":"systems/inventorySystem.ts"}],"systems/professionsSystem/data/resources/minerals.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var minerals = [{
  type: 'minerals',
  baseId: 0x71cf3,
  name: 'Железная руда',
  sourceName: 'Железорудная жила',
  price: 10
}, {
  type: 'minerals',
  baseId: 0x5acde,
  name: 'Золотая руда',
  sourceName: 'Золотая жила',
  price: 10
}, {
  type: 'minerals',
  baseId: 0x5acdb,
  name: 'Корундовая руда',
  sourceName: 'Выход минерала',
  price: 10
}, {
  type: 'minerals',
  baseId: 0x5acdb,
  name: 'Корундовая руда',
  sourceName: 'Корундовая жила',
  price: 10
}, {
  type: 'minerals',
  baseId: 0x5ace0,
  name: 'Лунная руда',
  sourceName: 'Выход лунного камня',
  price: 10
}, {
  type: 'minerals',
  baseId: 0x5ace1,
  name: 'Малахитовая руда',
  sourceName: 'Малахитовая жила',
  price: 10
}, {
  type: 'minerals',
  baseId: 0x5acdd,
  name: 'Орихалковая руда',
  sourceName: 'Выход орихалка',
  price: 10
}, {
  type: 'minerals',
  baseId: 0x5ace2,
  name: 'Ртутная руда',
  sourceName: 'Ртутная жила',
  price: 10
}, {
  type: 'minerals',
  baseId: 0x5acdf,
  name: 'Серебряная руда',
  sourceName: 'Серебряная жила',
  price: 10
}, {
  type: 'minerals',
  baseId: 0x5acdc,
  name: 'Эбонитовая руда',
  sourceName: 'Эбонитовая жила',
  price: 10
}];
exports.default = minerals;
},{}],"systems/professionsSystem/data/resources/woods.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var woods = [{
  type: 'woods',
  baseId: 0x6f993,
  name: 'Полено',
  sourceName: 'Firewood01',
  price: 100
}];
exports.default = woods;
},{}],"systems/professionsSystem/data/resources/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var minerals_1 = __importDefault(require("./minerals"));

var woods_1 = __importDefault(require("./woods"));

var resources = {
  minerals: minerals_1.default,
  woods: woods_1.default
};
exports.default = resources;
},{"./minerals":"systems/professionsSystem/data/resources/minerals.ts","./woods":"systems/professionsSystem/data/resources/woods.ts"}],"systems/professionsSystem/data/profession/collectors.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var collectors = {
  miner: {
    tool: 0xe3c16,
    clothes: 0x80697,
    boots: 0x1be1b
  },
  herbalist: {},
  woodsman: {
    tool: 0x2f2f4
  },
  farmer: {
    tool: 0x5051833,
    clothes: 0x80697,
    boots: 0x1be1b,
    other: 0x12fdf
  }
};
exports.default = collectors;
},{}],"systems/professionsSystem/data/profession/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var collectors_1 = __importDefault(require("./collectors"));

exports.default = {
  collectors: collectors_1.default
};
},{"./collectors":"systems/professionsSystem/data/profession/collectors.ts"}],"systems/professionsSystem/data/locations/mines.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MINES = [{
  baseId: 0x2c778,
  name: 'DawnstarIronBreakerMine',
  ruName: 'Дом Олавы Немощной',
  worldId: '165ae:Skyrim.esm'
}, {
  baseId: 0x2c778,
  name: 'DawnstarIronBreakerMine',
  ruName: 'Железорудная шахта',
  worldId: '2c778:Skyrim.esm'
}, {
  baseId: 0x1b147,
  name: 'BilegulchMine',
  ruName: 'Желчная шахта',
  worldId: '1b147:Skyrim.esm'
}, {
  baseId: 0xb6be6,
  name: 'EmbershardMine01',
  ruName: 'Факельная шахта',
  worldId: 'b6be6:Skyrim.esm'
}, {
  baseId: 0x1382e,
  name: 'ShorsStoneRedbellyMine',
  ruName: 'Красная шахта',
  worldId: '1382e:Skyrim.esm'
}, {
  baseId: 0x1523c,
  name: 'MorKhazgurMine',
  ruName: 'Мор Казгур - Шахта',
  worldId: '1523c:Skyrim.esm'
}, {
  baseId: 0x2c779,
  name: 'DawnstarQuicksilverMine',
  ruName: 'Ртутная шахта',
  worldId: '2c779:Skyrim.esm'
}, {
  baseId: 0x161e7,
  name: 'WhistlingMine01',
  ruName: 'Свистящая шахта',
  worldId: '161e7:Skyrim.esm'
}, {
  baseId: 0x16200,
  name: 'GloomboundMine01',
  ruName: 'Сумрачная шахта',
  worldId: '16200:Skyrim.esm'
}, {
  baseId: 0x13901,
  name: 'KynesgroveSteamscorchGullyMine',
  ruName: 'Шахта Горячий Пар',
  worldId: '13901:Skyrim.esm'
}, {
  baseId: 0x1528a,
  name: 'DushnikhYalMine',
  ruName: 'Шахта Душник',
  worldId: '1528a:Skyrim.esm'
}, {
  baseId: 0x13a8a,
  name: 'DarkwaterCrossingGoldenrockMine',
  ruName: 'Шахта Золотая Скала',
  worldId: '13a8a:Skyrim.esm'
}, {
  baseId: 0x2e760,
  name: 'StonehillsMine',
  ruName: 'Шахта Качающийся Камень',
  worldId: '2e760:Skyrim.esm'
}, {
  baseId: 0x161f6,
  name: 'KolskeggrMine01',
  ruName: 'Шахта Колскеггр',
  worldId: '161f6:Skyrim.esm'
}, {
  baseId: 0x161f5,
  name: 'LeftHandMine',
  ruName: 'Шахта Левая Рука',
  worldId: '161f5:Skyrim.esm'
}, {
  baseId: 0x79f9f,
  name: 'KnifepointRidge01',
  ruName: 'Шахта Острие Ножа',
  worldId: '79f9f:Skyrim.esm'
}, {
  baseId: 0x5554a,
  name: 'LostProspectMine01',
  ruName: 'Шахта Потерянный Шанс',
  worldId: '5554a:Skyrim.esm'
}, {
  baseId: 0x13909,
  name: 'KarthwastenSanuarachMine',
  ruName: 'Шахта Сануарах',
  worldId: '13909:Skyrim.esm'
}, {
  baseId: 0x15294,
  name: 'NorthwindMine01',
  ruName: 'Шахта Северный Ветер',
  worldId: '15294:Skyrim.esm'
}, {
  baseId: 0x16203,
  name: 'CidhnaMine01',
  ruName: 'Шахта Сидна',
  worldId: '16203:Skyrim.esm'
}, {
  baseId: 0x13978,
  name: 'KarthwastenFennsGulchMine',
  ruName: 'Шахта Ущелье Фенна',
  worldId: '13978:Skyrim.esm'
}, {
  baseId: 0x43fab,
  name: 'HaltedStreamCamp01',
  ruName: 'Лагерь Чистых родников',
  worldId: '43fab:Skyrim.esm'
}];
exports.default = MINES;
},{}],"systems/professionsSystem/data/locations/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var mines_1 = __importDefault(require("./mines"));

exports.default = {
  mines: mines_1.default
};
},{"./mines":"systems/professionsSystem/data/locations/mines.ts"}],"systems/professionsSystem/data/messages/messages.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MESSAGES = void 0;
exports.MESSAGES = {
  farmer: {
    baseId: 0x500fb0b,
    name: 'MP_msg_StartWorkFarmer',
    ruName: '25 способов стать фермером',
    worldId: 'fb0b:FarmSystem.esp'
  }
};
},{}],"systems/professionsSystem/data/messages/index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(require("./messages"), exports);
},{"./messages":"systems/professionsSystem/data/messages/messages.ts"}],"systems/professionsSystem/data/animations/collectors.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var collectors = {
  miner: {
    start: ['idleplayer', 'idlepickaxetableenter'],
    end: ['idlepickaxeexit', 'idlepickaxetableexit', 'idlechairexitstart']
  },
  herbalist: {
    start: [],
    end: []
  },
  woodsman: {
    start: [],
    end: []
  },
  farmer: {
    start: [],
    end: []
  }
};
exports.default = collectors;
},{}],"systems/professionsSystem/data/animations/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var collectors_1 = __importDefault(require("./collectors"));

var allAnimation = {
  collector: collectors_1.default
};
exports.default = allAnimation;
},{"./collectors":"systems/professionsSystem/data/animations/collectors.ts"}],"systems/professionsSystem/data/resources/resourcesProp.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"systems/professionsSystem/data/index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationProp = exports.ProfessionTypesProp = exports.ProfessionStaffProp = exports.ProfessionListProp = exports.ProfessionStaffNamesProp = exports.ProfessionNamesProp = exports.ProfessionProp = exports.ResourcesTypesProp = exports.ResourceProp = exports.allAnimation = exports.locations = exports.professions = exports.resources = void 0;

var resources_1 = require("./resources");

Object.defineProperty(exports, "resources", {
  enumerable: true,
  get: function () {
    return __importDefault(resources_1).default;
  }
});

var profession_1 = require("./profession");

Object.defineProperty(exports, "professions", {
  enumerable: true,
  get: function () {
    return __importDefault(profession_1).default;
  }
});

var locations_1 = require("./locations");

Object.defineProperty(exports, "locations", {
  enumerable: true,
  get: function () {
    return __importDefault(locations_1).default;
  }
});

__exportStar(require("./messages"), exports);

var animations_1 = require("./animations");

Object.defineProperty(exports, "allAnimation", {
  enumerable: true,
  get: function () {
    return __importDefault(animations_1).default;
  }
});

var resourcesProp_1 = require("./resources/resourcesProp");

Object.defineProperty(exports, "ResourceProp", {
  enumerable: true,
  get: function () {
    return resourcesProp_1.ResourceProp;
  }
});
Object.defineProperty(exports, "ResourcesTypesProp", {
  enumerable: true,
  get: function () {
    return resourcesProp_1.ResourcesTypesProp;
  }
});

var professionProp_1 = require("./profession/professionProp");

Object.defineProperty(exports, "ProfessionProp", {
  enumerable: true,
  get: function () {
    return professionProp_1.ProfessionProp;
  }
});
Object.defineProperty(exports, "ProfessionNamesProp", {
  enumerable: true,
  get: function () {
    return professionProp_1.ProfessionNamesProp;
  }
});
Object.defineProperty(exports, "ProfessionStaffNamesProp", {
  enumerable: true,
  get: function () {
    return professionProp_1.ProfessionStaffNamesProp;
  }
});
Object.defineProperty(exports, "ProfessionListProp", {
  enumerable: true,
  get: function () {
    return professionProp_1.ProfessionListProp;
  }
});
Object.defineProperty(exports, "ProfessionStaffProp", {
  enumerable: true,
  get: function () {
    return professionProp_1.ProfessionStaffProp;
  }
});
Object.defineProperty(exports, "ProfessionTypesProp", {
  enumerable: true,
  get: function () {
    return professionProp_1.ProfessionTypesProp;
  }
});

var animationsProp_1 = require("./animations/animationsProp");

Object.defineProperty(exports, "AnimationProp", {
  enumerable: true,
  get: function () {
    return animationsProp_1.AnimationProp;
  }
});
},{"./resources":"systems/professionsSystem/data/resources/index.ts","./profession":"systems/professionsSystem/data/profession/index.ts","./locations":"systems/professionsSystem/data/locations/index.ts","./messages":"systems/professionsSystem/data/messages/index.ts","./animations":"systems/professionsSystem/data/animations/index.ts","./resources/resourcesProp":"systems/professionsSystem/data/resources/resourcesProp.ts","./profession/professionProp":"systems/professionsSystem/data/resources/resourcesProp.ts","./animations/animationsProp":"systems/professionsSystem/data/resources/resourcesProp.ts"}],"systems/professionsSystem/professionSystem.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.professionSystem = void 0;

var properties_1 = require("../../properties");

var utility_1 = require("../../utility");

var inventorySystem_1 = require("../inventorySystem");

var data_1 = require("./data");

var data_2 = require("./data");

exports.professionSystem = {
  set: function (formId, professionName) {
    utility_1.utils.log('[PROFESSIONS]', 'setProfession');
    var currentProfessionStaff = data_2.professions.collectors[professionName];
    utility_1.utils.log('[PROFESSIONS] currentProfessionStaff', currentProfessionStaff);
    exports.professionSystem.addItems(formId, professionName);
    var oldEquipment = inventorySystem_1.inventorySystem.getAllEquipedItems(formId);
    exports.professionSystem.setToServer(formId, {
      name: professionName,
      equipment: currentProfessionStaff,
      oldEquipment: oldEquipment,
      isActive: true
    });
  },
  setToServer: function (formId, profession) {
    mp.set(formId, 'activeProfession', profession);
  },
  getFromServer: function (formId) {
    return mp.get(formId, 'activeProfession');
  },
  delete: function (formId, professionName, force) {
    if (force === void 0) {
      force = false;
    }

    utility_1.utils.log('[PROFESSIONS]', 'deleteProfession');
    var isDeleted = exports.professionSystem.deleteItems(formId, professionName, force);

    if (!isDeleted) {
      utility_1.utils.log('[PROFESSIONS]', 'Error: deleteProfessionItems() - error in deleteProfession() ');
      throw '[PROFESSIONS] Error: deleteProfessionItems() - error in deleteProfession()';
    } else {
      var oldEquipment = mp.get(formId, 'activeProfession').oldEquipment;
      var oldEquipTmp = oldEquipment;
      var trueOldEquip_1 = {
        inv: {
          entries: [],
          filter: function () {}
        },
        numChanges: 0
      };
      oldEquipTmp.inv.entries.forEach(function (oldItem) {
        if (inventorySystem_1.inventorySystem.isInInventory(formId, oldItem.baseId)) {
          trueOldEquip_1.inv.entries.push(oldItem);
        }
      });
      utility_1.utils.log('[PROFESSIONS] oldEquipment', trueOldEquip_1);
      exports.professionSystem.setToServer(formId, {
        oldEquipment: trueOldEquip_1,
        isActive: false
      });
    }

    return isDeleted;
  },
  deleteItems: function (formId, professionName, force) {
    if (force === void 0) {
      force = false;
    }

    utility_1.utils.log('[PROFESSIONS]', 'deleteProfessionItems');
    var currentProfStaff = data_2.professions.collectors[professionName];

    if (!currentProfStaff) {
      utility_1.utils.log('[PROFESSIONS]', 'Error: deleteProfessionItems() - Cannot find profession:', professionName);
      return false;
    }

    var canEndProfession = Object.keys(currentProfStaff).every(function (key) {
      var staffName = key;
      var staff = currentProfStaff[staffName];
      if (!staff) return false;
      return inventorySystem_1.inventorySystem.isInInventory(formId, staff);
    });

    if (canEndProfession || force) {
      Object.keys(currentProfStaff).forEach(function (key) {
        var staffName = key;
        var staff = currentProfStaff[staffName];
        if (!staff) return false;
        var isDeletedEvent = inventorySystem_1.inventorySystem.deleteItem(formId, staff, 1);

        if (!isDeletedEvent.success) {
          utility_1.utils.log('[PROFESSIONS] isDeletedEvent.message', isDeletedEvent.message);
        }
      });
      properties_1.consoleOutput.printNote(formId, 'Ты уволен! Экипировка возвращена.');
      return true;
    } else {
      var messageError = 'Ошибка: игрок не может уволиться, не все предметы могут быть возвращены!';
      properties_1.consoleOutput.printNote(formId, messageError);
      utility_1.utils.log('[PROFESSIONS] messageError', messageError);
      return false;
    }
  },
  addItems: function (formId, name) {
    utility_1.utils.log('[PROFESSIONS]', 'addProfessionItems');
    var currentProfStaff = data_2.professions.collectors[name];

    if (!currentProfStaff) {
      utility_1.utils.log('[PROFESSIONS]', 'Error: addProfessionItems() -  Cannot find profession:', name);
      return;
    }

    Object.keys(currentProfStaff).forEach(function (key) {
      var staffName = key;
      var staff = currentProfStaff[staffName];
      if (!staff) return false;
      inventorySystem_1.inventorySystem.addItem(formId, staff, 1);
    });
  },
  sellItems: function (formId, items) {
    var inv = properties_1.getInventar(formId);
    items.forEach(function (item) {
      var _a, _b;

      var itemId = (_a = data_1.resources.minerals.find(function (mineral) {
        return mineral.name === item.name;
      })) === null || _a === void 0 ? void 0 : _a.baseId;

      if (itemId !== undefined) {
        var itemCount = (_b = inv.entries.find(function (itemFind) {
          return itemFind.baseId === itemId;
        })) === null || _b === void 0 ? void 0 : _b.count;

        if (itemCount && itemCount > 0) {
          inventorySystem_1.inventorySystem.deleteItem(formId, itemId, itemCount);
          var msg = "\u0423\u0434\u0430\u043B\u0435\u043D\u043E " + item.name + ": " + itemCount + ", \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E \u0437\u043E\u043B\u043E\u0442\u043E " + itemCount * item.price + ".";
          inventorySystem_1.inventorySystem.addItem(formId, 0xf, itemCount * item.price);
        }
      }
    });
  }
};
},{"../../properties":"properties/index.ts","../../utility":"utility/index.ts","../inventorySystem":"systems/inventorySystem.ts","./data":"systems/professionsSystem/data/index.ts"}],"systems/professionsSystem/minesSystem.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initMinesSystem = void 0;

var utility_1 = require("../../utility");

var professionSystem_1 = require("./professionSystem");

var properties_1 = require("../../properties");

var data_1 = require("./data");

var IS_SELL = true;
var currentProfessionName = 'miner';

var isMine = function (cellName) {
  utility_1.utils.log('isMine ', cellName);
  return data_1.locations.mines.find(function (el) {
    return el.worldId === cellName;
  }) ? true : false;
};

var initMinesSystem = function () {
  utility_1.utils.hook('_onCurrentCellChange', function (pcFormId) {
    try {
      if (isMine(properties_1.getWorldOrCellDesc(pcFormId))) {
        utility_1.utils.log('[MINES] WorldOrCellDesc', properties_1.getWorldOrCellDesc(pcFormId));
        var myProfession = professionSystem_1.professionSystem.getFromServer(pcFormId);

        if (!myProfession) {
          professionSystem_1.professionSystem.set(pcFormId, currentProfessionName);
        } else {
          if (!myProfession.isActive) {
            professionSystem_1.professionSystem.set(pcFormId, currentProfessionName);
          }
        }
      } else {
        var myProfession = professionSystem_1.professionSystem.getFromServer(pcFormId);

        if ((myProfession === null || myProfession === void 0 ? void 0 : myProfession.name) === currentProfessionName) {
          if (myProfession === null || myProfession === void 0 ? void 0 : myProfession.isActive) {
            professionSystem_1.professionSystem.delete(pcFormId, currentProfessionName);

            if (IS_SELL) {
              setTimeout(function () {
                professionSystem_1.professionSystem.sellItems(pcFormId, [{
                  name: 'Железная руда',
                  price: 10
                }]);
              }, 2000);
              utility_1.utils.log('Sell');
            }
          }
        }
      }
    } catch (err) {
      utility_1.utils.log(err);
    }
  });
};

exports.initMinesSystem = initMinesSystem;
},{"../../utility":"utility/index.ts","./professionSystem":"systems/professionsSystem/professionSystem.ts","../../properties":"properties/index.ts","./data":"systems/professionsSystem/data/index.ts"}],"systems/professionsSystem/woodsmanSystem.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initWoodsmanSystem = void 0;

var __1 = require("..");

var utility_1 = require("../../utility");

var collectors_1 = __importDefault(require("./data/profession/collectors"));

var woods_1 = __importDefault(require("./data/resources/woods"));

var professionSystem_1 = require("./professionSystem");

var currentProfessionName = 'woodsman';
var activatorIdToGetProf = 0x9fb04;
var activatorIdToGetSell = 0x1f228;
var treeIdsToCollect = [0x12dee];
var collectItemId = woods_1.default[0].baseId;
var collectItemPrice = woods_1.default[0].price;
var goldId = 0xf;

var initWoodsmanSystem = function () {
  utility_1.utils.hook('_onActivate', function (pcFormId, event) {
    try {
      if ((event === null || event === void 0 ? void 0 : event.baseId) === activatorIdToGetProf) {
        utility_1.utils.log('[WOODSMAN] event', event);
        var myProfession = professionSystem_1.professionSystem.getFromServer(pcFormId);
        utility_1.utils.log('[WOODSMAN]', myProfession);

        if (!(myProfession === null || myProfession === void 0 ? void 0 : myProfession.isActive)) {
          professionSystem_1.professionSystem.set(pcFormId, currentProfessionName);
          utility_1.utils.log('[WOODSMAN]', 'profession set');
        } else if (myProfession.name === currentProfessionName) {
          professionSystem_1.professionSystem.delete(pcFormId, currentProfessionName);
          utility_1.utils.log('[WOODSMAN]', 'profession delete');
        }
      }

      if ((event === null || event === void 0 ? void 0 : event.baseId) === activatorIdToGetSell) {
        var myProfession = professionSystem_1.professionSystem.getFromServer(pcFormId);

        if ((myProfession === null || myProfession === void 0 ? void 0 : myProfession.name) === currentProfessionName) {
          var inv = __1.inventorySystem.get(pcFormId);

          var sellItems = __1.inventorySystem.find(inv, collectItemId);

          if (!sellItems) return;

          var deleteEvent = __1.inventorySystem.deleteItem(pcFormId, collectItemId, sellItems.count);

          if (deleteEvent.success) {
            utility_1.utils.log('[WOODSMAN]', 'items delete');

            __1.inventorySystem.addItem(pcFormId, goldId, collectItemPrice * sellItems.count);

            utility_1.utils.log('[WOODSMAN]', 'gold add');
          }
        }
      }
    } catch (err) {
      utility_1.utils.log(err);
    }
  });
  utility_1.utils.hook('_onHitStatic', function (pcFormId, eventData) {
    if (treeIdsToCollect.includes(eventData.target)) {
      var myProfession = professionSystem_1.professionSystem.getFromServer(pcFormId);

      if (myProfession.name === currentProfessionName && __1.inventorySystem.isEquip(pcFormId, collectors_1.default[currentProfessionName].tool)) {
        __1.inventorySystem.addItem(pcFormId, collectItemId, 1);

        utility_1.utils.log('[WOODSMAN]', 'add collect item');
      }
    }
  });
};

exports.initWoodsmanSystem = initWoodsmanSystem;
},{"..":"systems/index.ts","../../utility":"utility/index.ts","./data/profession/collectors":"systems/professionsSystem/data/profession/collectors.ts","./data/resources/woods":"systems/professionsSystem/data/resources/woods.ts","./professionSystem":"systems/professionsSystem/professionSystem.ts"}],"systems/professionsSystem/farmSystem.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initFarmSystem = void 0;

var utility_1 = require("../../utility");

var systems_1 = require("../../systems");

var data_1 = require("./data");

var farmItem = function (formId, duration, baseId, animations) {
  if (duration === void 0) {
    duration = 5;
  }

  if (animations) {
    var currentAnimation = mp.get(formId, 'animation');

    if (!currentAnimation) {
      mp.set(formId, 'animation', {
        animations: animations,
        duration: duration
      });
      setTimeout(function () {
        systems_1.inventorySystem.addItem(formId, baseId, 1);
        mp.set(formId, 'animation', null);
      }, duration * 1000);
    }
  } else {
    utility_1.utils.log('farmItem(): animations not found');
    systems_1.inventorySystem.addItem(formId, baseId, 1);
  }
};

var initFarmSystem = function () {
  utility_1.utils.hook('_onActivate', function (formId, event) {
    try {
      if ((event === null || event === void 0 ? void 0 : event.baseId) && (event === null || event === void 0 ? void 0 : event.name)) {
        Object.keys(data_1.resources).every(function (key) {
          var resourceType = key;
          var data = data_1.resources[resourceType].find(function (item) {
            return item.sourceName === event.name;
          });
          var currentProf = mp.get(formId, 'activeProfession');

          if (currentProf) {
            if (data) {
              switch (data.type) {
                case 'minerals':
                  var duration = 5;
                  currentProf.name === 'miner' ? farmItem(formId, duration, data.baseId, data_1.allAnimation.collector.miner) : mp.set(formId, 'message', 'Вы не шахтер!');
                  break;

                default:
                  break;
              }

              return;
            }
          } else {
            mp.set(formId, 'message', 'У вас нет профессии');
          }
        });
      }
    } catch (e) {
      utility_1.utils.log('_onFarm', e);
    }
  });
};

exports.initFarmSystem = initFarmSystem;
},{"../../utility":"utility/index.ts","../../systems":"systems/index.ts","./data":"systems/professionsSystem/data/index.ts"}],"systems/professionsSystem/farmerSystem.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initFarmerSystem = void 0;

var _1 = require(".");

var utility_1 = require("../../utility");

var data_1 = require("./data");

var currentProfessionName = 'farmer';

var initFarmerSystem = function () {
  utility_1.utils.hook('_onActivateMessage', function (pcFormId, event) {
    var _a;

    if (((_a = data_1.MESSAGES.farmer) === null || _a === void 0 ? void 0 : _a.baseId) !== event.msgId) return;

    if (event.answer === 0) {
      var myProfession = _1.professionSystem.getFromServer(pcFormId);

      if (!(myProfession === null || myProfession === void 0 ? void 0 : myProfession.isActive)) {
        _1.professionSystem.set(pcFormId, currentProfessionName);
      }
    } else if (event.answer === 1) {
      _1.professionSystem.delete(pcFormId, currentProfessionName, true);
    }
  });
};

exports.initFarmerSystem = initFarmerSystem;
},{".":"systems/professionsSystem/index.ts","../../utility":"utility/index.ts","./data":"systems/professionsSystem/data/index.ts"}],"systems/professionsSystem/index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(require("./professionSystem"), exports);

__exportStar(require("./minesSystem"), exports);

__exportStar(require("./woodsmanSystem"), exports);

__exportStar(require("./farmSystem"), exports);

__exportStar(require("./farmerSystem"), exports);
},{"./professionSystem":"systems/professionsSystem/professionSystem.ts","./minesSystem":"systems/professionsSystem/minesSystem.ts","./woodsmanSystem":"systems/professionsSystem/woodsmanSystem.ts","./farmSystem":"systems/professionsSystem/farmSystem.ts","./farmerSystem":"systems/professionsSystem/farmerSystem.ts"}],"systems/index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(require("./developerCommands"), exports);

__exportStar(require("./inventorySystem"), exports);

__exportStar(require("./spawnSystem"), exports);

__exportStar(require("./professionsSystem"), exports);
},{"./developerCommands":"systems/developerCommands.ts","./inventorySystem":"systems/inventorySystem.ts","./spawnSystem":"systems/spawnSystem.ts","./professionsSystem":"systems/professionsSystem/index.ts"}],"properties/spawnPoint.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSpawnPoint = void 0;

var constants_1 = require("../constants");

var systems_1 = require("../systems");

var utility_1 = require("../utility");

var initSpawnPoint = function () {
  mp.makeProperty('spawnPoint', {
    isVisibleByOwner: false,
    isVisibleByNeighbors: false,
    updateNeighbor: '',
    updateOwner: ''
  });
  utility_1.utils.hook('onDeath', function (pcFormId) {
    if (mp.get(pcFormId, 'baseDesc') === '7:Skyrim.esm') {
      setTimeout(function () {
        systems_1.spawnSystem.spawn(pcFormId);
      }, systems_1.spawnSystem.timeToRespawn);
    }
  });
  utility_1.utils.hook('onReinit', function (pcFormId, options) {
    if (!mp.get(pcFormId, 'spawnPoint') || options && options.force) {
      mp.set(pcFormId, 'spawnPoint', constants_1.defaultSpawnPoint);
    }
  });
};

exports.initSpawnPoint = initSpawnPoint;
},{"../constants":"constants/index.ts","../systems":"systems/index.ts","../utility":"utility/index.ts"}],"properties/builtIn.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNeighbors = exports.getEquipment = exports.getInventar = exports.getFormDesc = exports.getBaseDesc = exports.getType = exports.getIsOnline = exports.getIsDisabled = exports.getIsOpen = exports.getAppearance = exports.getWorldOrCellDesc = exports.getAngle = exports.getPos = void 0;

function getPos(formId) {
  var _a = mp.get(formId, 'pos'),
      x = _a[0],
      y = _a[1],
      z = _a[2];

  return {
    x: x,
    y: y,
    z: z
  };
}

exports.getPos = getPos;

function getAngle(formId) {
  var _a = mp.get(formId, 'angle'),
      x = _a[0],
      y = _a[1],
      z = _a[2];

  return {
    x: x,
    y: y,
    z: z
  };
}

exports.getAngle = getAngle;

function getWorldOrCellDesc(formId) {
  return mp.get(formId, 'worldOrCellDesc');
}

exports.getWorldOrCellDesc = getWorldOrCellDesc;

function getAppearance(formId) {
  return mp.get(formId, 'appearance');
}

exports.getAppearance = getAppearance;

function getIsOpen(formId) {
  return mp.get(formId, 'isOpen');
}

exports.getIsOpen = getIsOpen;

function getIsDisabled(formId) {
  return mp.get(formId, 'isDisabled');
}

exports.getIsDisabled = getIsDisabled;

function getIsOnline(formId) {
  return mp.get(formId, 'isOnline');
}

exports.getIsOnline = getIsOnline;

function getType(formId) {
  return mp.get(formId, 'type');
}

exports.getType = getType;

function getBaseDesc(formId) {
  return mp.get(formId, 'baseDesc');
}

exports.getBaseDesc = getBaseDesc;

function getFormDesc(formId) {
  return mp.get(formId, 'formDesc');
}

exports.getFormDesc = getFormDesc;

function getInventar(formId) {
  return mp.get(formId, 'inventory');
}

exports.getInventar = getInventar;

function getEquipment(formId) {
  return mp.get(formId, 'equipment');
}

exports.getEquipment = getEquipment;

function getNeighbors(formId) {
  return mp.get(formId, 'neighbors');
}

exports.getNeighbors = getNeighbors;
},{}],"properties/activeProfession.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initActiveProfession = void 0;

var utility_1 = require("../utility");

function setActiveProfession() {
  if (ctx.value !== ctx.state.activeProfession) {
    ctx.state.activeProfession = ctx.value;

    if (ctx.value) {
      var player_1 = ctx.sp.Game.getPlayer();

      if (ctx.value.oldEquipment && !ctx.value.isActive) {
        ctx.value.oldEquipment.forEach(function (itemId) {
          var currentItem = ctx.sp.Game.getForm(itemId.baseId);

          if (!player_1.isEquipped(currentItem)) {
            player_1.equipItem(currentItem, false, false);
          }
        });
      }

      if (ctx.value.equipment && ctx.value.isActive) {
        var equipItems = Object.keys(ctx.value.equipment);
        equipItems.forEach(function (item) {
          var currentItem = ctx.sp.Game.getForm(ctx.value.equipment[item]);

          if (!player_1.isEquipped(currentItem)) {
            player_1.equipItem(currentItem, false, false);
          }
        });
      }
    }

    ctx.sp.printConsole(ctx.value);
  }
}

var initActiveProfession = function () {
  mp.makeProperty('activeProfession', {
    isVisibleByOwner: true,
    isVisibleByNeighbors: true,
    updateOwner: utility_1.getFunctionText(setActiveProfession, 'setActiveProfession'),
    updateNeighbor: ''
  });
};

exports.initActiveProfession = initActiveProfession;
},{"../utility":"utility/index.ts"}],"properties/animation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAnimation = void 0;

var utility_1 = require("../utility");

function setAnimation() {
  var _a, _b;

  try {
    if (ctx.value !== ctx.state.animation) {
      ctx.state.animation = ctx.value;

      if ((_a = ctx.value) === null || _a === void 0 ? void 0 : _a.animations) {
        ctx.sp.printConsole('Animation start.');
        var animations_1 = ctx.value.animations;

        if (animations_1) {
          animations_1.start.forEach(function (animName) {
            ctx.sp.Debug.sendAnimationEvent(ctx.sp.Game.getPlayer(), animName);
          });
          ctx.sp.Utility.wait((_b = ctx.value.duration) !== null && _b !== void 0 ? _b : 5).then(function () {
            animations_1.end.forEach(function (animName) {
              ctx.sp.Debug.sendAnimationEvent(ctx.sp.Game.getPlayer(), animName);
            });
          });
        } else {
          ctx.sp.printConsole('Not found animations.');
        }
      }
    }
  } catch (e) {
    ctx.sp.printConsole(e);
  }
}

var initAnimation = function () {
  mp.makeProperty('animation', {
    isVisibleByOwner: true,
    isVisibleByNeighbors: true,
    updateOwner: utility_1.getFunctionText(setAnimation, 'setAnimation'),
    updateNeighbor: ''
  });
};

exports.initAnimation = initAnimation;
},{"../utility":"utility/index.ts"}],"properties/index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(require("./actorValues"), exports);

__exportStar(require("./consoleOutput"), exports);

__exportStar(require("./isDead"), exports);

__exportStar(require("./spawnPoint"), exports);

__exportStar(require("./builtIn"), exports);

__exportStar(require("./activeProfession"), exports);

__exportStar(require("./animation"), exports);
},{"./actorValues":"properties/actorValues/index.ts","./consoleOutput":"properties/consoleOutput.ts","./isDead":"properties/isDead.ts","./spawnPoint":"properties/spawnPoint.ts","./builtIn":"properties/builtIn.ts","./activeProfession":"properties/activeProfession.ts","./animation":"properties/animation.ts"}],"events/_.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initEmptyAnimationEvent = void 0;

var initEmptyAnimationEvent = function () {
  mp.makeEventSource('_', 'ctx.sp.storage._api_onAnimationEvent = { callback: function () {} };');
};

exports.initEmptyAnimationEvent = initEmptyAnimationEvent;
},{}],"events/onActorValueFlushRequired.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initActorValueFlushRequiredEvent = void 0;

var utility_1 = require("../utility");

var properties_1 = require("../properties");

var initActorValueFlushRequiredEvent = function () {
  var _loop_1 = function (attr) {
    mp.makeEventSource('_onActorValueFlushRequired' + attr, utility_1.genClientFunction(function () {
      var update = function () {
        var percent = ctx.sp.Game.getPlayer().getActorValuePercentage(attr);

        if (ctx.state.percent !== percent) {
          if (ctx.state.percent !== undefined && percent === 1) {
            ctx.sendEvent();
          }

          ctx.state.percent = percent;
        }
      };

      (function () {
        return __awaiter(void 0, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!1) return [3, 2];
                return [4, ctx.sp.Utility.wait(0.667)];

              case 1:
                _a.sent();

                update();
                return [3, 0];

              case 2:
                return [2];
            }
          });
        });
      })();
    }, '_onActorValueFlushRequired', {
      attr: attr
    }));
  };

  for (var _i = 0, _a = ['health', 'magicka', 'stamina']; _i < _a.length; _i++) {
    var attr = _a[_i];

    _loop_1(attr);
  }

  var _loop_2 = function (attr) {
    utility_1.utils.hook('_onActorValueFlushRequired' + attr, function (pcFormId) {
      utility_1.utils.log('[ValueFlushRequired] update');
      properties_1.actorValues.flushRegen(pcFormId, attr);
    });
  };

  for (var _b = 0, _c = ['health', 'magicka', 'stamina']; _b < _c.length; _b++) {
    var attr = _c[_b];

    _loop_2(attr);
  }
};

exports.initActorValueFlushRequiredEvent = initActorValueFlushRequiredEvent;
},{"../utility":"utility/index.ts","../properties":"properties/index.ts"}],"events/onAnimationEvent.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAnimationEvent = void 0;

var utility_1 = require("../utility");

var constants_1 = require("../constants");

var initAnimationEvent = function () {
  if (constants_1.TRACE_ANIMATION) {
    mp.makeEventSource('_onAnimationEvent', utility_1.genClientFunction(function () {
      var next = ctx.sp.storage._api_onAnimationEvent;
      ctx.sp.storage._api_onAnimationEvent = {
        callback: function () {
          var args = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }

          var serversideFormId = args[0],
              animEventName = args[1];
          ctx.sendEvent(serversideFormId, animEventName);

          if (typeof next.callback === 'function') {
            next.callback.apply(next, args);
          }
        }
      };
    }, '_onAnimationEvent'));
    utility_1.utils.hook('_onAnimationEvent', function (pcFormId, serversideFormId, animEventName) {
      if (serversideFormId !== constants_1.currentActor) return;
      utility_1.utils.log('[ANIMATION TRACE]', animEventName);
    });
  }
};

exports.initAnimationEvent = initAnimationEvent;
},{"../utility":"utility/index.ts","../constants":"constants/index.ts"}],"events/onBash.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initBashEvent = void 0;

var constants_1 = require("../constants");

var properties_1 = require("../properties");

var utility_1 = require("../utility");

var currentActorParam = constants_1.currentActor;

var initBashEvent = function () {
  mp.makeEventSource('_onBash', utility_1.genClientFunction(function () {
    var next = ctx.sp.storage._api_onAnimationEvent;
    ctx.sp.storage._api_onAnimationEvent = {
      callback: function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        var serversideFormId = args[0],
            animEventName = args[1];

        if (serversideFormId === currentActorParam && animEventName.toLowerCase().includes('bash')) {
          ctx.sendEvent(serversideFormId);
        }

        if (typeof next.callback === 'function') {
          next.callback.apply(next, args);
        }
      }
    };
  }, '_onBash', {
    currentActorParam: currentActorParam
  }));
  var sprintAttr = 'stamina';
  utility_1.utils.hook('_onBash', function (pcFormId) {
    var damage = properties_1.actorValues.get(pcFormId, sprintAttr, 'damage');
    var damageMod = -35;
    properties_1.actorValues.set(pcFormId, sprintAttr, 'damage', damage + damageMod);
  });
};

exports.initBashEvent = initBashEvent;
},{"../constants":"constants/index.ts","../properties":"properties/index.ts","../utility":"utility/index.ts"}],"events/onConsoleCommand.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initConsoleCommandEvent = void 0;

var initConsoleCommandEvent = function () {
  mp.makeEventSource('_onConsoleCommand', "ctx.sp.storage._api_onConsoleCommand = {\n\t\t    callback(...args) {\n\t\t      ctx.sendEvent(...args);\n\t\t    }\n\t\t  };\n\t\t");
};

exports.initConsoleCommandEvent = initConsoleCommandEvent;
},{}],"events/onCurrentCellChange.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initCurrentCellChangeEvent = void 0;

var utility_1 = require("../utility");

var initCurrentCellChangeEvent = function () {
  mp.makeEventSource('_onCurrentCellChange', utility_1.genClientFunction(function () {
    ctx.sp.on('update', function () {
      var _a, _b;

      try {
        if (ctx.sp.Game.getPlayer().getFormID() !== 0x14) return;
        var result = {
          hasError: false
        };
        var currentCell = ctx.sp.Game.getPlayer().getParentCell();
        var currentLocation = ctx.sp.Game.getPlayer().getCurrentLocation();

        if (currentLocation) {
          var keywords = [];

          for (var i = 0; i < currentLocation.getNumKeywords(); i++) {
            keywords.push(currentLocation.getNthKeyword(i).getFormID());
          }

          var currentCellData = {
            id: currentCell.getFormID(),
            name: currentCell.getName(),
            type: currentCell.getType(),
            keywords: keywords
          };

          if (((_a = ctx.state.currentCell) === null || _a === void 0 ? void 0 : _a.id) !== currentCellData.id) {
            if (((_b = ctx.state.currentCell) === null || _b === void 0 ? void 0 : _b.id) !== undefined) {
              result.prevCell = ctx.state.currentCell;
              result.currentCell = currentCellData;
              ctx.sendEvent(result);
            }

            ctx.state.currentCell = currentCellData;
          }
        }
      } catch (err) {
        ctx.sendEvent({
          hasError: true,
          err: err.toString()
        });
      }
    });
  }, '_onCurrentCellChange', {}));
  utility_1.utils.hook('_onCurrentCellChange', function (pcFormId, event) {
    if (!event.hasError) {
      var mineKeyword = 0x18ef1;
      utility_1.utils.log('[CELL_CHANGE]', pcFormId, event.currentCell);
    } else {
      utility_1.utils.log('[CELL_CHANGE]', 'ERROR: ' + event.err);
    }
  });
};

exports.initCurrentCellChangeEvent = initCurrentCellChangeEvent;
},{"../utility":"utility/index.ts"}],"events/onHit.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initHitEvent = void 0;

var properties_1 = require("../properties");

var utility_1 = require("../utility");

var constants_1 = require("../constants");

var initHitEvent = function () {
  mp.makeEventSource('_onHit', utility_1.getFunctionText(function () {
    ctx.sp.on('hit', function (event) {
      var e = event;
      if (!ctx.sp.Actor.from(e.target)) return;
      if (e.source && ctx.sp.Spell.from(e.source)) return;
      var target = ctx.getFormIdInServerFormat(e.target.getFormID());
      var agressor = ctx.getFormIdInServerFormat(e.agressor.getFormID());
      ctx.sendEvent({
        isPowerAttack: e.isPowerAttack,
        isSneakAttack: e.isSneakAttack,
        isBashAttack: e.isBashAttack,
        isHitBlocked: e.isHitBlocked,
        target: target,
        agressor: agressor,
        source: e.source ? e.source.getFormID() : 0
      });
    });
  }, '_onHit'));
  utility_1.utils.hook('_onHit', function (pcFormId, eventData) {
    if (eventData.target === constants_1.currentActor) {
      eventData.target = pcFormId;
    }

    if (eventData.agressor === constants_1.currentActor) {
      eventData.agressor = pcFormId;
    }
  });
  utility_1.utils.hook('_onHit', function (pcFormId, eventData) {
    var damageMod = -25;

    if (!constants_1.PRODUCTION) {
      damageMod = 0;

      if (eventData.agressor === pcFormId) {
        damageMod = -250;
      }
    }

    var avName = 'health';
    var damage = properties_1.actorValues.get(eventData.target, avName, 'damage');
    var agressorDead = properties_1.actorValues.getCurrent(eventData.agressor, 'health') <= 0;

    if (damageMod < 0 && agressorDead) {
      utility_1.utils.log("Dead characters can't hit");
      return;
    }

    var greenZone = '165a7:Skyrim.esm';

    if (0 && mp.get(eventData.agressor, 'worldOrCellDesc') === greenZone) {
      var msgs = ['Вы с удивлением замечаете, что оставили лишь царапину', 'Вы не верите своим глазам. Боги отвели удар от цели', 'Вы чувствуете, что Кинарет наблюдает за вашими действиями'];
      var i = Math.floor(Math.random() * msgs.length);
      properties_1.consoleOutput.printNote(pcFormId, msgs[i]);
      damageMod = i === 0 ? -1 : 0;
    }

    var newDamageModValue = damage + damageMod;
    properties_1.actorValues.set(eventData.target, avName, 'damage', newDamageModValue);
    var wouldDie = properties_1.actorValues.getMaximum(eventData.target, 'health') + newDamageModValue <= 0;

    if (wouldDie && !mp.get(eventData.target, 'isDead')) {
      mp.onDeath(eventData.target);
    }
  });
};

exports.initHitEvent = initHitEvent;
},{"../properties":"properties/index.ts","../utility":"utility/index.ts","../constants":"constants/index.ts"}],"events/onHitStatic.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initHitStatic = void 0;

var utility_1 = require("../utility");

var initHitStatic = function () {
  mp.makeEventSource('_onHitStatic', utility_1.genClientFunction(function () {
    ctx.sp.on('hit', function (e) {
      if (ctx.sp.Actor.from(e.target)) return;
      var target = ctx.getFormIdInServerFormat(e.target.getFormId());
      var agressor = ctx.getFormIdInServerFormat(e.agressor.getFormId());
      ctx.sendEvent({
        target: target,
        agressor: agressor
      });
    });
  }, '_onHitStatic', {}));
  utility_1.utils.hook('_onHitStatic', function (pcFormId, eventData) {});
};

exports.initHitStatic = initHitStatic;
},{"../utility":"utility/index.ts"}],"events/onPowerAttack.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPowerAttacksEvent = void 0;

var properties_1 = require("../properties");

var utility_1 = require("../utility");

var initPowerAttacksEvent = function () {
  mp.makeEventSource('_onPowerAttack', utility_1.getFunctionText(function () {
    var next = ctx.sp.storage._api_onAnimationEvent;
    ctx.sp.storage._api_onAnimationEvent = {
      callback: function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        var serversideFormId = args[0],
            animEventName = args[1];

        if (serversideFormId === 0x14 && animEventName.toLowerCase().includes('power')) {
          ctx.sendEvent(serversideFormId);
        }

        if (typeof next.callback === 'function') {
          next.callback.apply(next, args);
        }
      }
    };
  }, 'PowerAttack'));
  var sprintAttr = 'stamina';
  utility_1.utils.hook('_onPowerAttack', function (pcFormId) {
    var damage = properties_1.actorValues.get(pcFormId, sprintAttr, 'damage');
    var damageMod = -35;
    properties_1.actorValues.set(pcFormId, sprintAttr, 'damage', damage + damageMod);
  });
};

exports.initPowerAttacksEvent = initPowerAttacksEvent;
},{"../properties":"properties/index.ts","../utility":"utility/index.ts"}],"events/onSprintStateChange.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSprintStateChangeEvent = void 0;

var properties_1 = require("../properties");

var utility_1 = require("../utility");

var initSprintStateChangeEvent = function () {
  mp.makeEventSource('_onSprintStateChange', utility_1.getFunctionText(function () {
    ctx.sp.on('update', function () {
      var isSprinting = ctx.sp.Game.getPlayer().isSprinting();

      if (ctx.state.isSprinting !== isSprinting) {
        if (ctx.state.isSprinting !== undefined) {
          ctx.sendEvent(isSprinting ? 'start' : 'stop');
        }

        ctx.state.isSprinting = isSprinting;
      }
    });
  }, 'SprintStateChange'));
  var sprintAttr = 'stamina';
  var staminaReduce = 10;
  utility_1.utils.hook('_onSprintStateChange', function (pcFormId, newState) {
    utility_1.utils.log('[SPRINT]', newState);

    switch (newState) {
      case 'start':
        properties_1.actorValues.set(pcFormId, "mp_" + sprintAttr + "drain", 'base', -staminaReduce);
        var damageMod = properties_1.actorValues.get(pcFormId, sprintAttr, 'damage');
        properties_1.actorValues.set(pcFormId, sprintAttr, 'damage', damageMod - staminaReduce);
        break;

      case 'stop':
        properties_1.actorValues.set(pcFormId, "mp_" + sprintAttr + "drain", 'base', 0);
        break;

      default:
        break;
    }
  });
};

exports.initSprintStateChangeEvent = initSprintStateChangeEvent;
},{"../properties":"properties/index.ts","../utility":"utility/index.ts"}],"events/onInput.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initInputF5Event = void 0;

var systems_1 = require("../systems");

var utility_1 = require("../utility");

var initInputF5Event = function () {
  mp.makeEventSource('_onInput', utility_1.getFunctionText(function () {
    var BUTTONS = new Map().set('F4', 0x3e).set('F5', 0x3f).set('F7', 0x41).set('F8', 0x42);
    ctx.sp.on('update', function () {
      var event = {
        name: '',
        code: -1
      };
      var isPressed = false;
      BUTTONS.forEach(function (val, key) {
        if (ctx.sp.Input.isKeyPressed(val)) {
          isPressed = true;
          event = {
            name: key,
            code: val
          };
        }
      });

      if (ctx.state.isPressed !== isPressed) {
        if (ctx.state.isPressed !== undefined && isPressed) {
          var obj = ctx.sp.ObjectReference.from(ctx.sp.Game.getPlayer());
          ctx.sendEvent(event);
        }

        ctx.state.isPressed = isPressed;
      }
    });
  }, '_onInput'));
  utility_1.utils.hook('_onInput', function (pcFormId, event) {
    switch (true) {
      case event.name === 'F4':
        utility_1.utils.log('[INPUT] press F4');
        systems_1.inventorySystem.addItem(pcFormId, 243042, 1);
        break;

      case event.name === 'F5':
        systems_1.reinit(pcFormId);
        utility_1.utils.log('[INPUT] press F5');
        break;

      case event.name === 'F7':
        utility_1.utils.log('[INPUT] press F7');
        break;

      case event.name === 'F8':
        utility_1.utils.log('[INPUT] press F8');
        break;

      default:
        utility_1.utils.log('[INPUT] key is not assignment');
        break;
    }
  });
};

exports.initInputF5Event = initInputF5Event;
},{"../systems":"systems/index.ts","../utility":"utility/index.ts"}],"events/onActivate.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initActivateEvent = void 0;

var utility_1 = require("../utility");

var initActivateEvent = function () {
  mp.makeEventSource('_onActivate', utility_1.getFunctionText(function () {
    ctx.sp.on('activate', function (event) {
      try {
        var e = event;
        if (e.caster.getFormID() !== 0x14) return;
        var result = {
          baseId: e.target.getFormID(),
          name: e.target.getBaseObject().getName(),
          caster: e.caster,
          target: e.target,
          isCrimeToActivate: e.isCrimeToActivate
        };
        ctx.sendEvent(result);
      } catch (e) {
        ctx.sp.printConsole('Catch _onActivate', e);
      }
    });
  }, '_onActivate'));
};

exports.initActivateEvent = initActivateEvent;
},{"../utility":"utility/index.ts"}],"events/onActivateMessage.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initActivateMessageEvent = void 0;

var utility_1 = require("../utility");

var initActivateMessageEvent = function () {
  mp.makeEventSource('_onActivateMessage', utility_1.getFunctionText(function () {
    var targetMessage = new Map().set(84448221, 0x500fb0b);
    ctx.sp.on('activate', function (event) {
      if (ctx.state.isMessageOpen) return;
      var e = event;
      if (e.caster.getFormID() !== 0x14) return;
      var target = e.target;
      var targetServerId = ctx.getFormIdInServerFormat(target.getFormID());
      var msgId = targetMessage.get(targetServerId);
      if (!msgId) return;
      var form = ctx.sp.Game.getFormEx(msgId);
      var msg = ctx.sp.Message.from(form);
      ctx.state.isMessageOpen = true;
      msg.show(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0).then(function (answer) {
        ctx.state.isMessageOpen = false;
        ctx.sendEvent({
          msgId: msgId,
          answer: answer
        });
      });
    });
  }, '_onActivateMessage'));
  utility_1.utils.hook('_onActivateMessage', function (pcFormId, event) {
    utility_1.utils.log('[ACTIVATE MESSAGE]', event);
  });
};

exports.initActivateMessageEvent = initActivateMessageEvent;
},{"../utility":"utility/index.ts"}],"events/index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(require("./_"), exports);

__exportStar(require("./onActorValueFlushRequired"), exports);

__exportStar(require("./onAnimationEvent"), exports);

__exportStar(require("./onBash"), exports);

__exportStar(require("./onConsoleCommand"), exports);

__exportStar(require("./onCurrentCellChange"), exports);

__exportStar(require("./onHit"), exports);

__exportStar(require("./onHitStatic"), exports);

__exportStar(require("./onPowerAttack"), exports);

__exportStar(require("./onSprintStateChange"), exports);

__exportStar(require("./onInput"), exports);

__exportStar(require("./onActivate"), exports);

__exportStar(require("./onActivateMessage"), exports);
},{"./_":"events/_.ts","./onActorValueFlushRequired":"events/onActorValueFlushRequired.ts","./onAnimationEvent":"events/onAnimationEvent.ts","./onBash":"events/onBash.ts","./onConsoleCommand":"events/onConsoleCommand.ts","./onCurrentCellChange":"events/onCurrentCellChange.ts","./onHit":"events/onHit.ts","./onHitStatic":"events/onHitStatic.ts","./onPowerAttack":"events/onPowerAttack.ts","./onSprintStateChange":"events/onSprintStateChange.ts","./onInput":"events/onInput.ts","./onActivate":"events/onActivate.ts","./onActivateMessage":"events/onActivateMessage.ts"}],"test/msgTest.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initTestMsg = void 0;

var utility_1 = require("../utility");

var farmMessageId = 0x500fb0b;

var initTestMsg = function () {
  utility_1.utils.hook('_onInput', function (pcFormId, event) {
    if (event.name === 'F7') {
      utility_1.utils.log('[TEST MESSAGE]');
    }
  });
};

exports.initTestMsg = initTestMsg;
},{"../utility":"utility/index.ts"}],"test/conainerChanged.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initTestContainerChangeEvent = void 0;

var utility_1 = require("../utility");

var systems_1 = require("../systems");

var initTestContainerChangeEvent = function () {
  mp.makeEventSource('_onContainerChange', utility_1.getFunctionText(function () {
    ctx.sp.on('containerChanged', function (e) {
      var _a, _b;

      var event = e;
      var oldId = (_a = event.oldContainer) === null || _a === void 0 ? void 0 : _a.getFormID();
      var newId = (_b = event.newContainer) === null || _b === void 0 ? void 0 : _b.getFormID();
      if (oldId !== 0x14 && newId !== 0x14) return;
      var oldContainer = oldId ? ctx.getFormIdInServerFormat(oldId) : null;
      var newContainer = newId ? ctx.getFormIdInServerFormat(newId) : null;
      ctx.sendEvent({
        oldContainer: oldContainer,
        newContainer: newContainer,
        baseId: event.baseObj.getFormID(),
        count: event.numItems,
        other: event.baseObj.getName()
      });
    });
  }, '_onContainerChange'));
  utility_1.utils.hook('_onContainerChange', function (pcFormId, event) {
    utility_1.utils.log('[Container Change]', event);

    if (event.oldContainer === 0x14) {
      systems_1.inventorySystem.deleteItem(pcFormId, event.baseId, event.count, true);
    }
  });
};

exports.initTestContainerChangeEvent = initTestContainerChangeEvent;
},{"../utility":"utility/index.ts","../systems":"systems/index.ts"}],"test/blockContainer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initTestBlockContainer = void 0;

var properties_1 = require("../properties");

var utility_1 = require("../utility");

var initTestBlockContainer = function () {
  utility_1.utils.hook('_onInput', function (pcFormId, event) {
    if (event.name === 'F8') {
      properties_1.consoleOutput.evalClient(pcFormId, utility_1.getFunctionText(function () {
        ctx.sp.printConsole('[TEST BLOCK CONTAINER]');
        [84448194, 84448116, 84448119, 84448195, 84448272, 0x6eb4f, 0x6eb51].forEach(function (x) {
          var form = ctx.sp.Game.getForm(x);
          var obj = ctx.sp.ObjectReference.from(form);
          var baseObj = obj.getBaseObject();
          ctx.sp.printConsole('[TEST BLOCK CONTAINER]', form.getFormID());
          ctx.sp.printConsole('[TEST BLOCK CONTAINER]', baseObj.getName());
          obj.blockActivation(true);
        });
      }, 'disable objectRef'));
    }
  });
};

exports.initTestBlockContainer = initTestBlockContainer;
},{"../properties":"properties/index.ts","../utility":"utility/index.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utility_1 = require("./utility");

var properties_1 = require("./properties");

var events_1 = require("./events");

var systems_1 = require("./systems");

var msgTest_1 = require("./test/msgTest");

var conainerChanged_1 = require("./test/conainerChanged");

var blockContainer_1 = require("./test/blockContainer");

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
events_1.initCurrentCellChangeEvent();
events_1.initEmptyAnimationEvent();
events_1.initHitStatic();
events_1.initInputF5Event();
events_1.initActivateEvent();
properties_1.initAnimation();
events_1.initActivateMessageEvent();
blockContainer_1.initTestBlockContainer();
msgTest_1.initTestMsg();
conainerChanged_1.initTestContainerChangeEvent();
systems_1.initFarmSystem();
properties_1.initActiveProfession();
systems_1.initMinesSystem();
systems_1.initWoodsmanSystem();
systems_1.initFarmerSystem();
utility_1.utils.hook('onInit', function (pcFormId) {
  mp.onReinit(pcFormId);
});

var getDistance = function (a, b) {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2));
};

utility_1.utils.hook('onUiEvent', function (formId, msg) {
  switch (msg.type) {
    case 'chatMessage':
      var myName_1 = mp.get(formId, 'appearance').name;
      var myPos_1 = mp.get(formId, 'pos');
      var neighbors = mp.get(formId, 'neighbors');
      neighbors = neighbors.filter(function (x) {
        return mp.get(x, 'type') === 'MpActor';
      });
      neighbors.forEach(function (neiFormId) {
        var pos = mp.get(neiFormId, 'pos');
        var distance = getDistance(myPos_1, pos);

        if (distance >= 0 && distance < 1000) {
          mp.sendUiMessage(neiFormId, {
            pageIndex: msg.pageIndex,
            text: msg.text,
            name: myName_1,
            tagIndex: 0,
            type: 'chatMessage'
          });
          utility_1.utils.log('Chat message handled', msg);
        }
      });
      break;
  }
});
},{"./utility":"utility/index.ts","./properties":"properties/index.ts","./events":"events/index.ts","./systems":"systems/index.ts","./test/msgTest":"test/msgTest.ts","./test/conainerChanged":"test/conainerChanged.ts","./test/blockContainer":"test/blockContainer.ts"}]},{},["index.ts"], null)
