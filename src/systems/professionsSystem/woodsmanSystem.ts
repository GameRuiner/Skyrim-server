import { utils } from "@utility/";

declare const mp: MP;

//Woodsman
  //-------------------------------------------------------------------
const currentProfessionName = "woodsman";

export const init = () => {
  utils.hook("_onActivate", (pcFormId: number, event: ActivateEvent) => {
    try {
      if (event.target === 127529) {
        const activeProfession = mp.get(pcFormId, "activeProfession");
        const currentProfession = PROFFESSIONS[currentProfessionName];
        //Проверка сосдали ли мы профессию шахтер
        if (currentProfession) {
          if (!activeProfession) {
            mp.set(pcFormId, "activeProfession", {
              name: currentProfessionName,
              equipment: currentProfession,
            });

            addProfessionItems(pcFormId, currentProfessionName);
          } else {
            if (activeProfession.name === currentProfessionName) {
          const isDeleted = deleteProfessionItems(
                pcFormId,
                currentProfessionName
              );
              if (!isDeleted) {
                utils.log(
                  "Error: deleteProfessionItems() - error in deleteItem() "
                );
              } else {
                mp.set(pcFormId, "activeProfession", null);
              }
            }
          }
        }
      }
    } catch (err) {
      utils.log(err);
    }
  });
  utils.hook('_onHitStatic', (pcFormId: number, eventData: any) => {
    if (eventData.target ===  0x12dee) {
      const activeProfession = mp.get(pcFormId, "activeProfession");
      if (activeProfession != undefined) {
        if (activeProfession.name === currentProfessionName) {
          if (isEquip(pcFormId, 0x2F2F4)) {
            addItem(pcFormId, 457107, 1);
          }
        }
      }
    }
  });

  utils.hook("_onActivate", (pcFormId: number, event: ActivateEvent) => {
    if (event.target === 0x1F228) {
      const activeProfession = mp.get(pcFormId, "activeProfession");
      if (activeProfession != undefined) {
        if (activeProfession.name === currentProfessionName) {
          while (isInInventory(pcFormId, 0x6F993)) {
            const del = deleteItem(pcFormId, 0x6F993, 1);
            utils.log("Удалено полено");
            if (del.success) {
              addItem(pcFormId, 0xF, 10);
            }
          }
          utils.log("success");
        }
      }
    }
  });
  //-------------------------------------------------------------------
};
