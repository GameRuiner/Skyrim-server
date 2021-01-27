import { utils } from '../../utility';
import { CellChangeEvent, MP } from '../../types';
import { professionSystem } from './professionSystem';
import { getWorldOrCellDesc } from '../../properties';
import { locations } from './data';
import type { ProfessionNamesProp, ProfessionProp } from './data';
declare const mp: MP;

/** if true sell items */
const IS_SELL = true;
/** current profession name */
const currentProfessionName: ProfessionNamesProp = 'miner';

/**
 * Return true if Actor came to mine location
 * @param name Desc of cell
 */
const isMine = (cellName: string): boolean => {
	utils.log('isMine ', cellName);
	return locations.mines.find((el) => el.worldId === cellName) ? true : false;
};
/**
 * Return true if Actor came to mine location
 * @param keywords location keywords
 */
const isMineKeyword = (keywords: number[] = []): boolean => {
	if (!keywords) return false;
	return keywords.includes(0x18ef1);
};

export const initMinesSystem = () => {
	utils.hook('_onCurrentCellChange', (pcFormId: number, event: any) => {
		try {
			utils.log('Cell change');
			if (isMine(mp.get(pcFormId, 'worldOrCellDesc'))) {
				utils.log('[MINES]', event.currentCell);
				const myProfession: ProfessionProp = professionSystem.getFromServer(pcFormId);

				if (!myProfession?.isActive) {
					professionSystem.set(pcFormId, currentProfessionName);
				}
			} else {
				const myProfession: ProfessionProp = professionSystem.getFromServer(pcFormId);
				if (myProfession?.name === currentProfessionName) {
					if (myProfession?.isActive) {
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
