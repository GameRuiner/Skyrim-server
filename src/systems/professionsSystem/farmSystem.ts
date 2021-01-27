import { getFunctionText, utils } from '../../utility';
import { inventorySystem } from '../../systems';
import { ActivateEventReturn, MP } from '../../types';
import { ResourcesTypesProp, allAnimation, resources, ProfessionProp } from './data';
import { professionSystem } from './professionSystem';
import { consoleOutput } from '../../properties';
import { CTX } from '../../platform';

declare const mp: MP;
declare const ctx: CTX;

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
		const currentAnimation = mp.get(formId, 'animation');

		if (!currentAnimation) {
			mp.set(formId, 'animation', { animations, duration });
			setTimeout(() => {
				inventorySystem.addItem(formId, baseId, 1);
				mp.set(formId, 'animation', null);
			}, duration * 1000);
		}
	} else {
		utils.log('farmItem(): animations not found');
		inventorySystem.addItem(formId, baseId, 1);
	}
};

export const initFarmSystem = () => {
	utils.hook('_onActivate', (pcFormId: number, event: ActivateEventReturn) => {
		try {
			if (event?.baseId && event?.name) {
				Object.keys(resources).every((key: string) => {
					const resourceType: ResourcesTypesProp = key as ResourcesTypesProp;
					const data = resources[resourceType].find((item) => item.sourceName === event.name);
					const currentProf: ProfessionProp = professionSystem.getFromServer(pcFormId);
					if (data && currentProf) {
						switch (data.type) {
							case 'minerals':
								const duration = 5;
								currentProf.name === 'miner'
									? farmItem(pcFormId, duration, data.baseId, allAnimation.collector.miner)
									: mp.set(pcFormId, 'message', 'Вы не шахтер!');

								break;
							default:
								break;
						}
					} else {
						mp.set(pcFormId, 'message', 'У вас нет профессии');
					}
				});
			}
		} catch (e) {
			utils.log('_onFarm', e);
		}
	});
};
