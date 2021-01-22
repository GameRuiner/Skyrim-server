import { getFunctionText, utils } from '../utility/utils';
import { CTX } from '../platform';
import { MP } from '../types';
import { consoleOutput } from '../properties';
import { currentActor, EVENTS_NAME } from '../constants/constants';
import { CellChangeEvent } from '../types/Events';

declare const mp: MP;
declare const ctx: CTX;

const simplePickaxe = 0xe3c16;
const cloth = 374433;
const items = [simplePickaxe, 374433];
interface Inventar {
	baseId: number;
	count: number;
	added?: boolean;
}

/**
 * Определение того, что игрок вошел в шахту
 * TODO: Понять как правильно определить что игрок в шахте
 * @param cell
 */
const isMine = (cell: any): boolean => {
	const mines = ['mine', 'шахта'];
	return mines.some((x) => (cell.name as string).toLowerCase().includes(x)) || cell.id === 91570 ? true : false;
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

const eqiup = (formId: number, baseId: number) => {
	consoleOutput.evalClient(
		formId,
		`	ctx.sp.Game.getPlayer().equipItem(
				ctx.sp.Game.getFormEx(${baseId}),
				false,
				false
			);
		`
	);
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
	utils.hook(EVENTS_NAME.currentCellChange, (pcFormId: number, event: CellChangeEvent) => {
		try {
			if (isMine(event.cell)) {
				const invEntry: any[] = mp.get(pcFormId, 'inventory').entries;
				consoleOutput.print(pcFormId, 'Теперь ты шахтер! Работай!');
				items.forEach((itemId) => {
					if (invEntry.map((x) => x.baseId).findIndex((x) => x === itemId) === -1) {
						addItem(pcFormId, itemId, 1);
					}
				});
				// не выдает в цикле две вещи сразу
				// пока сделал костыль
				eqiup(pcFormId, items[0]);
				setTimeout(() => {
					eqiup(pcFormId, items[1]);
				}, 1000);
			}
		} catch (err) {
			utils.log(err);
		}
	});
};
