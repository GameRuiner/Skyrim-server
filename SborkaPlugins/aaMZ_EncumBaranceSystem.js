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
System.register("src/aaMZ_EncumBaranceSystem", ["src/skyrimPlatform"], function (exports_2, context_2) {
    "use strict";
    var skyrimPlatform_1, playerOverload, startTime;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (skyrimPlatform_1_1) {
                skyrimPlatform_1 = skyrimPlatform_1_1;
            }
        ],
        execute: function () {
            skyrimPlatform_1.once("update", function () {
                startTime = Date.now();
            });
            skyrimPlatform_1.on("loadGame", function () {
                startTime = Date.now();
            });
            skyrimPlatform_1.on("update", function () {
                var playerInventory = skyrimPlatform_1.Game.getPlayer().getActorValue("InventoryWeight");
                var playerEncumbarance = skyrimPlatform_1.Game.getPlayer().getActorValue("CarryWeight");
                var timeNow = Date.now();
                var can = (timeNow - startTime) > 100;
                if (!can)
                    return;
                startTime = timeNow;
                playerOverload = playerInventory - playerEncumbarance;
                if (playerOverload > 99) {
                    playerOverload = 99;
                }
                if (playerOverload > 0) {
                    (skyrimPlatform_1.GlobalVariable.from(skyrimPlatform_1.Game.getFormFromFile(0x0E9BAD, "MZ_Master.esp"))).setValue(playerOverload);
                    (skyrimPlatform_1.MagicEffect.from(skyrimPlatform_1.Game.getFormFromFile(0x0E9907, "MZ_Master.esp"))).clearEffectFlag(32768);
                    if (playerOverload >= 40) {
                        skyrimPlatform_1.Game.getPlayer().addPerk(skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormFromFile(0x0E9A3C, "MZ_Master.esp")));
                    }
                    else {
                        skyrimPlatform_1.Game.getPlayer().removePerk(skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormFromFile(0x0E9A3C, "MZ_Master.esp")));
                    }
                }
                else {
                    (skyrimPlatform_1.GlobalVariable.from(skyrimPlatform_1.Game.getFormFromFile(0x0E9BAD, "MZ_Master.esp"))).setValue(0);
                    (skyrimPlatform_1.MagicEffect.from(skyrimPlatform_1.Game.getFormFromFile(0x0E9907, "MZ_Master.esp"))).setEffectFlag(32768);
                    skyrimPlatform_1.Game.getPlayer().removePerk(skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormFromFile(0x0E9A3C, "MZ_Master.esp")));
                }
            });
        }
    };
});
