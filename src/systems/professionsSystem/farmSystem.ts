import { utils } from '../../utility';
import { inventorySystem } from '../../systems';
import { MP } from '../../types';
import { ResourcesTypesProp, allAnimation, resources } from './data';
declare const mp: MP;
export const initFarmSystem = () => {
	utils.hook('_onActivate', (formId: number, target: { name: string; baseId: number }) => {
		try {
			if (target?.baseId && target?.name) {
				Object.keys(resources).every((key: string) => {
					const resourceType: ResourcesTypesProp = key as ResourcesTypesProp;
					const data = resources[resourceType].find((item) => item.sourceName === target.name);
					if (data) {
						let sendEvent = false;
						switch (data.type) {
							case 'minerals':
								mp.set(formId, 'animation', {
									animations: allAnimation.collector.miner,
									duration: 5,
								});
								sendEvent = true;
								break;
							default:
								break;
						}
						sendEvent && setTimeout(() => inventorySystem.addItem(formId, data.baseId, 1), 5000);
					}
				});
			}
		} catch (e) {
			utils.log('_onFarm', e);
		}
	});
};
