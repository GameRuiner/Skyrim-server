import { utils } from '../utility/utils';
import { MP } from '../platform';
import { CellChangeEvent } from 'types/Events';
declare const mp: MP;

const simplePickaxe = 0xE3C16;
const items = [
	simplePickaxe,
	0xaccd1,
	0xb974f,
	0x7a14e,
	0x7a132,
	0x10df21,
	0x100e3b,
	0xb505c,
	0xb50c1,
];
interface Inventar {
	baseId: number;
	count: number;
	added?: boolean;
}

/**
 * Определение того, что игрок вошел в шахту
 * пока костыльно по ИД 91570 (Дом Серой Гривы)
 * TODO: Понять как правильно определить что игрок в шахте
 * @param formId
 */
const isMine = (formId: number): boolean => {
	return formId === 91570 ? true : false;
};

const addItem = (formId: number, baseId: number, count: number) => {
	if (count <= 0) return;

	const inv = mp.get(formId, 'inventory');
	let added = false;
	for (const value of inv) {
		if (Object.keys(value).length == 2 && value.baseId == baseId) {
			value.count += count;
			added = true;
			break;
		}
	}
	if (!added) {
		inv.entries.push({ baseId, count });
	}
	mp.set(formId, 'inventory', inv);
};

export const init = () => {
	// utils.hook('_onHit', (pcFormId: number, eventData: any) => {
	// 	try {
	// 		if (eventData.agressor === pcFormId) {
	// 			utils.log('[mines _onHit]', eventData.agressor);
	// 			utils.log('[mines]', mp.get(pcFormId, 'inventory').entries);
	// 			const invEntry: any[] = mp.get(pcFormId, 'inventory').entries;
	// 			items.forEach((item) => {
	// 				if (
	// 					invEntry.map((x) => x.baseId).findIndex((x) => x === item) === -1
	// 				) {
	// 					addItem(pcFormId, item, 1);
	// 				}
	// 			});
	// 		}
	// 	} catch (err) {
	// 		utils.log(err);
	// 	}
	// });
	utils.hook(
		'_onCurrentCellChange',
		(pcFormId: number, event: CellChangeEvent) => {
			try {
				if (isMine(event.cell.id)) {
					const invEntry: any[] = mp.get(pcFormId, 'inventory').entries;
					items.forEach((item) => {
						if (
							invEntry.map((x) => x.baseId).findIndex((x) => x === item) === -1
						) {
							addItem(pcFormId, item, 1);
						}
					});
				}
			} catch (err) {
				utils.log(err);
			}
		}
	);
};
