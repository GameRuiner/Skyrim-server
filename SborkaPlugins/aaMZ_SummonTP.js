System.register("src/skyrimPlatform", [], function (exports_1, context_1) {
    "use strict";
    var MotionType;
    var __moduleName = context_1 && context_1.id;
    function Property(TypeOfProp, FormId, File) {
        return TypeOfProp.from(Game.getFormFromFile(FormId, File));
    }
    exports_1("Property", Property);
    return {
        setters: [],
        execute: function () {
            (function (MotionType) {
                MotionType[MotionType["Dynamic"] = 1] = "Dynamic";
                MotionType[MotionType["SphereInertia"] = 2] = "SphereInertia";
                MotionType[MotionType["BoxInertia"] = 3] = "BoxInertia";
                MotionType[MotionType["Keyframed"] = 4] = "Keyframed";
                MotionType[MotionType["Fixed"] = 5] = "Fixed";
                MotionType[MotionType["ThinBoxInertia"] = 6] = "ThinBoxInertia";
                MotionType[MotionType["Character"] = 7] = "Character";
            })(MotionType || (MotionType = {}));
            exports_1("MotionType", MotionType);
            ;
        }
    };
});
System.register("src/aaMZ_SummonTP", ["src/skyrimPlatform"], function (exports_2, context_2) {
    "use strict";
    var skyrimPlatform_1, SummonFollowerStorage, run;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (skyrimPlatform_1_1) {
                skyrimPlatform_1 = skyrimPlatform_1_1;
            }
        ],
        execute: function () {
            SummonFollowerStorage = /** @class */ (function () {
                function SummonFollowerStorage(summonStorage, magEffectCloack) {
                    var _this = this;
                    this.summonStorage = summonStorage;
                    this.magEffectCloack = magEffectCloack;
                    skyrimPlatform_1.on("magicEffectApply", function (event) {
                        // printConsole(this.summonStorage.size)
                        if (event.target && ((skyrimPlatform_1.Actor.from(event.target)))) {
                            var ac = skyrimPlatform_1.Actor.from(event.target);
							if (!ac)
                                return;
							var magEffectCloackRefresh = skyrimPlatform_1.Game.getFormFromFile(0x0E9917, "MZ_MASTER.esp").getFormID();
							// printConsole("" + event.effect.getFormID().toString(16) + " " + this.magEffectCloack.toString(16))
							var SummonKeyword = skyrimPlatform_1.Keyword.from(skyrimPlatform_1.Game.getFormFromFile(0x0E9802, "MZ_MASTER.esp"));
							var UndeadEffect = skyrimPlatform_1.MagicEffect.from(skyrimPlatform_1.Game.getFormFromFile(0x0e991a, "MZ_MASTER.esp"));
                            if (((skyrimPlatform_1.Actor.from(event.target)).hasKeyword(SummonKeyword) || (skyrimPlatform_1.Actor.from(event.target)).hasMagicEffect(UndeadEffect)) && (event.effect.getFormID() == magEffectCloackRefresh) && !(_this.summonStorage.has((skyrimPlatform_1.Actor.from(event.target).getFormID()))) && (!(skyrimPlatform_1.Actor.from(event.target)).isHostileToActor(skyrimPlatform_1.Game.getPlayer()))) {
                                // Debug.messageBox("ss")
                                _this.summonStorage.add(event.target.getFormID());
                            }
                        }
                    });
                    skyrimPlatform_1.on("deathEnd", function (event) {
                        if (event.actorDying) {
                            if (_this.summonStorage.has(event.actorDying.getFormID())) {
                                _this.summonStorage.delete(event.actorDying.getFormID());
                                // Debug.messageBox("end")
                            }
                        }
                    });
                }
                ;
                return SummonFollowerStorage;
            }());
            ;
            exports_2("run", run = function () {
                skyrimPlatform_1.storage.summonStorage = new Set();
                skyrimPlatform_1.storage.npcInCombatWithPlayer = new Set();
                var startTime = Date.now();
                var startTimeTP = Date.now();
                var needToInclude = 0;
                skyrimPlatform_1.once("update", function () {
                    var magEffectCloack = skyrimPlatform_1.Game.getFormFromFile(0x0E9917, "MZ_MASTER.esp").getFormID();
                    new SummonFollowerStorage(skyrimPlatform_1.storage.summonStorage, magEffectCloack);
                    var magEffectTP = skyrimPlatform_1.Game.getFormFromFile(0x0E9913, "MZ_MASTER.esp").getFormID();
                    skyrimPlatform_1.on("magicEffectApply", function (event) {
                        if (event.effect) {
                            if (event.effect.getFormID() == magEffectTP) {
                                var timeNowTP = Date.now();
                                var CanTP = (timeNowTP - startTimeTP) > 3000;
                                if (skyrimPlatform_1.Game.getPlayer().isInCombat()) {
                                    CanTP = (timeNowTP - startTimeTP) > 30000;
                                }
                                // Debug.messageBox("" + (timeNowTP - startTimeTP))
                                if (CanTP) {
                                    startTimeTP = Date.now();
                                    skyrimPlatform_1.storage.summonStorage.forEach(function (element) {
                                        (skyrimPlatform_1.ObjectReference.from(skyrimPlatform_1.Game.getFormEx(element))).setPosition((skyrimPlatform_1.Game.getPlayer().getPositionX()), (skyrimPlatform_1.Game.getPlayer().getPositionY()), (skyrimPlatform_1.Game.getPlayer().getPositionZ()));
                                    });
                                }
                            }
                        }
                    });
                    skyrimPlatform_1.on("update", function () {
                        var timeNow = Date.now();
                        var can = (timeNow - startTime) > 1000;
                        if (!can)
                            return;
                        skyrimPlatform_1.storage.summonStorage.forEach(function (element) {
                            //Debug.messageBox("asd");
                            var summonActor = skyrimPlatform_1.Actor.from(skyrimPlatform_1.Game.getFormEx(element));
                            if (!summonActor)
                                skyrimPlatform_1.storage.summonStorage.delete(element);
                            else if (summonActor.isDead() || summonActor.isDisabled() || !summonActor || summonActor.isHostileToActor(skyrimPlatform_1.Game.getPlayer())) {
                                skyrimPlatform_1.storage.summonStorage.delete(element);
                            }
                        });
                        startTime = timeNow;
                        needToInclude = 0;
                        if (!needToInclude)
                            return;
                    });
                });
            });
            skyrimPlatform_1.once("update", function () {
                run();
            });
        }
    };
});
