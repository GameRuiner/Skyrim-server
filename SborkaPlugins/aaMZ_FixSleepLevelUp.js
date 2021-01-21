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
System.register("src/aaMZ_FixSleepLevelUp", ["src/skyrimPlatform"], function (exports_2, context_2) {
    "use strict";
    var sp, skyrimPlatform_1, startTime;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (sp_1) {
                sp = sp_1;
                skyrimPlatform_1 = sp_1;
            }
        ],
        execute: function () {
            skyrimPlatform_1.once("update", function () {
                startTime = Date.now();
            });
            skyrimPlatform_1.on("loadGame", function () {
                startTime = Date.now();
            });
            // ...
            skyrimPlatform_1.on("update", function () {
                var globaltooff = skyrimPlatform_1.GlobalVariable.from(skyrimPlatform_1.Game.getFormFromFile(0x0E9BB0, "MZ_Master.esp"));
                var globalMCM = skyrimPlatform_1.GlobalVariable.from(skyrimPlatform_1.Game.getFormFromFile(0x103CC6, "MZ_Master.esp"));
                var timeNow = Date.now();
                var can = (timeNow - startTime) > 100;
                if (!can)
                    return;
                startTime = timeNow;
                if ((sp["UI"].IsMenuOpen("StatsMenu") && (globaltooff.getValue())) && (!globalMCM.getValue())) {
                    globaltooff.setValue(0);
                }
                else if (!(globaltooff.getValue())) {
                    globaltooff.setValue(1);
                }
                ;
            });
        }
    };
});
