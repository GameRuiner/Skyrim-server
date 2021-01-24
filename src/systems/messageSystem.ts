import { MP } from '../types';
import { utils } from '../utility';

declare const mp: MP;

export const messageSystem = {
	/**
	 * Show
	 * @param formId Actor Id
	 * @param msgFormId message form id
	 */
	show: (formId: number, msgFormId: number) => {
		mp.set(formId, 'messageIdToShow', msgFormId);
		utils.log('[MESSAGE] set', msgFormId);
		utils.log('[MESSAGE] get', mp.get(formId, 'messageIdToShow'));
	},
};
