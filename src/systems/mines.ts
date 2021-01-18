import { utils } from '../utility/utils';
import { MP } from '../platform';
import { consoleOutput } from '../properties';
import { currentActor, EVENTS_NAME } from '../constants/constants';
import { CellChangeEvent } from '../types/Events';

declare const mp: MP;

const simplePickaxe = 0xe3c16;
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
	utils.hook(EVENTS_NAME.hit, (pcFormId: number, eventData: any) => {
		try {
			if (eventData.agressor === pcFormId) {
				consoleOutput.printNote(pcFormId, 'Эй, не стукай!');
				utils.log(currentActor);
			}
		} catch (err) {
			utils.log(err);
		}
	});
	utils.hook(
		EVENTS_NAME.currentCellChange,
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
					consoleOutput.print(pcFormId, 'Теперь ты шахтер! Работай!');
				}
			} catch (err) {
				utils.log(err);
			}
		}
	);
};
