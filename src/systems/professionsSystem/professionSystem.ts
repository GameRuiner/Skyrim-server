import { consoleOutput } from '../../properties';
import { Inventar, MP } from '../../types';
import { utils } from '../../utility';
import { inventorySystem } from '../inventorySystem';
// import { MINERALS } from './data/items';
import { ProfessionNames, Profession, PROFESSIONS, ProfessionStaff, ProfessionStaffNames } from './data/professions';

declare const mp: MP;

/**
 * Delete all items of profession
 * if one of profession staff isn't in inventar profession can't end
 * @param formId id of actor
 * @param professionName name of profession
 */
const deleteProfessionItems = (formId: number, professionName: ProfessionNames): boolean => {
	utils.log('[PROFESSIONS]', 'deleteProfessionItems');

	const currentProfStaff: ProfessionStaff = PROFESSIONS[professionName];

	// profession NOT FOUND
	if (!currentProfStaff) {
		utils.log('[PROFESSIONS]', 'Error: deleteProfessionItems() - Cannot find profession:', professionName);
		return false;
	}

	// if one of the staff return false profession can't end
	const canEndProfession = Object.keys(currentProfStaff).every((key: string) => {
		const staffName: ProfessionStaffNames = key as ProfessionStaffNames;
		const staff = currentProfStaff[staffName];
		if (!staff) return false;
		return inventorySystem.isInInventory(formId, staff);
	});

	if (canEndProfession) {
		Object.keys(currentProfStaff).forEach((key: string) => {
			const staffName: ProfessionStaffNames = key as ProfessionStaffNames;
			const staff = currentProfStaff[staffName];
			if (!staff) return false;
			const isDeletedEvent = inventorySystem.deleteItem(formId, staff, 1);
			if (!isDeletedEvent.success) {
				utils.log('[PROFESSIONS]', isDeletedEvent.message);
			}
		});

		consoleOutput.printNote(formId, 'Ты уволен! Экипировка возвращена.');
		return true;
	} else {
		const messageError = 'Ошибка: игрок не может уволиться, не все предметы могут быть возвращены!';
		consoleOutput.printNote(formId, messageError);
		utils.log('[PROFESSIONS]', messageError);
		return false;
	}
};

/**
 * Add all items of profession
 * @param formId id of actor
 * @param professionName name of profession
 */
const addProfessionItems = (formId: number, name: ProfessionNames): void => {
	utils.log('[PROFESSIONS]', 'addProfessionItems');

	const currentProfStaff = PROFESSIONS[name];

	if (!currentProfStaff) {
		utils.log('[PROFESSIONS]', 'Error: addProfessionItems() -  Cannot find profession:', name);
		return;
	}

	Object.keys(currentProfStaff).forEach((key: string) => {
		const staffName: ProfessionStaffNames = key as ProfessionStaffNames;
		const staff = currentProfStaff[staffName];
		if (!staff) return false;

		inventorySystem.addItem(formId, staff, 1);
	});
};

/**
 * Set profession
 * @param formId actor Id
 * @param professionName name of profession
 */
const setProfession = (formId: number, professionName: ProfessionNames) => {
	utils.log('[PROFESSIONS]', 'setProfession');

	const currentProfessionStaff = PROFESSIONS[professionName];

	addProfessionItems(formId, professionName);

	const oldEquipment = inventorySystem.getAllEquipedItems(formId);

	changeProfessionOnServer(formId, {
		name: professionName,
		equipment: currentProfessionStaff,
		oldEquipment: oldEquipment,
		isActive: true,
	});
};

/**
 * Change active profession of server
 * @param formId actor Id
 * @param profession profession
 */
const changeProfessionOnServer = (formId: number, profession: Profession): void => {
	mp.set(formId, 'activeProfession', profession);
};

/**
 * Get active profession from server
 * @param formId actor Id
 */
const getProfessionFromServer = (formId: number): Profession => {
	return mp.get(formId, 'activeProfession');
};

/**
 * Delete profession
 * @param formId actor Id
 * @param professionName name of profession
 */
const deleteProfession = (formId: number, professionName: ProfessionNames) => {
	utils.log('[PROFESSIONS]', 'deleteProfession');

	const isDeleted = deleteProfessionItems(formId, professionName);

	if (!isDeleted) {
		utils.log('[PROFESSIONS]', 'Error: deleteProfessionItems() - error in deleteItem() ');
	} else {
		const { oldEquipment } = mp.get(formId, 'activeProfession');
		utils.log('[PROFESSIONS]', oldEquipment);

		changeProfessionOnServer(formId, {
			oldEquipment: oldEquipment,
			isActive: false,
		});
	}
};

/**
 * Sell items
 * @param formId actor Id
 * @param items items to sell
 */
const sellItems = (formId: number, items: { name: string; price: number }[]): void => {
	const inv: Inventar = getInventar(formId);

	items.forEach((item) => {
		// TODO: use MINERALS is not correct. Each profession has different items
		const itemId = MINERALS.find((mineral) => mineral.name === item.name)?.id;

		if (itemId !== undefined) {
			const itemCount = inv.entries.find((itemFind) => itemFind.baseId === itemId)?.count;
			if (itemCount && itemCount > 0) {
				inventorySystem.deleteItem(formId, itemId, itemCount);
				const msg = `Удалено ${item.name}: ${itemCount}, получено золото ${itemCount * item.price}.`;
				// consoleOutput.printNote(formId, msg);

				// mp.set(
				// 	pcFormId,
				// 	'message',
				// 	getMessage({
				// 		type: 'message',
				// 		message: `Удалено ${item.name}: ${itemCount}, получено золото ${itemCount * item.price}.`,
				// 	})
				// );

				inventorySystem.addItem(formId, 15, itemCount * item.price);
			}
		}
	});
};

export const professionSystem = {
	set: setProfession,
	setToServer: changeProfessionOnServer,
	getFromServer: getProfessionFromServer,
	delete: deleteProfession,
	deleteItems: deleteProfessionItems,
	addItems: addProfessionItems,
	sellItems: sellItems,
};
