import { professionSystem } from '.';
import { CTX } from '../../platform';
import { consoleOutput, getPos } from '../../properties';
import { initInFarmProp } from '../../properties/professions';
import { ActivateEventReturn, ActivateMessageEventReturn, MP } from '../../types';
import { inPoly, utils } from '../../utility';
import { inventorySystem } from '../inventorySystem';
import { MESSAGES, ProfessionNamesProp, ProfessionProp } from './data';

declare const mp: MP;
declare const ctx: CTX;

/** current profession name */
const currentProfessionName: ProfessionNamesProp = 'farmer';
/** barrel with water to fill bucket */
const waterBarrelId = 83991823;
const emptyBucket = 0x12fdf;
const bucketWithWater = 0x5019d13;

const FarmZones = [
	{
		xp: new Array(20688.2421875, 20765.36328125, 21634.35546875, 21673.72265625),
		yp: new Array(-17439.828125, -17003.31640625, -17113.658203125, -17609.171875),
	},
	{
		xp: new Array(22217.359375, 22298.4296875, 22899.06640625, 22722.14453125),
		yp: new Array(-17784.376953125, -17302.755859375, -17377.037109375, -17840.4140625),
	},
];

export const initFarmerSystem = () => {
	initInFarmProp();

	/** set farmer profession */
	utils.hook('_onActivateMessage', (pcFormId: number, event: ActivateMessageEventReturn) => {
		// check if currentprofession message equal msgIF from event
		if (MESSAGES.farmer?.baseId !== event.msgId) return;

		if (event.answer === 0) {
			// if player press 'OK'
			const myProfession: ProfessionProp = professionSystem.getFromServer(pcFormId);
			if (!myProfession?.isActive) {
				professionSystem.set(pcFormId, currentProfessionName);
			}
		} else if (event.answer === 1) {
			// if player press 'NO'
			professionSystem.delete(pcFormId, currentProfessionName, true);
		}
	});

	/** fill bucket with water */
	utils.hook('_onActivate', (pcFormId: number, event: ActivateEventReturn) => {
		if (event.targetBaseId === waterBarrelId) {
			if (inventorySystem.isInInventory(pcFormId, emptyBucket)) {
				inventorySystem.deleteItem(pcFormId, emptyBucket, 1);
				inventorySystem.addItem(pcFormId, bucketWithWater, 1);
			} else {
				consoleOutput.printNote(pcFormId, 'У тебя больше нет пустых ведер!');
			}
		}
	});

	/** check if trigger farm zone */
	utils.hook('_onUpdate2sec', (pcFormId: number) => {
		const currentPos = getPos(pcFormId);
		const isFarm = FarmZones.some((zone) => inPoly(currentPos.x, currentPos.y, zone.xp, zone.yp));
		const currentStateInFarm = mp.get(pcFormId, 'inFarm') ?? false;

		if (isFarm === currentStateInFarm) return;

		mp.set(pcFormId, 'inFarm', isFarm);
		if (isFarm) {
			utils.log('[FARMER] Вы вошли в зону посадки');
			consoleOutput.printNote(pcFormId, 'Вы вошли в зону посадки');
		} else {
			utils.log('[FARMER] Вы покинули зону посадки');
			consoleOutput.printNote(pcFormId, 'Вы покинули зону посадки');
		}
	});

	// utils.hook('_onInput', (pcFormId: number, event: InputEvent) => {
	// 	if (event.name === 'F4') {
	// 		utils.log(mp.get(pcFormId, 'pos'));
	// 	}
	// });
};
