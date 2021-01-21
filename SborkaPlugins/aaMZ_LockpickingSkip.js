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
System.register("src/aaMZ_NoLockPicking", ["src/skyrimPlatform"], function (exports_2, context_2) {
    "use strict";
    var skyrimPlatform_1, sp;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (skyrimPlatform_1_1) {
                skyrimPlatform_1 = skyrimPlatform_1_1;
                sp = skyrimPlatform_1_1;
            }
        ],
        execute: function () {
            skyrimPlatform_1.on("activate", function (event) {
                var globaltoTurn = skyrimPlatform_1.GlobalVariable.from(skyrimPlatform_1.Game.getFormFromFile(0x065c29, "MZ_DIFFICULTY.esp"));
                if (event.target) {
                    if (globaltoTurn.getValue()) {
                        var needLockPciks = 0;
                        if (event.target.getLockLevel() >= 0 && event.target.getLockLevel() < 25) {
                            needLockPciks = 1;
                        }
                        else if (event.target.getLockLevel() >= 25 && event.target.getLockLevel() < 50) {
                            needLockPciks = 2;
                        }
                        else if (event.target.getLockLevel() >= 50 && event.target.getLockLevel() < 75) {
                            needLockPciks = 3;
                        }
                        else if (event.target.getLockLevel() >= 75 && event.target.getLockLevel() < 100) {
                            needLockPciks = 4;
                        }
                        else if (event.target.getLockLevel() >= 100 && event.target.getLockLevel() < 101) {
                            needLockPciks = 5;
                        }
                        if ((event.target.isLocked()) && (skyrimPlatform_1.Game.getPlayer().getItemCount(event.target.getKey()) <= 0) && (event.caster.getBaseObject().getFormID() == 7) && (skyrimPlatform_1.Game.getPlayer().getItemCount(skyrimPlatform_1.Game.getFormEx(0x0000a)) >= needLockPciks)) {
                            // Debug.messageBox("asd " + ActorValueInfo.getActorValueInfoByName("LockPicking").getExperienceForLevel(101));
                            var needLockPciks_1 = 1;
                            var needLockMastery = 10000000000;
                            var neddToAdvSkill = 0;
                            if (event.target.getLockLevel() >= 0 && event.target.getLockLevel() < 25) {
                                needLockMastery = 5;
                                needLockPciks_1 = 1;
                                neddToAdvSkill = skyrimPlatform_1.Game.getGameSettingFloat("fSkillUsageLockPickVeryEasy");
                            }
                            else if (event.target.getLockLevel() >= 25 && event.target.getLockLevel() < 50) {
                                needLockMastery = 45;
                                needLockPciks_1 = 2;
                                neddToAdvSkill = skyrimPlatform_1.Game.getGameSettingFloat("fSkillUsageLockPickEasy");
                            }
                            else if (event.target.getLockLevel() >= 50 && event.target.getLockLevel() < 75) {
                                needLockMastery = 80;
                                needLockPciks_1 = 3;
                                neddToAdvSkill = skyrimPlatform_1.Game.getGameSettingFloat("fSkillUsageLockPickAverage");
                            }
                            else if (event.target.getLockLevel() >= 75 && event.target.getLockLevel() < 100) {
                                needLockMastery = 115;
                                needLockPciks_1 = 4;
                                neddToAdvSkill = skyrimPlatform_1.Game.getGameSettingFloat("fSkillUsageLockPickHard");
                            }
                            else if (event.target.getLockLevel() >= 100 && event.target.getLockLevel() < 101) {
                                needLockMastery = 175;
                                needLockPciks_1 = 5;
                                neddToAdvSkill = skyrimPlatform_1.Game.getGameSettingFloat("fSkillUsageLockPickVeryHard");
                            }
                            if (skyrimPlatform_1.Game.getPlayer().getActorValue("lockpickingmod") >= needLockMastery) {
                                event.target.lock(false, false);
                                skyrimPlatform_1.Utility.wait(0.1).then(function () {
                                    sp["Input"].TapKey(sp["Input"].GetMappedKey("Pause", 0xFF));
                                    skyrimPlatform_1.Utility.wait(0.1).then(function () { sp["Input"].TapKey(sp["Input"].GetMappedKey("Activate", 0xFF)); });
                                });
                                skyrimPlatform_1.Game.advanceSkill("lockpicking", neddToAdvSkill);
                                skyrimPlatform_1.Game.getPlayer().removeItem(skyrimPlatform_1.Game.getFormEx(0x0000a), needLockPciks_1, false, null);
                                if (event.isCrimeToActivate == true) {
                                    skyrimPlatform_1.Game.setPlayerReportCrime(true);
                                    skyrimPlatform_1.printConsole("ssssss");
                                }
                            }
                            // printConsole(ActorValueInfo.getActorValueInfoByName("lockpicking").getSkillExperience())
                        }
                        ;
                    }
                }
            });
        }
    };
});
