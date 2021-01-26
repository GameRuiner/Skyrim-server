import { utils } from '../../utility';
import { inventorySystem } from '../../systems';
import { ActivateEventReturn, MP } from '../../types';
import { ResourcesTypesProp, allAnimation, resources, ProfessionProp } from './data';
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
	utils.hook('_onActivate', (formId: number, event: ActivateEventReturn) => {
		try {
			if (event?.baseId && event?.name) {
				Object.keys(resources).every((key: string) => {
					const resourceType: ResourcesTypesProp = key as ResourcesTypesProp;
					const data = resources[resourceType].find((item) => item.sourceName === event.name);
					const currentProf: ProfessionProp = mp.get(formId, 'activeProfession');
					if (currentProf) {
						if (data) {
							switch (data.type) {
								case 'minerals':
									const duration = 5;
									currentProf.name === 'miner'
										? farmItem(formId, duration, data.baseId, allAnimation.collector.miner)
										: mp.set(formId, 'message', 'Вы не шахтер!');
									break;
								default:
									break;
							}
							return;
						}
					} else {
						mp.set(formId, 'message', 'У вас нет профессии');
					}
				});
			}
		} catch (e) {
			utils.log('_onFarm', e);
		}
	});
};
