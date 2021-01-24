import { professionSystem } from '.';
import { ActivateMessageEventReturn } from '../../types';
import { utils } from '../../utility';
import { MESSAGES, ProfessionNamesProp, ProfessionProp } from './data';

/** current profession name */
const currentProfessionName: ProfessionNamesProp = 'farmer';

export const initFarmerSystem = () => {
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
};
