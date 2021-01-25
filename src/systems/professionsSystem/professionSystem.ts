import { consoleOutput, getInventar } from '../../properties';
import { Equipment, Inventar, MP } from '../../types';
import { utils } from '../../utility';
import { inventorySystem } from '../inventorySystem';
import { resources } from './data';
import { professions } from './data';
import type { ProfessionNamesProp, ProfessionProp, ProfessionStaffProp, ProfessionStaffNamesProp } from './data';

declare const mp: MP;

export const professionSystem = {
	/**
	 * Set profession
	 * @param formId actor Id
	 * @param professionName name of profession
	 */
	set: (formId: number, professionName: ProfessionNamesProp) => {
		utils.log('[PROFESSIONS]', 'setProfession');

		const currentProfessionStaff = professions.collectors[professionName];
		utils.log('[PROFESSIONS] currentProfessionStaff', currentProfessionStaff);

		professionSystem.addItems(formId, professionName);

		const oldEquipment = inventorySystem.getAllEquipedItems(formId);

		professionSystem.setToServer(formId, {
			name: professionName,
			equipment: currentProfessionStaff,
			oldEquipment: oldEquipment,
			isActive: true,
		});
	},

	/**
	 * Change active profession of server
	 * @param formId actor Id
	 * @param profession profession
	 */
	setToServer: (formId: number, profession: ProfessionProp | null): void => {
		mp.set(formId, 'activeProfession', profession);
	},

	/**
	 * Get active profession from server
	 * @param formId actor Id
	 */
	getFromServer: (formId: number): ProfessionProp => {
		return mp.get(formId, 'activeProfession');
	},

	/**
	 * Delete profession
	 * @param formId actor Id
	 * @param professionName name of profession
	 * @param force skip check profession items
	 */
	delete: (formId: number, professionName: ProfessionNamesProp, force: boolean = false) => {
		utils.log('[PROFESSIONS]', 'deleteProfession');

		const isDeleted = professionSystem.deleteItems(formId, professionName, force);

		if (!isDeleted) {
			utils.log('[PROFESSIONS]', 'Error: deleteProfessionItems() - error in deleteProfession() ');
			throw '[PROFESSIONS] Error: deleteProfessionItems() - error in deleteProfession()';
		} else {
			const { oldEquipment } = mp.get(formId, 'activeProfession');
			utils.log('[PROFESSIONS] oldEquipment', oldEquipment);

			professionSystem.setToServer(formId, {
				oldEquipment: oldEquipment.inv.entries,
				isActive: false,
			});
		}
		return isDeleted;
	},

	/**
	 * Delete all items of profession
	 * if one of profession staff isn't in inventar profession can't end
	 * @param formId id of actor
	 * @param professionName name of profession
	 * @param force skip check profession items
	 */
	deleteItems: (formId: number, professionName: ProfessionNamesProp, force: boolean = false): boolean => {
		utils.log('[PROFESSIONS]', 'deleteProfessionItems');

		const currentProfStaff: ProfessionStaffProp = professions.collectors[professionName];

		// profession NOT FOUND
		if (!currentProfStaff) {
			utils.log('[PROFESSIONS]', 'Error: deleteProfessionItems() - Cannot find profession:', professionName);
			return false;
		}

		// if one of the staff return false profession can't end
		const canEndProfession = Object.keys(currentProfStaff).every((key: string) => {
			const staffName: ProfessionStaffNamesProp = key as ProfessionStaffNamesProp;
			const staff = currentProfStaff[staffName];
			if (!staff) return false;
			return inventorySystem.isInInventory(formId, staff);
		});

		if (canEndProfession || force) {
			Object.keys(currentProfStaff).forEach((key: string) => {
				const staffName: ProfessionStaffNamesProp = key as ProfessionStaffNamesProp;
				const staff = currentProfStaff[staffName];
				if (!staff) return false;
				const isDeletedEvent = inventorySystem.deleteItem(formId, staff, 1);
				if (!isDeletedEvent.success) {
					utils.log('[PROFESSIONS] isDeletedEvent.message', isDeletedEvent.message);
				}
			});

			consoleOutput.printNote(formId, 'Ты уволен! Экипировка возвращена.');
			return true;
		} else {
			const messageError = 'Ошибка: игрок не может уволиться, не все предметы могут быть возвращены!';
			consoleOutput.printNote(formId, messageError);
			utils.log('[PROFESSIONS] messageError', messageError);
			return false;
		}
	},

	/**
	 * Add all items of profession
	 * @param formId id of actor
	 * @param professionName name of profession
	 */
	addItems: (formId: number, name: ProfessionNamesProp): void => {
		utils.log('[PROFESSIONS]', 'addProfessionItems');

		const currentProfStaff = professions.collectors[name];

		if (!currentProfStaff) {
			utils.log('[PROFESSIONS]', 'Error: addProfessionItems() -  Cannot find profession:', name);
			return;
		}

		Object.keys(currentProfStaff).forEach((key: string) => {
			const staffName: ProfessionStaffNamesProp = key as ProfessionStaffNamesProp;
			const staff = currentProfStaff[staffName];
			if (!staff) return false;

			inventorySystem.addItem(formId, staff, 1);
		});
	},

	/**
	 * Sell items
	 * @param formId actor Id
	 * @param items items to sell
	 */
	sellItems: (formId: number, items: { name: string; price: number }[]): void => {
		const inv: Inventar = getInventar(formId);

		items.forEach((item) => {
			// TODO: use MINERALS is not correct. Each profession has different items
			const itemId = resources.minerals.find((mineral) => mineral.name === item.name)?.baseId;

			if (itemId !== undefined) {
				const itemCount = inv.entries.find((itemFind) => itemFind.baseId === itemId)?.count;
				if (itemCount && itemCount > 0) {
					inventorySystem.deleteItem(formId, itemId, itemCount);
					const msg = `Удалено ${item.name}: ${itemCount}, получено золото ${itemCount * item.price}.`;

					//0xf - gold id
					inventorySystem.addItem(formId, 0xf, itemCount * item.price);
				}
			}
		});
	},
};
