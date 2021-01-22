import { utils } from '../../utility';
import { CellChangeEvent, MP } from '../../types';
import { mines } from './dataSystems/locations/mines';
import { proffessionNames, proffession } from './dataSystems/professions/index';
import { professionSystem } from './professionSystem';
import { getWorldOrCellDesc } from '@properties/builtIn';

declare const mp: MP;

/** if true sell items */
const IS_SELL = true;
/** current profession name */
const currentProfessionName: proffessionNames = 'miner';

/**
 * Return true if Actor came to mine location
 * @param name Desc of cell
 */
const isMine = (cellDesc: string): boolean => {
	return mines.find((el) => el.worldId === cellDesc) ? true : false;
};

export const initMinesSystem = () => {
	utils.hook('_onCurrentCellChange', (pcFormId: number, event: CellChangeEvent) => {
		try {
			if (isMine(getWorldOrCellDesc(pcFormId))) {
				const myProfession: proffession = professionSystem.getFromServer(pcFormId);

				if (myProfession === null) {
					professionSystem.set(pcFormId, currentProfessionName);
				} else {
					if (!myProfession.isActive) {
						professionSystem.set(pcFormId, currentProfessionName);
					}
				}
			} else {
				const myProfession: proffession = professionSystem.getFromServer(pcFormId);
				if (myProfession.name === currentProfessionName) {
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
