import { utils } from '../../utility';
import { MP } from '../../types';
import { MINERALS } from './data/items/mineral';
import { message, Inventar } from '../../types';
declare const mp: MP;
const getMessage = ({ message, type, baseId }: message): message => {
	return { message, type, baseId };
};
const addItem = (formId: number, baseId: number, count: number): void => {
	if (count <= 0) return;
	const inv: Inventar = mp.get(formId, 'inventory');
	let newInv: Inventar = inv;
	const item = inv.entries.find((item) => item.baseId === baseId);
	if (item) {
		const itemIndex = inv.entries.findIndex((item) => item.baseId === baseId);
		newInv.entries[itemIndex].count += count;
		mp.set(formId, 'inventory', newInv);
		mp.set(formId, 'message', getMessage({ type: 'add', baseId, count }));
	} else {
		newInv.entries.push({
			baseId: baseId,
			count: count,
		});
		mp.set(formId, 'inventory', newInv);
		mp.set(formId, 'message', getMessage({ type: 'add', baseId, count }));
	}
};

export const init = () => {
	utils.hook('_onFarm', (pcFormId: number, event: any) => {
		try {
			const mineralFormId = MINERALS.find((mineral) => mineral.sourceName === event.mineralSource);
			if (mineralFormId) {
				setTimeout(() => addItem(pcFormId, mineralFormId.id, 1), 5000);
			}
		} catch (e) {
			utils.log('_onFarm', e);
		}
	});
};
