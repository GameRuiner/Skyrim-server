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
System.register("src/aaMZ_UltimateDodge", ["src/skyrimPlatform"], function (exports_2, context_2) {
    "use strict";
    var skyrimPlatform_1, sp, onKeyDown, onKeyUp, wasPressed;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (skyrimPlatform_1_1) {
                skyrimPlatform_1 = skyrimPlatform_1_1;
                sp = skyrimPlatform_1_1;
            }
        ],
        execute: function () {
            onKeyDown = function () {
                //printConsole("space pressed");
                var hasEnoughtStamina = skyrimPlatform_1.Game.getPlayer().getActorValue("Stamina") >= (skyrimPlatform_1.GlobalVariable.from(skyrimPlatform_1.Game.getFormFromFile(0x044A66, "Ultimate Dodge Mod.esp"))).getValue();
                var playerHasPerk = skyrimPlatform_1.Game.getPlayer().hasPerk(skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormFromFile(0x0E9AD8, "MZ_MASTER.esp")));
                var pLayerIsOverIncumbered = skyrimPlatform_1.Game.getPlayer().getActorValue("InventoryWeight") >= skyrimPlatform_1.Game.getPlayer().getActorValue("CarryWeight");
                //let playerIsAttacking = Game.getPlayer().getAnimationVariableBool("IsAttacking")
                var playerIsWornHeavyArmor = skyrimPlatform_1.Game.getPlayer().wornHasKeyword(skyrimPlatform_1.Keyword.from(skyrimPlatform_1.Game.getFormEx(0x06BBD2)));
                if (playerHasPerk && hasEnoughtStamina && !pLayerIsOverIncumbered && !playerIsWornHeavyArmor) {
                    skyrimPlatform_1.Game.getPlayer().setAnimationVariableFloat("DodgeSpeed", 1.647);
                    skyrimPlatform_1.Game.getPlayer().setAnimationVariableInt("DodgeID", 1);
                    skyrimPlatform_1.Debug.sendAnimationEvent(skyrimPlatform_1.Game.getPlayer(), "attackStop");
                    skyrimPlatform_1.Debug.sendAnimationEvent(skyrimPlatform_1.Game.getPlayer(), "CastStop");
                    skyrimPlatform_1.Debug.sendAnimationEvent(skyrimPlatform_1.Game.getPlayer(), "blockStop");
                    skyrimPlatform_1.Debug.sendAnimationEvent(skyrimPlatform_1.Game.getPlayer(), "RollStart");
                    skyrimPlatform_1.Game.getPlayer().damageActorValue("Stamina", (skyrimPlatform_1.GlobalVariable.from(skyrimPlatform_1.Game.getFormFromFile(0x044A66, "Ultimate Dodge Mod.esp"))).getValue());
                }
            };
            onKeyUp = function () {
                //printConsole("E released");
            };
            wasPressed = false;
            skyrimPlatform_1.on("update", function () {
                var isPressed = sp["Input"].isKeyPressed((skyrimPlatform_1.GlobalVariable.from(skyrimPlatform_1.Game.getFormFromFile(0x1237B7, "Ultimate Dodge Mod.esp"))).getValue());
                if (wasPressed !== isPressed) {
                    wasPressed = isPressed;
                    isPressed ? onKeyDown() : onKeyUp();
                }
            });
        }
    };
});
