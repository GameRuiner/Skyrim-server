System.register("skyrimPlatform", [], function (exports_1, context_1) {
    "use strict";
    var MotionType;
    var __moduleName = context_1 && context_1.id;
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
System.register("index_MZ_mod", ["skyrimPlatform"], function (exports_3, context_3) {
    "use strict";
    var skyrimPlatform_2;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (skyrimPlatform_2_1) {
                skyrimPlatform_2 = skyrimPlatform_2_1;
            }
        ],
        execute: function () {
            skyrimPlatform_2.on("activate", function (event) {
				if (event.target){
                var keywordsummon = skyrimPlatform_2.Keyword.from(skyrimPlatform_2.Game.getFormFromFile(0x0E9802, "MZ_Master.esp"));
                if ((event.target.hasKeyword(keywordsummon))) {
                    var aktarget = skyrimPlatform_2.Actor.from(event.target);
                    (aktarget).kill(aktarget);
                }
				}
                ;
            });
        }
    };
});
