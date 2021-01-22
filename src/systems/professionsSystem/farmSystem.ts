import { utils } from '../../utility';
import { MINERALS } from './data/items/mineral';
import { inventorySystem } from '../../systems';
export const initFarmSystem = () => {
	utils.hook('_onFarm', (pcFormId: number, event: any) => {
		try {
			const mineralFormId = MINERALS.find((mineral) => mineral.sourceName === event.mineralSource);
			if (mineralFormId) {
				setTimeout(() => inventorySystem.addItem(pcFormId, mineralFormId.id, 1), 5000);
			} else {
				utils.log('Mineral notFound', event);
			}
		} catch (e) {
			utils.log('_onFarm', e);
		}
	});
};
