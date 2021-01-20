import { utils } from '../utility';
import { CTX } from '../platform';
import { consoleOutput } from '../properties';
import { currentActor } from '../constants';
import { CellChangeEvent, MP } from '../types';
import { inventorySystem } from './inventorySystem';

declare const mp: MP;
declare const ctx: CTX;

const simplePickaxe = 0xe3c16;
const cloth = 374433;
const items = [simplePickaxe, cloth];
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
	return mines.some((x) => (cell.name as string).toLowerCase().includes(x)) ||
		cell.id === 91570 // Дом серой гривы
		? true
		: false;
};

export const minesInit = () => {
	utils.hook('_onHit', (pcFormId: number, eventData: any) => {
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
		'_onCurrentCellChange',
		(pcFormId: number, event: CellChangeEvent) => {
			try {
				if (isMine(event.cell)) {
					const invEntry: any[] = mp.get(pcFormId, 'inventory').entries;
					consoleOutput.print(pcFormId, 'Теперь ты шахтер! Работай!');
					items.forEach((itemId) => {
						if (
							invEntry.map((x) => x.baseId).findIndex((x) => x === itemId) ===
							-1
						) {
							inventorySystem.addItem(pcFormId, itemId, 1);
						}
					});
					// не выдает в цикле две вещи сразу
					// пока сделал костыль
					inventorySystem.eqiupItem(pcFormId, items[0]);
					setTimeout(() => {
						inventorySystem.eqiupItem(pcFormId, items[1]);
					}, 1000);
				}
			} catch (err) {
				utils.log(err);
			}
		}
	);
};
