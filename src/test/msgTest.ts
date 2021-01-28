import { CTX } from '../platform';
import { InputEvent } from '../types';
import { getFunctionText, utils } from '../utility';

declare const ctx: CTX;

const farmMessageId = 0x500fb0b;

export const initTestMsg = () => {
	// utils.hook('_onInput', (pcFormId: number, event: InputEvent) => {
	// 	if (event.name === 'F7') {
	// 		utils.log('[TEST MESSAGE]');
	// 		//messageSystem.show(pcFormId, farmMessageId);
	// 	}
	// });
};
