import { utils } from "../utility";
import { MP } from "../platform";
import { CellChangeEvent, ActivateEvent } from "../types/Events";
import { mines } from "./dataMechanics/locations/mines";
import { PROFFESSIONS } from "./dataMechanics/professions";
import { minerals } from "./dataMechanics/items/minerals";
import { message } from "../types/Events";
import { inventory } from "../types/Inventory";
import type { proffession, collectorNames } from "./dataMechanics/professions";
const getMessage = ({ message, type, baseId }: message): message => {
  return { message, type, baseId };
};
const addItem = (formId: number, baseId: number, count: number): void => {
  if (count <= 0) return;
  const inv: inventory = mp.get(formId, "inventory");
  let newInv: inventory = inv;
  const item = inv.entries.find((item) => item.baseId === baseId);
  if (item) {
    const itemIndex = inv.entries.findIndex((item) => item.baseId === baseId);
    newInv.entries[itemIndex].count += count;
    mp.set(formId, "inventory", newInv);
    mp.set(formId, "message", getMessage({ type: "add", baseId, count }));
  } else {
    newInv.entries.push({
      baseId: baseId,
      count: count,
    });
    mp.set(formId, "inventory", newInv);
    mp.set(formId, "message", getMessage({ type: "add", baseId, count }));
  }
};

declare const mp: MP;
export const init = () => {
  utils.hook("_onFarm", (pcFormId: number, event: any) => {
    try {
      const mineralFormId = minerals.find(
        (mineral) => mineral.sourceName === event.mineralSource
      );
      if (mineralFormId) {
        setTimeout(
          () => addItem(pcFormId, parseInt(mineralFormId.id, 16), 1),
          5000
        );
      }
    } catch (e) {
      utils.log("_onFarm", e);
    }
  });
};
