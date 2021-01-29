import { MP } from '../types/';
import { CTX } from '../platform/';
import { utils } from '../utility/';

declare const mp: MP;
declare const ctx: CTX;

export const hunting = () => {
	utils.hook('_onHit', (pcFormId: number, event: any) => {
		try {
			utils.log(event);
			utils.log('hi');
		} catch (err) {
			utils.log(err);
			utils.log('error in my script');
		}
	});
};
