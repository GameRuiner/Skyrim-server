import { MP } from './types';

import { utils } from './utility';

import { initCustom } from './custom';
import { initCore } from './core';

declare const mp: MP;

/** core events, don't change it */
initCore();

/** your custom events? place your code here */
initCustom();

utils.hook('onInit', (pcFormId: number) => {
	mp.onReinit(pcFormId);
});

// const getDistance = (a: number[], b: number[]) => {
// 	return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2));
// };

// utils.hook('onUiEvent', (formId: number, msg: Record<string, unknown>) => {
// 	switch (msg.type) {
// 		case 'chatMessage':
// 			const myName = mp.get(formId, 'appearance').name;
// 			const myPos: number[] = mp.get(formId, 'pos');
// 			let neighbors: number[] = mp.get(formId, 'neighbors');
// 			neighbors = neighbors.filter((x) => mp.get(x, 'type') === 'MpActor');
// 			neighbors.forEach((neiFormId) => {
// 				const pos: number[] = mp.get(neiFormId, 'pos');
// 				const distance = getDistance(myPos, pos);
// 				if (distance >= 0 && distance < 1000) {
// 					mp.sendUiMessage(neiFormId, {
// 						pageIndex: msg.pageIndex,
// 						text: msg.text,
// 						name: myName,
// 						tagIndex: 0,
// 						type: 'chatMessage',
// 					});
// 					utils.log('Chat message handled', msg);
// 				}
// 			});
// 			break;
// 	}
// });
