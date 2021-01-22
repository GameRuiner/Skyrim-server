import { utils } from '../../utility';
import { CellChangeEvent, MP } from '../../types';
// import { proffessionNames, proffession } from './dataSystems/professions/index';
import { professionSystem } from './professionSystem';
import { getWorldOrCellDesc } from '@properties/builtIn';
import { mines } from '../../mechanics/dataMechanics/locations/mines';
import { ProfessionNames, Profession, PROFESSIONS, ProfessionStaff, ProfessionStaffNames } from './data/professions';

declare const mp: MP;

/** if true sell items */
const IS_SELL = true;
/** current profession name */
const currentProfessionName: ProfessionNames = 'miner';

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
				const myProfession: Profession = professionSystem.getFromServer(pcFormId);

				if (myProfession === null) {
					professionSystem.set(pcFormId, currentProfessionName);
				} else {
					if (!myProfession.isActive) {
						professionSystem.set(pcFormId, currentProfessionName);
					}
				}
			} else {
				const myProfession: Profession = professionSystem.getFromServer(pcFormId);
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
