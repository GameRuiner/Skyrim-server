import { CTX, MP } from "../platform";
import { getFunctionText } from "../utility";

declare const mp: MP;
declare const ctx: CTX;

function setActiveProfession() {
  try {
    if (ctx.value !== ctx.state.activeProfession) {
      ctx.state.activeProfession = ctx.value;
      if (ctx.value) {
        const player = ctx.sp.Game.getPlayer();
        if (ctx.value.oldEquipment && !ctx.value.isActive) {
          // player.unequipAll();
          ctx.value.oldEquipment.forEach((itemId: any) => {
            const currentItem = ctx.sp.Game.getForm(itemId.baseId);
            ctx.sp.printConsole(currentItem.getName());
            if (!player.isEquipped(currentItem)) {
              player.equipItem(currentItem, false, false);
            }
          });
        }
        if (ctx.value.equipment && ctx.value.isActive) {
          const equipItems = Object.keys(ctx.value.equipment);
          equipItems.forEach((item) => {
            const currentItem = ctx.sp.Game.getForm(ctx.value.equipment[item]);
            ctx.sp.printConsole(currentItem.getName());
            if (!player.isEquipped(currentItem)) {
              player.equipItem(currentItem, false, false);
            }
          });
        }
      }
      ctx.sp.printConsole(ctx.value);
    }
  } catch (e) {
    ctx.sp.printConsole(e);
  }
}

export const init = () => {
  mp.makeProperty("activeProfession", {
    isVisibleByOwner: true,
    isVisibleByNeighbors: true,
    updateOwner: getFunctionText(setActiveProfession),
    updateNeighbor: "",
  });
};
