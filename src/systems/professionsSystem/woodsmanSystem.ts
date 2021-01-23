import { inventorySystem } from '..';
import { MP } from '../../types';
import { utils } from '../../utility';
import { PROFESSIONS } from './data/professions';
import { professionSystem } from './professionSystem';

declare const mp: MP;

//Woodsman
//-------------------------------------------------------------------
const currentProfessionName = 'woodsman';

export const initWoodsmanSystem = () => {
	utils.hook('_onActivate', (pcFormId: number, event: any) => {
		try {
			if (event.target === 127529) {
				const activeProfession = professionSystem.getFromServer(pcFormId);
				const currentProfessionStaff = PROFESSIONS[currentProfessionName];
				//Проверка сосдали ли мы профессию шахтер
				if (currentProfessionStaff) {
					if (!activeProfession) {
						professionSystem.set(pcFormId, currentProfessionName);
					} else {
						if (activeProfession.name === currentProfessionName) {
							const isDeleted = professionSystem.delete(pcFormId, currentProfessionName);
							if (!isDeleted) {
								utils.log('Error: deleteProfessionItems() - error in deleteItem() ');
							} else {
								mp.set(pcFormId, 'activeProfession', null);
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
		if (eventData.target === 0x12dee) {
			const activeProfession = mp.get(pcFormId, 'activeProfession');
			if (activeProfession != undefined) {
				if (activeProfession.name === currentProfessionName) {
					if (inventorySystem.isEquip(pcFormId, 0x2f2f4)) {
						inventorySystem.addItem(pcFormId, 457107, 1);
					}
				}
			}
		}
	});

	utils.hook('_onActivate', (pcFormId: number, event: any) => {
		if (event.target === 0x1f228) {
			const activeProfession = mp.get(pcFormId, 'activeProfession');
			if (activeProfession != undefined) {
				if (activeProfession.name === currentProfessionName) {
					while (inventorySystem.isInInventory(pcFormId, 0x6f993)) {
						const del = inventorySystem.deleteItem(pcFormId, 0x6f993, 1);
						utils.log('Удалено полено');
						if (del.success) {
							inventorySystem.addItem(pcFormId, 0xf, 10);
						}
					}
					utils.log('success');
				}
			}
		}
	});
	//-------------------------------------------------------------------
};
