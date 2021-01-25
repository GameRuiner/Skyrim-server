import { Attr, MP, EventName } from '../types';
import { genClientFunction, utils } from '../utility';
import { actorValues } from '../properties';
import { CTX } from '../platform';

declare const mp: MP;
declare const ctx: CTX;

export const initActorValueFlushRequiredEvent = () => {
	for (const attr of ['health', 'magicka', 'stamina'] as Attr[]) {
		mp.makeEventSource(
			('_onActorValueFlushRequired' + attr) as EventName,
			genClientFunction(
				() => {
					const update = () => {
						const percent = ctx.sp.Game.getPlayer().getActorValuePercentage(attr);
						if (ctx.state.percent !== percent) {
							if (ctx.state.percent !== undefined && percent === 1) {
								ctx.sendEvent();
							}
							ctx.state.percent = percent;
						}
					};
					(async () => {
						while (1) {
							await ctx.sp.Utility.wait(0.667);
							update();
						}
					})();
				},
				'_onActorValueFlushRequired',
				{ attr }
			)
		);
	}

	for (const attr of ['health', 'magicka', 'stamina'] as Attr[]) {
		utils.hook(('_onActorValueFlushRequired' + attr) as EventName, (pcFormId: number) => {
			utils.log('[ValueFlushRequired] update');
			actorValues.flushRegen(pcFormId, attr);
		});
	}
};
