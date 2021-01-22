import { utils } from '../../utility';
import { inventorySystem } from '../../systems';
import { resources } from './data';
import { MP } from '../../types';
declare const mp: MP;
export const initFarmSystem = () => {
	utils.hook('_onActivate', (formId: number, target: { name: string; baseId: number }) => {
		try {
			if (target?.baseId) {
				const objectData = resources.minerals.find((item) => item.sourceName === target.name);
				if (objectData) {
					mp.set(formId, 'animation', {});
					setTimeout(() => inventorySystem.addItem(formId, objectData.baseId, 1), 5000);
				}
			}
		} catch (e) {
			utils.log('_onFarm', e);
		}
	});
};
