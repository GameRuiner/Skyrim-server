import { CTX } from '../platform';
import { consoleOutput, actorValues } from '../properties';
import { getFunctionText, utils } from '../utility';
import { currentActor, PRODUCTION } from '../constants';
import { HitEventReturn, MP } from '../types';
import { HitEvent } from '../platform/Event';

declare const mp: MP;
declare const ctx: CTX;

export const initHitEvent = () => {
	mp.makeEventSource(
		'_onHit',
		getFunctionText(() => {
			ctx.sp.on('hit', (event: any) => {
				const e = event as HitEvent;

				if (!ctx.sp.Actor.from(e.target)) return;
				if (e.source && ctx.sp.Spell.from(e.source)) return;

				const target = ctx.getFormIdInServerFormat(e.target.getFormID());
				const targetBase = e.target.getBaseObject();
				const agressor = ctx.getFormIdInServerFormat(e.agressor.getFormID());

				let keywords = [];
				for (let i = 0; i < targetBase.getNumKeywords(); i++) {
					keywords.push(targetBase.getNthKeyword(i).getFormID());
				}
				const result: HitEventReturn = {
					isPowerAttack: e.isPowerAttack,
					isSneakAttack: e.isSneakAttack,
					isBashAttack: e.isBashAttack,
					isHitBlocked: e.isHitBlocked,
					target: target,
					targetBaseId: targetBase.getFormID(),
					targetKeywords: keywords,
					agressor: agressor,
					source: e.source ? e.source.getFormID() : 0,
				};
				ctx.sendEvent(result);
			});
		}, '_onHit')
	);

	utils.hook('_onHit', (pcFormId: number, eventData: HitEventReturn) => {
		if (eventData.target === currentActor) {
			eventData.target = pcFormId;
		}
		if (eventData.agressor === currentActor) {
			eventData.agressor = pcFormId;
		}
	});

	utils.hook('_onHit', (pcFormId: number, eventData: HitEventReturn) => {
		let damageMod = -25;
		if (!PRODUCTION) {
			// help to kill enemies (godmode)
			damageMod = 0;
			if (eventData.agressor === pcFormId) {
				damageMod = -250;
			}
		}
		const avName = 'health';

		const damage = actorValues.get(eventData.target, avName, 'damage');

		const agressorDead = actorValues.getCurrent(eventData.agressor, 'health') <= 0;
		if (damageMod < 0 && agressorDead) {
			utils.log("Dead characters can't hit");
			return;
		}

		const greenZone = '165a7:Skyrim.esm';
		if (0 && mp.get(eventData.agressor, 'worldOrCellDesc') === greenZone) {
			const msgs = [
				'Вы с удивлением замечаете, что оставили лишь царапину',
				'Вы не верите своим глазам. Боги отвели удар от цели',
				'Вы чувствуете, что Кинарет наблюдает за вашими действиями',
			];
			const i = Math.floor(Math.random() * msgs.length);
			consoleOutput.printNote(pcFormId, msgs[i]);
			damageMod = i === 0 ? -1 : 0;
		}

		const newDamageModValue = damage + damageMod;
		actorValues.set(eventData.target, avName, 'damage', newDamageModValue);

		// if (eventData.agressor === pcFormId) {
		// 	utils.log('[HIT] newDamageModValue', newDamageModValue);
		// }

		const wouldDie = actorValues.getMaximum(eventData.target, 'health') + newDamageModValue <= 0;
		if (wouldDie && !mp.get(eventData.target, 'isDead')) {
			mp.onDeath(eventData.target);
		}
	});
};
