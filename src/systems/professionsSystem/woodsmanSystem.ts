import { inventorySystem } from '..';
import { ActivateEventReturn, Inventar } from '../../types';
import { utils } from '../../utility';
import { ProfessionProp } from './data';
import collectors from './data/profession/collectors';
import woods from './data/resources/woods';
import { professionSystem } from './professionSystem';

// Woodsman
const currentProfessionName = 'woodsman';
/** object to activate profession */
const activatorIdToGetProf = 240673; // barrel in riverwood
/** object to sell collected item */
const activatorIdToGetSell = 0x1f228; // barrel in riverwood
/** tree id to collect */
const treeIdsToCollect = [0x12dee];
/** id of collect item */
const collectItemId = woods[0].baseId;
/** price of collect item */
const collectItemPrice = woods[0].price;
/** id gold */
const goldId = 0xf;

export const initWoodsmanSystem = () => {
	// TODO: Block activator objects activatorIdToGetProf and activatorIdToGetSell
	utils.hook('_onActivate', (pcFormId: number, event: ActivateEventReturn) => {
		try {
			// get profession
			if (event?.baseId === activatorIdToGetProf) {
				const myProfession: ProfessionProp = professionSystem.getFromServer(pcFormId);
				utils.log('[WOODSMAN]', myProfession);

				if (!myProfession?.isActive) {
					professionSystem.set(pcFormId, currentProfessionName);
					utils.log('[WOODSMAN]', 'profession set');
				} else if (myProfession.name === currentProfessionName) {
					professionSystem.delete(pcFormId, currentProfessionName);
					utils.log('[WOODSMAN]', 'profession delete');
				}
			}

			// sell items
			if (event?.baseId === activatorIdToGetSell) {
				const myProfession: ProfessionProp = professionSystem.getFromServer(pcFormId);
				if (myProfession?.name === currentProfessionName) {
					const inv: Inventar = inventorySystem.get(pcFormId);

					const sellItems = inventorySystem.find(inv, collectItemId);
					if (!sellItems) return;

					const deleteEvent = inventorySystem.deleteItem(pcFormId, collectItemId, sellItems.count);
					if (deleteEvent.success) {
						utils.log('[WOODSMAN]', 'items delete');
						inventorySystem.addItem(pcFormId, goldId, collectItemPrice * sellItems.count);
						utils.log('[WOODSMAN]', 'gold add');
					}
				}
			}
		} catch (err) {
			utils.log(err);
		}
	});

	utils.hook('_onHitStatic', (pcFormId: number, eventData: any) => {
		// get item from hit to tree
		if (treeIdsToCollect.includes(eventData.target)) {
			const myProfession: ProfessionProp = professionSystem.getFromServer(pcFormId);
			if (
				myProfession.name === currentProfessionName &&
				inventorySystem.isEquip(pcFormId, collectors[currentProfessionName].tool)
			) {
				inventorySystem.addItem(pcFormId, collectItemId, 1);
				utils.log('[WOODSMAN]', 'add collect item');
			}
		}
	});
};
