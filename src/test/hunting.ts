import { MP, ActivateEventReturn, ActivateMessageEventReturn, HitEventReturn} from '../types/';
import { CTX } from '../platform/';
import { utils, genClientFunction } from '../utility/';
import { inventorySystem } from '../systems/inventorySystem';
import { consoleOutput} from '../properties';

declare const mp: MP;
declare const ctx: CTX;

const cowBaseId = 0x23A90; const cowHide = 0x3ad8f;
const deerBaseId = 0xCF89D; const deerHide = 0xd284d;
const mudCrabsBaseIds = [0xE4010, 0xE4011, 0xE4011]; //small,large,giant
const mudCrabChitin = 0x6bc00;
const wolfBaseId = 0x23ABE; const wolfPelt = 0x3ad74;
const leatherStrips = 0x800e4;
const huntingTarget = [cowBaseId, deerBaseId, wolfBaseId];
huntingTarget.concat(mudCrabsBaseIds);


export const hunting = () => {
	utils.hook('_onHit', (pcFormId: number, event: HitEventReturn) => {
		try {
			//utils.log('[HUNTING] event', event);
			if (event.targetBaseId !== undefined && 
					huntingTarget.includes(event.targetBaseId) &&
					mp.get(event.target, 'isDead')) {

				consoleOutput.evalClient(
					pcFormId,
					genClientFunction(
						() => {
							ctx.sp.Debug.notification(`Вегетарианство - это хорошо`);
						},
				     	'vegan notification'
						)
				);
				
			} else if (event.targetBaseId == cowBaseId) { 
				inventorySystem.addItem(pcFormId, cowHide);
				inventorySystem.addItem(pcFormId, leatherStrips);
			} else if (event.targetBaseId !== undefined && mudCrabsBaseIds.includes(event.targetBaseId)) {
				inventorySystem.addItem(pcFormId, mudCrabChitin);
				inventorySystem.addItem(pcFormId, leatherStrips);
			} else if (event.targetBaseId == deerBaseId) {
				inventorySystem.addItem(pcFormId, deerHide);
				inventorySystem.addItem(pcFormId, leatherStrips);
			} else if (event.targetBaseId == wolfBaseId) {
				inventorySystem.addItem(pcFormId, wolfPelt);
				inventorySystem.addItem(pcFormId, leatherStrips);
			}
		} catch (err) {
			utils.log(err);
		}
	});
};
