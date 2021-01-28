import { CTX } from '../platform';
import { consoleOutput } from '../properties';
import { professionSystem } from '../systems';
import { ProfessionProp } from '../systems/professionsSystem/data';
import { InputEvent } from '../types';
import { getFunctionText, utils } from '../utility';

declare const ctx: CTX;

export const initTest = () => {
	utils.hook('_onInput', (pcFormId: number, event: InputEvent) => {
		if (event.name === 'F7') {
			const myProfession: ProfessionProp = professionSystem.getFromServer(pcFormId);
			if (myProfession?.name) {
				professionSystem.delete(pcFormId, myProfession.name, true);
			}
		}
	});
};
