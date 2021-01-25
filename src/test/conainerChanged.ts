import { CTX } from '../platform';
import { getFunctionText, utils } from '../utility';
import { ContainerChangedEventResult, MP } from '../types';
import { inventorySystem } from '../systems';
import { ContainerChangedEvent } from '../platform/Event';

declare const mp: MP;
declare const ctx: CTX;

export const initTestContainerChangeEvent = () => {
	mp.makeEventSource(
		'_onContainerChange',
		getFunctionText(() => {
			ctx.sp.on('containerChanged', (e: any) => {
				const event = e as ContainerChangedEvent;
				const oldId = event.oldContainer?.getFormID();
				const newId = event.newContainer?.getFormID();
				if (oldId !== 0x14 && newId !== 0x14) return;

				const oldContainer = oldId ? ctx.getFormIdInServerFormat(oldId) : null;
				const newContainer = newId ? ctx.getFormIdInServerFormat(newId) : null;
				ctx.sendEvent({
					oldContainer,
					newContainer,
					baseId: event.baseObj.getFormID(),
					count: event.numItems,
					other: event.baseObj.getName(),
				} as ContainerChangedEventResult);
			});
		}, '_onContainerChange')
	);

	utils.hook('_onContainerChange', (pcFormId: number, event: ContainerChangedEventResult) => {
		utils.log('[Container Change]', event);

		if (event.oldContainer === 0x14) {
			inventorySystem.deleteItem(pcFormId, event.baseId, event.count, true);
		}

		// if (event.oldContainer === 0x14 && !event.newContainer) {
		// 	inventorySystem.deleteItem(pcFormId, event.baseId, event.count, true);
		// } else if (!event.oldContainer && event.newContainer === 0x14) {
		// 	inventorySystem.addItem(pcFormId, event.baseId, event.count, true);
		// }

		// if (event.oldContainer === 0x14 && !event.newContainer) {
		// 	inventorySystem.deleteItem(pcFormId, event.baseId, event.count, true);
		// } else if (!event.oldContainer && event.newContainer === 0x14) {
		// 	inventorySystem.addItem(pcFormId, event.baseId, event.count, true);
		// } else if (event.newContainer === 0x14) {
		// 	inventorySystem.addItem(pcFormId, event.baseId, event.count, true);
		// 	//inventorySystem.deleteItem(event.oldContainer, event.baseId, event.count, true);
		// } else {
		// 	// inventorySystem.addItem(event.oldContainer, event.baseId, event.count, true);
		// 	inventorySystem.deleteItem(pcFormId, event.baseId, event.count, true);
		// }
	});
};
