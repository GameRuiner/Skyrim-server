import { Attr } from '../types/Attr';
import { MP } from '../platform/mp';
declare var mp: MP;

export const init = () => {
	for (const attr of ['health', 'magicka', 'stamina'] as Attr[]) {
		mp.makeEventSource(
			'_onActorValueFlushRequired' + attr,
			`
      const update = () => {
        const attr = "${attr}";
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
      });
    `
		);
	}
};
