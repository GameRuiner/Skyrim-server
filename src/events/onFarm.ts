import { CTX, MP } from '../platform';
import { ObjectReference } from '../platform/skyrimPlatform';
import { getFunctionText, utils } from '../utility';

declare const mp: MP;
declare const ctx: CTX;

export const initFarmEvent = () => {
	mp.makeEventSource(
		'_onFarm',
		getFunctionText(() => {
			ctx.sp.on('activate', (e: any) => {
				try {
					// if (!ctx.sp.Actor.from(e.target)) return;
					if (e.source && ctx.sp.Spell.from(e.source)) return;
					const target = ctx.getFormIdInServerFormat(e.target.getFormId());
					const data: ObjectReference = e.target;
					const objectName = data.getBaseObject().getName();

					const sendAnimation = (name: string) => {
						ctx.sp.Debug.sendAnimationEvent(ctx.sp.Game.getPlayer(), name);
					};

					if (objectName === 'Железорудная жила' && !ctx.state.startAnimation) {
						ctx.state.startAnimation = true;
						ctx.sp.printConsole(ctx.state.startAnimation);
						sendAnimation('idleplayer');
						sendAnimation('idlepickaxetableenter');
						ctx.sp.Utility.wait(5).then(() => {
							sendAnimation('idlepickaxeexit');
							sendAnimation('idlepickaxetableexit');
							sendAnimation('idlechairexitstart');
							ctx.state.startAnimation = false;
							ctx.sp.printConsole(ctx.state.startAnimation);
						});
					}
					ctx.sendEvent({ target, mineralSource: objectName });
				} catch (e) {
					ctx.sp.printConsole('Catch _onFarm', e);
				}
			});
		})
	);
};
