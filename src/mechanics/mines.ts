import { utils } from "../utility";
import { MP } from "../platform";
import { CellChangeEvent, ActivateEvent, message } from "../types/Events";
import { mines } from "./dataMechanics/locations/mines";
import { PROFFESSIONS } from "./dataMechanics/professions";
import type { proffession, collectorNames } from "./dataMechanics/professions";
import { inventory, inventoryEquip } from "../types/Inventory";
import { minerals } from "./dataMechanics/items/minerals";
// import { addItem } from "../helper";
declare const mp: MP;

const getMessage = ({ message, type, baseId }: message): message => {
  return { message, type, baseId };
};

const isMine = (name: string): boolean => {
  const findedMine = mines.find((el) => el.worldId === name);
  return findedMine ? true : false;
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
    // mp.set(formId, "message", getMessage({ type: "add", baseId, count }));
  } else {
    newInv.entries.push({
      baseId: baseId,
      count: count,
    });
    mp.set(formId, "inventory", newInv);
    // mp.set(formId, "message", getMessage({ type: "add", baseId, count }));
  }
};

const deleteItem = (
  formId: number,
  baseId: number,
  count: number
): { success: boolean; message: string } => {
  if (count <= 0) {
    return {
      success: false,
      message:
        "Ошибка: Количество предметов для удаления должны быть больше 0!",
    };
  }
  const inv: inventory = mp.get(formId, "inventory");
  let newInv: inventory = { entries: [] };

  const deletedItemIndex = inv.entries.findIndex(
    (item) => item.baseId === baseId
  );
  const newCount = inv.entries[deletedItemIndex].count - count;

  if (deletedItemIndex === -1) {
    return {
      success: false,
      message: "Ошибка: Предмет не найден!",
    };
  }
  if (newCount < 0) {
    return {
      success: false,
      message: "Ошибка: Нехватает предметов чтобы их удалить!",
    };
  }
  if (newCount === 0) {
    newInv.entries = inv.entries.filter((item) => item.baseId !== baseId);

    mp.set(formId, "inventory", newInv);

    return {
      success: true,
      message: "Успех: Предмет удален из инвентаря.",
    };
  }
  if (newCount > 0) {
    newInv.entries = inv.entries;
    newInv.entries[deletedItemIndex].count = newCount;
    mp.set(formId, "inventory", newInv);
    return {
      success: true,
      message: `Успех: Количество предмета изменено на ${newCount}.`,
    };
  }
  return {
    success: false,
    message: "Error: deleteItem()!",
  };
};

const isInInventory = (pcFormId: number, itemId?: number): boolean => {
  if (!itemId) return false;
  let inv: inventory = mp.get(pcFormId, "inventory");
  return inv.entries.find((el) => el.baseId === itemId) ? true : false;
};

const isEquip = (pcFormId: number, itemId: number): boolean => {
  const inv: inventory = mp.get(pcFormId, "equipment");
  const item = inv.entries.find((item) => item.baseId === itemId);
  return item?.worn ?? false;
};

const getAllEquipItems = (pcFormId: number): inventoryEquip => {
  const myInv: inventoryEquip = mp.get(pcFormId, "equipment");
  const myEquip: inventoryEquip = {
    inv: { entries: myInv.inv.entries.filter((item) => item.worn) },
  };
  return myEquip;
};

const deleteProfessionItems = (
  pcFormId: number,
  name: collectorNames
): boolean => {
  utils.log("deleteProfessionItems");
  const currentProf = PROFFESSIONS[name];
  if (!currentProf) {
    utils.log("Error: deleteProfessionItems() - Cannot find profession:", name);
    return false;
  }
  const actorHave: {
    tool: boolean;
    clothes: boolean;
    boots: boolean;
    helmet: boolean;
    gloves: boolean;
  } = {
    tool: isInInventory(pcFormId, currentProf.tool),
    clothes: isInInventory(pcFormId, currentProf.clothes),
    boots: isInInventory(pcFormId, currentProf.boots),
    helmet: isInInventory(pcFormId, currentProf.helmet),
    gloves: isInInventory(pcFormId, currentProf.gloves),
  };
  const canEndProfession = {
    tool: (actorHave.tool && !!currentProf.tool) || !currentProf.tool,
    clothes:
      (actorHave.clothes && !!currentProf.clothes) || !currentProf.clothes,
    boots: (actorHave.boots && !!currentProf.boots) || !currentProf.boots,
    helmet: (actorHave.helmet && !!currentProf.helmet) || !currentProf.helmet,
    gloves: (actorHave.gloves && !!currentProf.gloves) || !currentProf.gloves,
  };
  if (
    canEndProfession.tool &&
    canEndProfession.clothes &&
    canEndProfession.gloves &&
    canEndProfession.helmet &&
    canEndProfession.boots
  ) {
    if (currentProf.tool) {
      const isDeleted = deleteItem(pcFormId, currentProf.tool, 1);
      if (!isDeleted.success) utils.log(isDeleted.message);
    }
    if (currentProf.clothes) {
      const isDeleted = deleteItem(pcFormId, currentProf.clothes, 1);
      if (!isDeleted.success) utils.log(isDeleted.message);
    }
    if (currentProf.boots) {
      const isDeleted = deleteItem(pcFormId, currentProf.boots, 1);
      if (!isDeleted.success) utils.log(isDeleted.message);
    }
    if (currentProf.helmet) {
      const isDeleted = deleteItem(pcFormId, currentProf.helmet, 1);
      if (!isDeleted.success) utils.log(isDeleted.message);
    }
    if (currentProf.gloves) {
      const isDeleted = deleteItem(pcFormId, currentProf.gloves, 1);
      if (!isDeleted.success) utils.log(isDeleted.message);
    }
    mp.set(
      pcFormId,
      "message",
      getMessage({
        type: "message",
        message: "Ты уволен! Экипировка возвращена.",
      })
    );

    return true;
  } else {
    const messageError =
      "Ошибка: игрок не может уволиться, не все предметы могут быть возвращены!";
    mp.set(
      pcFormId,
      "message",
      getMessage({
        type: "message",
        message: messageError,
      })
    );
    utils.log(messageError);
    return false;
  }
};
const addProfessionItems = (pcFormId: number, name: collectorNames): void => {
  utils.log("addProfessionItems");
  const currentProf = PROFFESSIONS[name];
  if (!currentProf) {
    utils.log("Error: addProfessionItems() -  Cannot find profession:", name);
    return;
  }
  if (currentProf.tool) addItem(pcFormId, currentProf.tool, 1);
  if (currentProf.clothes) addItem(pcFormId, currentProf.clothes, 1);
  if (currentProf.boots) addItem(pcFormId, currentProf.boots, 1);
  if (currentProf.helmet) addItem(pcFormId, currentProf.helmet, 1);
  if (currentProf.gloves) addItem(pcFormId, currentProf.gloves, 1);
};

const setProfession = (pcFormId: number, professionName: collectorNames) => {
  const currentProfession = PROFFESSIONS[currentProfessionName];
  addProfessionItems(pcFormId, currentProfessionName);
  mp.set(pcFormId, "activeProfession", {
    name: professionName,
    equipment: currentProfession,
    oldEquipment: getAllEquipItems(pcFormId).inv.entries,
    isActive: true,
  });
};
const deleteProfession = (pcFormId: number) => {
  const isDeleted = deleteProfessionItems(pcFormId, currentProfessionName);
  if (!isDeleted) {
    utils.log("Error: deleteProfessionItems() - error in deleteItem() ");
  } else {
    const { oldEquipment } = mp.get(pcFormId, "activeProfession");
    utils.log(oldEquipment);
    mp.set(pcFormId, "activeProfession", {
      name: null,
      equipment: null,
      oldEquipment: oldEquipment,
      isActive: false,
    });
  }
};
const sellItems = (
  pcFormId: number,
  items: { name: string; price: number }[]
): void => {
  const inv: inventory = mp.get(pcFormId, "inventory");
  items.forEach((item) => {
    const itemId = minerals.find((mineral) => mineral.name === item.name)?.id;

    if (itemId !== undefined) {
      const itemCount: number | undefined = inv.entries.find(
        (itemFind) => itemFind.baseId === parseInt(itemId, 16)
      )?.count;
      if (itemCount && itemCount > 0) {
        deleteItem(pcFormId, parseInt(itemId, 16), itemCount);
        mp.set(
          pcFormId,
          "message",
          getMessage({
            type: "message",
            message: `Удалено ${item.name}: ${itemCount}, получено золото ${
              itemCount * item.price
            }.`,
          })
        );
        addItem(pcFormId, 15, itemCount * item.price);
      }
    }
  });
};
const currentProfessionName = "miner";
const sell: boolean = true;
export const init = () => {
  utils.hook(
    "_onCurrentCellChange",
    (pcFormId: number, event: ActivateEvent) => {
      try {
        if (isMine(mp.get(pcFormId, "worldOrCellDesc"))) {
          const myProfession: {
            isActive: boolean;
            name: collectorNames;
            equipment: proffession;
            oldEquipment: [];
          } = mp.get(pcFormId, "activeProfession");

          if (myProfession === null) {
            setProfession(pcFormId, currentProfessionName);
          } else {
            if (!myProfession.isActive) {
              setProfession(pcFormId, currentProfessionName);
            }
          }
        } else {
          const myProfession: {
            isActive: boolean;
            name: collectorNames;
            equipment: proffession;
            oldEquipment: [];
          } = mp.get(pcFormId, "activeProfession");
          if (myProfession.name === currentProfessionName) {
            if (myProfession.isActive) {
              deleteProfession(pcFormId);
              if (sell) {
                setTimeout(() => {
                  sellItems(pcFormId, [{ name: "Железная руда", price: 10 }]);
                }, 2000);
                utils.log("Sell");
              }
            }
          }
        }
      } catch (err) {
        utils.log(err);
      }
    }
  );
};
