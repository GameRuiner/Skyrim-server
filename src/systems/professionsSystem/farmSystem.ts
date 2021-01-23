import { utils } from '../../utility';
import { inventorySystem } from '../../systems';
import { ActivateEventReturn, MP } from '../../types';
import { ResourcesTypesProp, allAnimation, resources } from './data';
declare const mp: MP;

/**
 * Add item to inventory with animation.
 * @param formId who should I eqiup the item to
 * @param duration duration animation (default = 5)
 * @param baseId id of item
 * @param animations object with lists: start animations and end animations
 */
const farmItem = (
	formId: number,
	duration: number = 5,
	baseId: number,
	animations:
		| {
				start: string[];
				end: string[];
		  }
		| undefined
) => {
	if (animations) {
		mp.set(formId, 'animation', { animations, duration });
	} else {
		utils.log('farmItem(): animations not found');
	}

	setTimeout(() => inventorySystem.addItem(formId, baseId, 1), duration ? duration * 1000 : 1);
};

export const initFarmSystem = () => {
	utils.hook('_onActivate', (formId: number, event: ActivateEventReturn) => {
		try {
			if (event?.baseId && event?.name) {
				Object.keys(resources).every((key: string) => {
					const resourceType: ResourcesTypesProp = key as ResourcesTypesProp;
					const data = resources[resourceType].find((item) => item.sourceName === event.name);
					if (data) {
						switch (data.type) {
							case 'minerals':
								farmItem(formId, 5, data.baseId, allAnimation.collector.miner);
								break;
							default:
								break;
						}
						return;
					}
				});
			}
		} catch (e) {
			utils.log('_onFarm', e);
		}
	});
};
