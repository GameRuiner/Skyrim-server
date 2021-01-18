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
})({"utils/utils.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFunctionText = exports.utils = void 0;

var string_minify_1 = __importDefault(require("string-minify"));

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

var getFunctionText = function (func) {
  var result = string_minify_1.default(func.toString()).replace(new RegExp('^.+?{', 'm'), '').replace(new RegExp('[}]$', 'm'), '').trim();
  return result;
};

exports.getFunctionText = getFunctionText;
},{}],"property/consoleOutput.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = exports.consoleOutput = void 0;

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
  }
};
var printTargets = {
  consoleOutput: 'ctx.sp.printConsole(...ctx.value.args)',
  notification: 'ctx.sp.Debug.notification(...ctx.value.args)'
};
var props = ['consoleOutput', 'notification'];

var init = function () {
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

exports.init = init;
},{}],"utils/typeCheck.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeCheck = void 0;
exports.typeCheck = {
  number: function (name, value) {
    if (typeof value !== typeof 0) {
      throw new TypeError("Expected '" + name + "' to be a number, but got " + JSON.stringify(value) + " (" + typeof value + ")");
    }
  },
  avModifier: function (name, value) {
    var modifiers = ['base', 'permanent', 'temporary', 'damage'];

    if (!modifiers.includes(value)) {
      throw new TypeError("Expected '" + name + "' to be a modifier, but got " + JSON.stringify(value) + " (" + typeof value + ")");
    }
  }
};
},{}],"sync/ActorValues.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = exports.actorValues = void 0;

var fs_1 = __importDefault(require("fs"));

var utils_1 = require("../utils/utils");

var typeCheck_1 = require("../utils/typeCheck");

var rate = function (attr) {
  return attr === 'health' ? 'av_healrate' : "av_" + attr + "rate";
};

var mult = function (attr) {
  return attr === 'health' ? 'av_healratemult' : "av_" + attr + "ratemult";
};

var drain = function (attr) {
  return "av_mp_" + attr + "drain";
};

var updateAttributeCommon = function (attr) {
  return "\n\tconst av = \"" + attr + "\";\n\tconst ac = ctx.sp.Actor.from(ctx.refr);\n\tif (!ac) return;\n\n\tconst base = ctx.value.base || 0;\n\tconst perm = ctx.value.permanent || 0;\n\tconst temp = ctx.value.temporary || 0;\n\tconst targetMax = base + perm + temp;\n\n\tconst numChangesKey = \"" + attr + "NumChanges\";\n\tconst numChanges = ctx.get(numChangesKey);\n\tif (ctx.state[numChangesKey] !== numChanges) {\n\t\tctx.state[numChangesKey] = numChanges;\n\t\tctx.state." + attr + "RegenStart = +Date.now();\n\t}\n\n\tconst realTargetDmg = ctx.value.damage || 0;\n\tlet targetDmg = realTargetDmg;\n\n\tif (av === \"health\" || ac.getFormId() == 0x14) {\n\t\tconst multName = \"" + mult(attr) + "\";\n\t\tconst rateName = \"" + rate(attr) + "\";\n\t\tconst drainName = \"" + drain(attr) + "\";\n\n\t\tconst additionalRegenMult = 1.0;\n\t\tconst regenDuration = (+Date.now() - (ctx.state." + attr + "RegenStart || 0)) / 1000;\n\t\tconst healRateMult = ctx.get(multName);\n\t\tconst healRateMultCurrent = (healRateMult.base || 0)\n\t\t\t+ (healRateMult.permanent || 0)\n\t\t\t+ (healRateMult.temporary || 0)\n\t\t\t+ (healRateMult.damage || 0);\n\t\tconst healRate = ctx.get(rateName);\n\t\tconst healRateCurrent = (healRate.base || 0)\n\t\t\t+ (healRate.permanent || 0)\n\t\t\t+ (healRate.temporary || 0)\n\t\t\t+ (healRate.damage || 0);\n\n\t\tconst drain = ctx.get(drainName);\n\t\tconst drainCurrent = (drain.base || 0)\n\t\t\t+ (drain.permanent || 0)\n\t\t\t+ (drain.temporary || 0)\n\t\t\t+ (drain.damage || 0);\n\t\tif (drainCurrent) {\n\t\t\ttargetDmg += regenDuration * drainCurrent;\n\t\t}\n\t\telse {\n\t\t\ttargetDmg += (regenDuration * additionalRegenMult\n\t\t\t\t* healRateCurrent * healRateMultCurrent * 0.01 * targetMax * 0.01);\n\t\t}\n\n\t\tif (targetDmg > 0) {\n\t\t\ttargetDmg = 0;\n\t\t}\n\t}\n\n\tconst currentPercentage = ac.getActorValuePercentage(av);\n\tconst currentMax = ac.getBaseActorValue(av);\n\n\tlet targetPercentage = (targetMax + targetDmg) / targetMax;\n\tif (ctx.get(\"isDead\") && av === \"health\") {\n\t\ttargetPercentage = 0;\n\t}\n\n\tconst deltaPercentage = targetPercentage - currentPercentage;\n\n\tconst k = (!targetPercentage || av === \"stamina\" || av === \"magicka\") ? 1 : 0.25;\n\n\tif (deltaPercentage > 0) {\n\t\tac.restoreActorValue(av, deltaPercentage * currentMax * k);\n\t}\n\telse if (deltaPercentage < 0) {\n\t\tac.damageActorValue(av, deltaPercentage * currentMax * k);\n\t}\n";
};

var updateAttributeNeighbor = function (attr) {
  return attr === 'health' ? updateAttributeCommon(attr) + ("ac.setActorValue(\"" + attr + "\", 9999);") : '';
};

var updateAttributeOwner = function (attr) {
  return updateAttributeCommon(attr) + ("ac.setActorValue(\"" + attr + "\", base);");
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

      if (dangerousAvNames.includes(avName.toLowerCase()) && this.applyRegenerationToParent) {
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

var init = function () {
  for (var _i = 0, _a = ['health', 'magicka', 'stamina']; _i < _a.length; _i++) {
    var attr = _a[_i];
    mp.makeProperty('av_' + attr, {
      isVisibleByOwner: true,
      isVisibleByNeighbors: attr === 'health',
      updateNeighbor: updateAttributeNeighbor(attr),
      updateOwner: updateAttributeOwner(attr)
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
      typeCheck_1.typeCheck.number('newValue', newValue);
      typeCheck_1.typeCheck.avModifier('modifierName', modifierName);
      var propName = 'av_' + avName.toLowerCase();
      var value = mp.get(formId, propName);
      value[modifierName] = newValue;
      mp.set(formId, propName, value);

      if (['health', 'magicka', 'stamina'].includes(avName.toLowerCase())) {
        var propName_1 = avName.toLowerCase() + "NumChanges";
        mp.set(formId, propName_1, 1 + (mp.get(formId, propName_1) || 0));
      }
    },
    get: function (formId, avName, modifierName) {
      typeCheck_1.typeCheck.avModifier('modifierName', modifierName);
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

      if (utils_1.utils.isActor(formId)) {
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

        var _loop_1 = function (avName) {
          if (!mp.get(formId, 'av_' + avName) || force) {
            mp.set(formId, 'av_' + avName, {
              base: 0
            });
            if (formId == 0x9b7a2) fs_1.default.writeFileSync('kekekek', '' + mp.get(formId, 'av_' + avName));

            if (formId == 0x9b7a2) {
              setTimeout(function () {
                fs_1.default.writeFileSync('kekekek1', '' + mp.get(formId, 'av_' + avName));
              }, 100);
            }
          }
        };

        for (var _f = 0, _g = ['mp_healthdrain', 'mp_magickadrain', 'mp_staminadrain']; _f < _g.length; _f++) {
          var avName = _g[_f];

          _loop_1(avName);
        }
      }
    }
  };
};

exports.init = init;
},{"../utils/utils":"utils/utils.ts","../utils/typeCheck":"utils/typeCheck.ts"}],"constants/constants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSpawnPoint = exports.currentActor = void 0;
exports.currentActor = 0x14;
exports.defaultSpawnPoint = {
  pos: [227, 239, 53],
  angle: [0, 0, 0],
  worldOrCellDesc: '165a7:Skyrim.esm'
};
},{}],"mechanics/spawnSystem.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = exports.spawnSystem = void 0;

var utils_1 = require("../utils/utils");

var ActorValues_1 = require("../sync/ActorValues");

var constants_1 = require("../constants/constants");

exports.spawnSystem = {
  timeToRespawn: 6000,
  spawn: function (targetFormId) {
    var spawnPoint = mp.get(targetFormId, 'spawnPoint');

    for (var _i = 0, _a = Object.keys(spawnPoint || constants_1.defaultSpawnPoint); _i < _a.length; _i++) {
      var propName = _a[_i];
      mp.set(targetFormId, propName, (spawnPoint || constants_1.defaultSpawnPoint)[propName]);
    }

    ActorValues_1.actorValues.set(targetFormId, 'health', 'damage', 0);
    ActorValues_1.actorValues.set(targetFormId, 'magicka', 'damage', 0);
    ActorValues_1.actorValues.set(targetFormId, 'stamina', 'damage', 0);
    setTimeout(function () {
      mp.set(targetFormId, 'isDead', false);
    }, 500);
    utils_1.utils.log(targetFormId.toString(16) + " respawns");
  },
  updateSpawnPoint: function (targetFormId) {
    mp.set(targetFormId, 'spawnPoint', {
      pos: mp.get(targetFormId, 'pos'),
      angle: mp.get(targetFormId, 'angle'),
      worldOrCellDesc: mp.get(targetFormId, 'worldOrCellDesc')
    });
  }
};

var init = function () {
  utils_1.utils.hook('onDeath', function (pcFormId) {
    setTimeout(function () {
      exports.spawnSystem.spawn(pcFormId);
    }, exports.spawnSystem.timeToRespawn);
  });
};

exports.init = init;
},{"../utils/utils":"utils/utils.ts","../sync/ActorValues":"sync/ActorValues.ts","../constants/constants":"constants/constants.ts"}],"mechanics/devCommands.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var utils_1 = require("../utils/utils");

var consoleOutput_1 = require("../property/consoleOutput");

var ActorValues_1 = require("../sync/ActorValues");

var spawnSystem_1 = require("./spawnSystem");

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
  consoleOutput_1.consoleOutput.print(targetFormId, "Reinit " + targetFormId.toString(16) + " " + tip);
};

var setav = function (pcFormId, selectedFormId, avName, newValueStr) {
  var newValue = parseFloat(newValueStr);
  newValue = isFinite(newValue) ? newValue : 1;
  var targetFormId = chooseFormId(pcFormId, selectedFormId);
  var tip = chooseTip(pcFormId, selectedFormId);
  ActorValues_1.actorValues.set(targetFormId, avName, 'base', newValue);
  consoleOutput_1.consoleOutput.print(targetFormId, "Set " + avName + " to " + newValue + " " + tip);
};

var kill = function (pcFormId, selectedFormId) {
  var targetFormId = chooseFormId(pcFormId, selectedFormId);
  var tip = chooseTip(pcFormId, selectedFormId);
  var prev = mp.get(targetFormId, 'isDead');
  mp.set(targetFormId, 'isDead', !prev);
  consoleOutput_1.consoleOutput.print(targetFormId, 'Play visual effects for killing/resurrection', targetFormId.toString(16) + " " + tip);
};

var spawn = function (pcFormId, selectedFormId) {
  var targetFormId = chooseFormId(pcFormId, selectedFormId);
  var tip = chooseTip(pcFormId, selectedFormId);
  spawnSystem_1.spawnSystem.spawn(targetFormId);
  consoleOutput_1.consoleOutput.print(targetFormId, "Teleporting to the spawnpoint " + targetFormId.toString(16) + " " + tip);
};

var spawnpoint = function (pcFormId, selectedFormId) {
  var targetFormId = chooseFormId(pcFormId, selectedFormId);
  var tip = chooseTip(pcFormId, selectedFormId);
  spawnSystem_1.spawnSystem.updateSpawnPoint(targetFormId);
  consoleOutput_1.consoleOutput.print(targetFormId, "Spawnpoint has been updated for " + targetFormId.toString(16) + " " + tip);
};

var init = function () {
  utils_1.utils.hook('_onConsoleCommand', function (pcFormId) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    var selectedFormId = args[0] !== 0x14 ? args[0] : pcFormId;
    var sub = args[1];
    var arg0 = args[2];
    var arg1 = args[3];

    if (sub === 'reinit') {
      reinit(pcFormId, selectedFormId);
    } else if (sub === 'setav') {
      setav(pcFormId, selectedFormId, arg0, arg1);
    } else if (sub === 'kill') {
      kill(pcFormId, selectedFormId);
    } else if (sub === 'spawn') {
      spawn(pcFormId, selectedFormId);
    } else if (sub === 'spawnpoint') {
      spawnpoint(pcFormId, selectedFormId);
    }
  });
};

exports.init = init;
},{"../utils/utils":"utils/utils.ts","../property/consoleOutput":"property/consoleOutput.ts","../sync/ActorValues":"sync/ActorValues.ts","./spawnSystem":"mechanics/spawnSystem.ts"}],"mechanics/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spawnSystemInit = exports.devCommandsInit = void 0;

var devCommands_1 = require("./devCommands");

Object.defineProperty(exports, "devCommandsInit", {
  enumerable: true,
  get: function () {
    return devCommands_1.init;
  }
});

var spawnSystem_1 = require("./spawnSystem");

Object.defineProperty(exports, "spawnSystemInit", {
  enumerable: true,
  get: function () {
    return spawnSystem_1.init;
  }
});
},{"./devCommands":"mechanics/devCommands.ts","./spawnSystem":"mechanics/spawnSystem.ts"}],"property/isDead.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var utils_1 = require("../utils/utils");

var updateNeighbor = "\nconst ac = ctx.sp.Actor.from(ctx.refr);\nconst isDead = ctx.value;\nif (isDead) {\n  ac.endDeferredKill();\n  ac.kill(null);\n}\nelse {\n  ac.startDeferredKill();\n}\n\nif (!isDead && ac.isDead()) {\n  ctx.respawn();\n}\n";
var updateOwner = "\nconst ac = ctx.sp.Actor.from(ctx.refr);\nac.startDeferredKill();\n\nconst value = ctx.value;\nif (value !== ctx.state.value) {\n  const die = !!value;\n  if (die) {\n    const pos = [\n      ac.getPositionX(), ac.getPositionY(), ac.getPositionZ()\n    ];\n\n    // Everyone should stop combat with us\n    for (let i = 0; i < 200; ++i) {\n      const randomActor = ctx.sp.Game.findRandomActor(pos[0], pos[1], pos[2], 10000);\n      if (!randomActor) continue;\n      const tgt = randomActor.getCombatTarget();\n      if (!tgt || tgt.getFormID() !== 0x14) continue;\n      randomActor.stopCombat();\n    }\n\n    ac.pushActorAway(ac, 0);\n  }\n\n  if (!die) {\n    ctx.sp.Debug.sendAnimationEvent(ac, \"GetUpBegin\");\n  }\n\n  ctx.state.value = value;\n}\n";

var init = function () {
  mp.makeProperty('isDead', {
    isVisibleByOwner: true,
    isVisibleByNeighbors: true,
    updateNeighbor: updateNeighbor,
    updateOwner: updateOwner
  });
  utils_1.utils.hook('onDeath', function (pcFormId) {
    mp.set(pcFormId, 'isDead', true);
    utils_1.utils.log(pcFormId.toString(16) + " died");
  });
};

exports.init = init;
},{"../utils/utils":"utils/utils.ts"}],"property/spawnPoint.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var init = function () {
  mp.makeProperty('spawnPoint', {
    isVisibleByOwner: false,
    isVisibleByNeighbors: false,
    updateNeighbor: '',
    updateOwner: ''
  });
};

exports.init = init;
},{}],"property/playerLevel.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var init = function () {};

exports.init = init;
},{}],"property/playerRace.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

function setRaceWeight() {
  if (!(typeof ctx.value === 'number')) return;
  ctx.refr.setWeight(ctx.value);
}

var init = function () {
  mp.makeProperty('race', {
    isVisibleByOwner: false,
    isVisibleByNeighbors: false,
    updateOwner: '',
    updateNeighbor: ''
  });
  mp.makeProperty('raceWeight', {
    isVisibleByOwner: false,
    isVisibleByNeighbors: false,
    updateOwner: '',
    updateNeighbor: ''
  });
};

exports.init = init;
},{}],"utils/index.ts":[function(require,module,exports) {
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

__exportStar(require("./typeCheck"), exports);

__exportStar(require("./utils"), exports);
},{"./typeCheck":"utils/typeCheck.ts","./utils":"utils/utils.ts"}],"property/scale.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var utils_1 = require("../utils");

function setScale() {
  if (ctx.value !== ctx.state.lastScale) {
    ctx.state.lastScale = +ctx.value;
    ctx.refr.setScale(+ctx.value);
  }
}

var init = function () {
  mp.makeProperty('scale', {
    isVisibleByOwner: true,
    isVisibleByNeighbors: true,
    updateOwner: utils_1.getFunctionText(setScale),
    updateNeighbor: utils_1.getFunctionText(setScale)
  });
};

exports.init = init;
},{"../utils":"utils/index.ts"}],"property/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scalePropInit = exports.playerRacePropInit = exports.playerLevelPropInit = exports.spawnPointPropInit = exports.consoleOutputPropInit = exports.isDeadPropInit = void 0;

var isDead_1 = require("./isDead");

Object.defineProperty(exports, "isDeadPropInit", {
  enumerable: true,
  get: function () {
    return isDead_1.init;
  }
});

var consoleOutput_1 = require("./consoleOutput");

Object.defineProperty(exports, "consoleOutputPropInit", {
  enumerable: true,
  get: function () {
    return consoleOutput_1.init;
  }
});

var spawnPoint_1 = require("./spawnPoint");

Object.defineProperty(exports, "spawnPointPropInit", {
  enumerable: true,
  get: function () {
    return spawnPoint_1.init;
  }
});

var playerLevel_1 = require("./playerLevel");

Object.defineProperty(exports, "playerLevelPropInit", {
  enumerable: true,
  get: function () {
    return playerLevel_1.init;
  }
});

var playerRace_1 = require("./playerRace");

Object.defineProperty(exports, "playerRacePropInit", {
  enumerable: true,
  get: function () {
    return playerRace_1.init;
  }
});

var scale_1 = require("./scale");

Object.defineProperty(exports, "scalePropInit", {
  enumerable: true,
  get: function () {
    return scale_1.init;
  }
});
},{"./isDead":"property/isDead.ts","./consoleOutput":"property/consoleOutput.ts","./spawnPoint":"property/spawnPoint.ts","./playerLevel":"property/playerLevel.ts","./playerRace":"property/playerRace.ts","./scale":"property/scale.ts"}],"event/_.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var init = function () {
  mp.makeEventSource('_', 'ctx.sp.storage._api_onAnimationEvent = { callback: function () {} };');
};

exports.init = init;
},{}],"sync/index.ts":[function(require,module,exports) {
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
exports.ActorValuesInit = void 0;

__exportStar(require("./ActorValues"), exports);

var ActorValues_1 = require("./ActorValues");

Object.defineProperty(exports, "ActorValuesInit", {
  enumerable: true,
  get: function () {
    return ActorValues_1.init;
  }
});
},{"./ActorValues":"sync/ActorValues.ts"}],"event/_onBash.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var sync_1 = require("../sync");

var utils_1 = require("../utils");

var init = function () {
  mp.makeEventSource('_onBash', utils_1.getFunctionText(function () {
    var next = ctx.sp.storage._api_onAnimationEvent;
    ctx.sp.storage._api_onAnimationEvent = {
      callback: function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        var serversideFormId = args[0],
            animEventName = args[1];

        if (serversideFormId === 0x14 && animEventName.toLowerCase().includes('bash')) {
          ctx.sendEvent(serversideFormId);
        }

        if (typeof next.callback === 'function') {
          next.callback.apply(next, args);
        }
      }
    };
  }));
  var sprintAttr = 'stamina';
  utils_1.utils.hook('_onBash', function (pcFormId) {
    var damage = sync_1.actorValues.get(pcFormId, sprintAttr, 'damage');
    var damageMod = -35;
    sync_1.actorValues.set(pcFormId, sprintAttr, 'damage', damage + damageMod);
  });
};

exports.init = init;
},{"../sync":"sync/index.ts","../utils":"utils/index.ts"}],"event/_onHit.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var consoleOutput_1 = require("../property/consoleOutput");

var sync_1 = require("../sync");

var utils_1 = require("../utils/utils");

var init = function () {
  mp.makeEventSource('_onHit', utils_1.getFunctionText(function () {
    ctx.sp.on('hit', function (e) {
      if (!ctx.sp.Actor.from(e.target)) return;
      if (e.source && ctx.sp.Spell.from(e.source)) return;
      var target = ctx.getFormIdInServerFormat(e.target.getFormId());
      var agressor = ctx.getFormIdInServerFormat(e.agressor.getFormId());
      ctx.sendEvent({
        isPowerAttack: e.isPowerAttack,
        isSneakAttack: e.isSneakAttack,
        isBashAttack: e.isBashAttack,
        isHitBlocked: e.isHitBlocked,
        target: target,
        agressor: agressor,
        source: e.source ? e.source.getFormId() : 0
      });
    });
  }));
  utils_1.utils.hook('_onHit', function (pcFormId, eventData) {
    if (eventData.target === 0x14) {
      eventData.target = pcFormId;
    }

    if (eventData.agressor === 0x14) {
      eventData.agressor = pcFormId;
    }
  });
  utils_1.utils.hook('_onHit', function (pcFormId, eventData) {
    var damageMod = -25;

    if (eventData.agressor === pcFormId && eventData.target !== pcFormId) {
      damageMod = -250;
    }

    var avName = 'health';
    var damage = sync_1.actorValues.get(eventData.target, avName, 'damage');
    var agressorDead = sync_1.actorValues.getCurrent(eventData.agressor, 'health') <= 0;

    if (damageMod < 0 && agressorDead) {
      utils_1.utils.log("Dead characters can't hit");
      return;
    }

    var greenZone = '165a7:Skyrim.esm';

    if (0 && mp.get(eventData.agressor, 'worldOrCellDesc') === greenZone) {
      var msgs = ['Вы с удивлением замечаете, что оставили лишь царапину', 'Вы не верите своим глазам. Боги отвели удар от цели', 'Вы чувствуете, что Кинарет наблюдает за вашими действиями'];
      var i = Math.floor(Math.random() * msgs.length);
      consoleOutput_1.consoleOutput.printNote(pcFormId, msgs[i]);
      damageMod = i === 0 ? -1 : 0;
    }

    var newDamageModValue = damage + damageMod;
    sync_1.actorValues.set(eventData.target, avName, 'damage', newDamageModValue);
    var wouldDie = sync_1.actorValues.getMaximum(eventData.target, 'health') + newDamageModValue <= 0;

    if (wouldDie && !mp.get(eventData.target, 'isDead')) {
      mp.onDeath(eventData.target);
    }
  });
};

exports.init = init;
},{"../property/consoleOutput":"property/consoleOutput.ts","../sync":"sync/index.ts","../utils/utils":"utils/utils.ts"}],"event/_onPowerAttack.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var sync_1 = require("../sync");

var utils_1 = require("../utils");

var init = function () {
  mp.makeEventSource('_onPowerAttack', utils_1.getFunctionText(function () {
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
  }));
  var sprintAttr = 'stamina';
  utils_1.utils.hook('_onPowerAttack', function (pcFormId) {
    var damage = sync_1.actorValues.get(pcFormId, sprintAttr, 'damage');
    var damageMod = -35;
    sync_1.actorValues.set(pcFormId, sprintAttr, 'damage', damage + damageMod);
  });
};

exports.init = init;
},{"../sync":"sync/index.ts","../utils":"utils/index.ts"}],"event/_onRegenFinish.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var utils_1 = require("../utils");

var sync_1 = require("../sync");

var init = function () {
  for (var _i = 0, _a = ['health', 'magicka', 'stamina']; _i < _a.length; _i++) {
    var attr = _a[_i];
    mp.makeEventSource('_onActorValueFlushRequired' + attr, "\n      const update = () => {\n        const attr = \"" + attr + "\";\n        const percent = ctx.sp.Game.getPlayer().getActorValuePercentage(attr);\n        if (ctx.state.percent !== percent) {\n          if (ctx.state.percent !== undefined && percent === 1) {\n            ctx.sendEvent();\n          }\n          ctx.state.percent = percent;\n        }\n      };\n      (async () => {\n        while (1) {\n          await ctx.sp.Utility.wait(0.667);\n          update();\n        }\n      });\n    ");
  }

  var _loop_1 = function (attr) {
    utils_1.utils.hook('_onActorValueFlushRequired' + attr, function (pcFormId) {
      sync_1.actorValues.flushRegen(pcFormId, attr);
    });
  };

  for (var _b = 0, _c = ['health', 'magicka', 'stamina']; _b < _c.length; _b++) {
    var attr = _c[_b];

    _loop_1(attr);
  }
};

exports.init = init;
},{"../utils":"utils/index.ts","../sync":"sync/index.ts"}],"event/_onSprintStateChange.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var sync_1 = require("../sync");

var utils_1 = require("../utils");

var init = function () {
  mp.makeEventSource('_onSprintStateChange', utils_1.getFunctionText(function () {
    ctx.sp.on('update', function () {
      var isSprinting = ctx.sp.Game.getPlayer().isSprinting();

      if (ctx.state.isSprinting !== isSprinting) {
        if (ctx.state.isSprinting !== undefined) {
          ctx.sendEvent(isSprinting ? 'start' : 'stop');
        }

        ctx.state.isSprinting = isSprinting;
      }
    });
  }));
  var sprintAttr = 'stamina';
  var staminaReduce = 10;
  utils_1.utils.hook('_onSprintStateChange', function (pcFormId, newState) {
    switch (newState) {
      case 'start':
        sync_1.actorValues.set(pcFormId, "mp_" + sprintAttr + "drain", 'base', -staminaReduce);
        var damageMod = sync_1.actorValues.get(pcFormId, sprintAttr, 'damage');
        sync_1.actorValues.set(pcFormId, sprintAttr, 'damage', damageMod - staminaReduce);
        break;

      case 'stop':
        sync_1.actorValues.set(pcFormId, "mp_" + sprintAttr + "drain", 'base', 0);
        break;

      default:
        break;
    }
  });
};

exports.init = init;
},{"../sync":"sync/index.ts","../utils":"utils/index.ts"}],"event/_onConsoleCommand.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var init = function () {
  mp.makeEventSource('_onConsoleCommand', "\n\t\t  ctx.sp.storage._api_onConsoleCommand = {\n\t\t    callback(...args) {\n\t\t      ctx.sendEvent(...args);\n\t\t    }\n\t\t  };\n\t\t");
};

exports.init = init;
},{}],"event/_onLocalDeath.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var sync_1 = require("../sync");

var utils_1 = require("../utils");

var init = function () {
  mp.makeEventSource('_onLocalDeath', utils_1.getFunctionText(function () {
    ctx.sp.on('update', function () {
      var isDead = ctx.sp.Game.getPlayer().getActorValuePercentage('health') === 0;

      if (ctx.state.wasDead !== isDead) {
        if (isDead) {
          ctx.sendEvent();
        }

        ctx.state.wasDead = isDead;
      }
    });
  }));
  utils_1.utils.hook('_onLocalDeath', function (pcFormId) {
    var max = sync_1.actorValues.getMaximum(pcFormId, 'health');
    sync_1.actorValues.set(pcFormId, 'health', 'damage', -max);
    mp.onDeath(pcFormId);
  });
};

exports.init = init;
},{"../sync":"sync/index.ts","../utils":"utils/index.ts"}],"event/_onCurrentCellChange.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var utils_1 = require("../utils");

function _onCurrentCellChange() {
  ctx.sp.on('update', function () {
    try {
      var result = {
        hasError: false
      };
      var currentCell = ctx.sp.Game.getPlayer().getParentCell();

      if (ctx.state.currentCellId !== currentCell.getFormID()) {
        if (ctx.state.currentCellId !== undefined) {
          result.cell = currentCell.getFormID();
          ctx.sendEvent(result);
        }

        ctx.state.currentCellId = currentCell.getFormID();
      }
    } catch (err) {
      ctx.sendEvent({
        hasError: true,
        err: err.toString()
      });
    }
  });
}

var init = function () {
  mp.makeEventSource('_onCurrentCellChange', utils_1.getFunctionText(_onCurrentCellChange));
  utils_1.utils.hook('_onCurrentCellChange', function (pcformId, event) {
    try {
      utils_1.utils.log(mp.get(pcformId, 'inventory'));
    } catch (err) {
      utils_1.utils.log(err);
    }

    if (!event.hasError) {
      utils_1.utils.log(pcformId, event.cell);
    }
  });
};

exports.init = init;
},{"../utils":"utils/index.ts"}],"event/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._onCurrentCellChangeInit = exports._onLocalDeathInit = exports._onConsoleCommandInit = exports._onSprintStateChangeInit = exports._onRegenFinishInit = exports._onPowerAttackInit = exports._onHitInit = exports._onBashInit = exports._Init = void 0;

var _1 = require("./_");

Object.defineProperty(exports, "_Init", {
  enumerable: true,
  get: function () {
    return _1.init;
  }
});

var _onBash_1 = require("./_onBash");

Object.defineProperty(exports, "_onBashInit", {
  enumerable: true,
  get: function () {
    return _onBash_1.init;
  }
});

var _onHit_1 = require("./_onHit");

Object.defineProperty(exports, "_onHitInit", {
  enumerable: true,
  get: function () {
    return _onHit_1.init;
  }
});

var _onPowerAttack_1 = require("./_onPowerAttack");

Object.defineProperty(exports, "_onPowerAttackInit", {
  enumerable: true,
  get: function () {
    return _onPowerAttack_1.init;
  }
});

var _onRegenFinish_1 = require("./_onRegenFinish");

Object.defineProperty(exports, "_onRegenFinishInit", {
  enumerable: true,
  get: function () {
    return _onRegenFinish_1.init;
  }
});

var _onSprintStateChange_1 = require("./_onSprintStateChange");

Object.defineProperty(exports, "_onSprintStateChangeInit", {
  enumerable: true,
  get: function () {
    return _onSprintStateChange_1.init;
  }
});

var _onConsoleCommand_1 = require("./_onConsoleCommand");

Object.defineProperty(exports, "_onConsoleCommandInit", {
  enumerable: true,
  get: function () {
    return _onConsoleCommand_1.init;
  }
});

var _onLocalDeath_1 = require("./_onLocalDeath");

Object.defineProperty(exports, "_onLocalDeathInit", {
  enumerable: true,
  get: function () {
    return _onLocalDeath_1.init;
  }
});

var _onCurrentCellChange_1 = require("./_onCurrentCellChange");

Object.defineProperty(exports, "_onCurrentCellChangeInit", {
  enumerable: true,
  get: function () {
    return _onCurrentCellChange_1.init;
  }
});
},{"./_":"event/_.ts","./_onBash":"event/_onBash.ts","./_onHit":"event/_onHit.ts","./_onPowerAttack":"event/_onPowerAttack.ts","./_onRegenFinish":"event/_onRegenFinish.ts","./_onSprintStateChange":"event/_onSprintStateChange.ts","./_onConsoleCommand":"event/_onConsoleCommand.ts","./_onLocalDeath":"event/_onLocalDeath.ts","./_onCurrentCellChange":"event/_onCurrentCellChange.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils/utils");

var mechanics_1 = require("./mechanics");

var property_1 = require("./property");

var event_1 = require("./event");

var sync_1 = require("./sync");

var constants_1 = require("./constants/constants");

utils_1.utils.log('Gamemode init');

if (!Array.isArray(global.knownEvents)) {
  global.knownEvents = [];
}

for (var _i = 0, _a = global.knownEvents; _i < _a.length; _i++) {
  var eventName = _a[_i];
  delete mp[eventName];
}

utils_1.utils.hook('onInit', function (pcFormId) {
  mp.onReinit(pcFormId);
});
property_1.isDeadPropInit();
property_1.consoleOutputPropInit();
property_1.spawnPointPropInit();
property_1.playerLevelPropInit();
property_1.playerRacePropInit();
property_1.scalePropInit();

event_1._Init();

event_1._onBashInit();

event_1._onHitInit();

event_1._onPowerAttackInit();

event_1._onRegenFinishInit();

event_1._onSprintStateChangeInit();

event_1._onConsoleCommandInit();

event_1._onLocalDeathInit();

event_1._onCurrentCellChangeInit();

sync_1.ActorValuesInit();
mechanics_1.spawnSystemInit();
mechanics_1.devCommandsInit();
utils_1.utils.hook('onReinit', function (pcFormId, options) {
  if (sync_1.actorValues.setDefaults) {
    sync_1.actorValues.setDefaults(pcFormId, options);
  }

  if (!mp.get(pcFormId, 'spawnPoint') || options && options.force) {
    mp.set(pcFormId, 'spawnPoint', constants_1.defaultSpawnPoint);
  }

  mp.set(pcFormId, 'scale', 1);
});
},{"./utils/utils":"utils/utils.ts","./mechanics":"mechanics/index.ts","./property":"property/index.ts","./event":"event/index.ts","./sync":"sync/index.ts","./constants/constants":"constants/constants.ts"}]},{},["index.ts"], null)