import { utils } from '../../utility';
import { CellChangeEvent, MP } from '../../types';
import { professionSystem } from './professionSystem';
import { getWorldOrCellDesc } from '../../properties';
import { locations } from './data';
import type { ProfessionNamesProp, ProfessionProp } from './data';

/** if true sell items */
const IS_SELL = true;
/** current profession name */
const currentProfessionName: ProfessionNamesProp = 'miner';

/**
 * Return true if Actor came to mine location
 * @param name Desc of cell
 */
const isMine = (cellDesc: string): boolean => {
	return locations.mines.find((el) => el.worldId === cellDesc) ? true : false;
};

export const initMinesSystem = () => {
	utils.hook('_onCurrentCellChange', (pcFormId: number, event: CellChangeEvent) => {
		utils.log('[MINES]', event);
		try {
			utils.log('[MINES] WorldOrCellDesc', getWorldOrCellDesc(pcFormId));
			if (isMine(getWorldOrCellDesc(pcFormId))) {
				const myProfession: ProfessionProp = professionSystem.getFromServer(pcFormId);

				if (myProfession === null) {
					professionSystem.set(pcFormId, currentProfessionName);
				} else {
					if (!myProfession.isActive) {
						professionSystem.set(pcFormId, currentProfessionName);
					}
				}
			} else {
				const myProfession: ProfessionProp = professionSystem.getFromServer(pcFormId);
				if (myProfession?.name === currentProfessionName) {
					if (myProfession.isActive) {
						professionSystem.delete(pcFormId, currentProfessionName);
						if (IS_SELL) {
							setTimeout(() => {
								professionSystem.sellItems(pcFormId, [{ name: 'Железная руда', price: 10 }]);
							}, 2000);
							utils.log('Sell');
						}
					}
				}
			}
		} catch (err) {
			utils.log(err);
		}
	});
};
