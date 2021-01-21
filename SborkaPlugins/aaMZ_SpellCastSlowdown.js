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
System.register("src/aaMZ_SpellCastSlowdown", ["src/skyrimPlatform"], function (exports_2, context_2) {
    "use strict";
    var skyrimPlatform_1, SpellOfDebuff, startTime, total_mod, iscastingLH, iscastingRH, IscastingNowVarRH, IscastingNowVarLH, IscastingNowVarDual, IsConcentrationSpellRight, IsConcentrationSpellLeft, PerkForApprenticeAlteration, PerkForApprenticeDestruction, PerkForApprenticeRestoration, PerkForApprenticeConjuration, PerkForApprenticeIllusion, PerkForAdeptAlteration, PerkForAdeptDestruction, PerkForAdeptRestoration, PerkForAdeptConjuration, PerkForAdeptIllusion, PerkForExpertAlteration, PerkForExpertDestruction, PerkForExpertRestoration, PerkForExpertConjuration, PerkForExpertIllusion, PerkForMasterAlteration, PerkForMasterDestruction, PerkForMasterRestoration, PerkForMasterConjuration, PerkForMasterIllusion;
    var __moduleName = context_2 && context_2.id;
    function getPerkSpeedMult() {
        PerkForApprenticeAlteration = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0xc44bb));
        PerkForApprenticeDestruction = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0x0c44bf));
        PerkForApprenticeRestoration = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0x0c44c7));
        PerkForApprenticeConjuration = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0x0c44b7));
        PerkForApprenticeIllusion = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0x0c44c3));
        PerkForAdeptAlteration = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0x0c44b8));
        PerkForAdeptDestruction = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0x0C44c0));
        PerkForAdeptRestoration = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0x0c44c8));
        PerkForAdeptConjuration = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0xc44bc));
        PerkForAdeptIllusion = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0x0c44c4));
        PerkForExpertAlteration = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0xc44b9));
        PerkForExpertDestruction = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0x0c44c1));
        PerkForExpertRestoration = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0x0c44c9));
        PerkForExpertConjuration = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0x0c44bd));
        PerkForExpertIllusion = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0x0c44c5));
        PerkForMasterAlteration = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0x0c44ba));
        PerkForMasterDestruction = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0x0c44c2));
        PerkForMasterRestoration = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0x0c44ca));
        PerkForMasterConjuration = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0x0c44be));
        PerkForMasterIllusion = skyrimPlatform_1.Perk.from(skyrimPlatform_1.Game.getFormEx(0x0c44c6));
        SpellOfDebuff = skyrimPlatform_1.Spell.from(skyrimPlatform_1.Game.getFormFromFile(0x0E97DF, "MZ_MASTER.esp"));
        if ((skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForMasterIllusion) || skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForMasterConjuration) || skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForMasterRestoration) || skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForMasterDestruction) || skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForMasterAlteration))) {
            return SpellOfDebuff.getNthEffectMagnitude(4);
        }
        else if (skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForExpertIllusion) || skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForExpertConjuration) || skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForExpertRestoration) || skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForExpertDestruction) || skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForExpertAlteration)) {
            return SpellOfDebuff.getNthEffectMagnitude(3);
        }
        else if (skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForAdeptIllusion) || skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForAdeptConjuration) || skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForAdeptRestoration) || skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForAdeptDestruction) || skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForAdeptAlteration)) {
            return SpellOfDebuff.getNthEffectMagnitude(2);
        }
        else if (skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForApprenticeIllusion) || skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForApprenticeConjuration) || skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForApprenticeRestoration) || skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForApprenticeDestruction) || skyrimPlatform_1.Game.getPlayer().hasPerk(PerkForApprenticeAlteration)) {
            return SpellOfDebuff.getNthEffectMagnitude(1);
        }
        else {
            //Debug.messageBox("aaaa")
            return SpellOfDebuff.getNthEffectMagnitude(0);
        }
    }
    function SetAVModInPerc(Perc) {
        var base_value = skyrimPlatform_1.Game.getPlayer().getActorValue("SpeedMult") - total_mod;
        var new_total_mod = base_value * Perc / 100.000;
        ModAV2(skyrimPlatform_1.Game.getPlayer(), new_total_mod - total_mod);
    }
    function ModAV2(akTarget, Mod) {
        total_mod += Mod;
        akTarget.modActorValue("Speedmult", Mod);
        akTarget.modActorValue("CarryWeight", -0.0100000);
        akTarget.modActorValue("CarryWeight", 0.0100000);
    }
    return {
        setters: [
            function (skyrimPlatform_1_1) {
                skyrimPlatform_1 = skyrimPlatform_1_1;
            }
        ],
        execute: function () {
            skyrimPlatform_1.printConsole("MZ MODPACK v.1.02c");
            total_mod = 0;
            iscastingLH = false;
            iscastingRH = false;
            IsConcentrationSpellRight = false;
            IsConcentrationSpellLeft = false;
            skyrimPlatform_1.hooks.sendAnimationEvent.add({
                enter: function (ctx) {
                    if (ctx.selfId.toString(16) == 0x14.toString(16)) {
                        //printConsole(ctx.animEventName)
                        if (ctx.animEventName == "MRh_SpellAimedStart") {
                            iscastingRH = true;
                        }
                        if (ctx.animEventName == "RitualSpellStart") {
                            iscastingLH = true;
                        }
                        if (ctx.animEventName == "RitualSpellOut") {
                            iscastingLH = false;
                        }
                        else if (ctx.animEventName == "MLh_SpellAimedStart") {
                            iscastingLH = true;
                        }
                        else if (ctx.animEventName == "MRh_SpellSelfStart") {
                            iscastingRH = true;
                        }
                        else if (ctx.animEventName == "MLh_SpellSelfStart") {
                            iscastingLH = true;
                        }
                        else if (ctx.animEventName == "MRh_SpellAimedConcentrationStart") {
                            iscastingRH = true;
                        }
                        else if (ctx.animEventName == "DualMagic_SpellAimedConcentrationStart") {
                            iscastingLH = true;
                        }
                        else if (ctx.animEventName == "DualMagic_SpellSelfConcentrationStart") {
                            iscastingLH = true;
                        }
                        else if (ctx.animEventName == "DualMagic_SpellAimedStart") {
                            iscastingLH = true;
                        }
                        else if (ctx.animEventName == "DualMagic_SpellSelfStart") {
                            iscastingLH = true;
                        }
                        else if (ctx.animEventName == "MRh_SpellSelfConcentrationStart") {
                            iscastingRH = true;
                        }
                        else if (ctx.animEventName == "MLh_SpellAimedConcentrationStart") {
                            iscastingLH = true;
                        }
                        else if (ctx.animEventName == "MLh_SpellSelfConcentrationStart") {
                            iscastingLH = true;
                        }
                        else if (ctx.animEventName == "MRh_SpellRelease_Event") {
                            if ((IsConcentrationSpellRight)) {
                                iscastingRH = true;
                            }
                            else {
                                iscastingRH = false;
                            }
                        }
                        else if (ctx.animEventName == "MLh_Equipped_Event") {
                            iscastingLH = false;
                        }
                        else if (ctx.animEventName == "MLH_SpellRelease_event") {
                            if ((IsConcentrationSpellLeft)) {
                                iscastingLH = true;
                            }
                            else {
                                iscastingLH = false;
                            }
                        }
                        else if (ctx.animEventName == "MRh_Equipped_Event") {
                            iscastingRH = false;
                        }
                    }
                },
                leave: function (ctx) {
                    //if (ctx.animationSucceeded) printConsole(ctx.selfId.toString(16));
                }
            });
            skyrimPlatform_1.once("update", function () {
                startTime = Date.now();
            });
            skyrimPlatform_1.on("loadGame", function () {
                startTime = Date.now();
                IscastingNowVarRH = skyrimPlatform_1.Game.getPlayer().getAnimationVariableBool("IsCastingRight");
                IscastingNowVarLH = skyrimPlatform_1.Game.getPlayer().getAnimationVariableBool("IsCastingLeft");
                IscastingNowVarDual = skyrimPlatform_1.Game.getPlayer().getAnimationVariableBool("IsCastingDual");
                total_mod = skyrimPlatform_1.GlobalVariable.from(skyrimPlatform_1.Game.getFormFromFile(0x122BCD, "MZ_MASTER.esp")).getValue();
                if (IscastingNowVarRH)
                    iscastingRH = true;
                if (IscastingNowVarLH)
                    iscastingLH = true;
                if (IscastingNowVarDual) {
                    iscastingRH = true;
                    iscastingLH = true;
                }
                if (iscastingRH || iscastingLH) {
                    SetAVModInPerc(-(getPerkSpeedMult()));
                }
                else {
                    SetAVModInPerc(0);
                }
            });
            skyrimPlatform_1.on("update", function () {
                var timeNow = Date.now();
                var can = (timeNow - startTime) > 100;
                if (!can)
                    return;
                startTime = timeNow;
                //printConsole(IsConcentrationSpellLeft + " " + (IsConcentrationSpellRight))
                if (skyrimPlatform_1.Game.getPlayer().getEquippedSpell(1)) {
                    IsConcentrationSpellRight = (skyrimPlatform_1.Game.getPlayer().getEquippedSpell(1).getNthEffectMagicEffect(0).getCastingType() == 2);
                }
                else if (!skyrimPlatform_1.Game.getPlayer().getEquippedSpell(1)) {
                    IsConcentrationSpellRight = false;
                }
                if (skyrimPlatform_1.Game.getPlayer().getEquippedSpell(0)) {
                    IsConcentrationSpellLeft = (skyrimPlatform_1.Game.getPlayer().getEquippedSpell(0).getNthEffectMagicEffect(0).getCastingType() == 2);
                }
                else if (!skyrimPlatform_1.Game.getPlayer().getEquippedSpell(0)) {
                    IsConcentrationSpellLeft = false;
                }
                //IsConcentrationSpellLeft = (Game.getPlayer().getEquippedSpell(0).getNthEffectMagicEffect(0).getCastingType() == 1)
                IscastingNowVarRH = skyrimPlatform_1.Game.getPlayer().getAnimationVariableBool("IsCastingRight");
                IscastingNowVarLH = skyrimPlatform_1.Game.getPlayer().getAnimationVariableBool("IsCastingLeft");
                IscastingNowVarDual = skyrimPlatform_1.Game.getPlayer().getAnimationVariableBool("IsCastingDual");
                skyrimPlatform_1.GlobalVariable.from(skyrimPlatform_1.Game.getFormFromFile(0x122BCD, "MZ_MASTER.esp")).setValue(total_mod);
                //if ((GlobalVariable.from(Game.getFormFromFile(0x122BCD, "MZ_MASTER.esp")).getValue() > 0) != (iscastingRH || iscastingLH)){
                if (iscastingRH || iscastingLH) {
                    SetAVModInPerc(-(getPerkSpeedMult()));
                    skyrimPlatform_1.GlobalVariable.from(skyrimPlatform_1.Game.getFormFromFile(0x1185F6, "MZ_MASTER.esp")).setValue(1);
                }
                else {
                    SetAVModInPerc(0);
                    skyrimPlatform_1.GlobalVariable.from(skyrimPlatform_1.Game.getFormFromFile(0x1185F6, "MZ_MASTER.esp")).setValue(0);
                }
                //}
            });
            ;
        }
    };
});
