import { CTX } from '../platform';
import { Actor } from '../platform/Actor';
import { ObjectReference } from '../platform/ObjectReference';
import { MP } from '../types';
import { getFunctionText, utils } from '../utility';

declare const mp: MP;
declare const ctx: CTX;

const updateNeighbor = getFunctionText(() => {
	const ac = ctx.sp.Actor.from(ctx.refr as Actor);

	const isDead = ctx.value;
	if (isDead) {
		ac.endDeferredKill();
		ac.kill(null);
	} else {
		ac.startDeferredKill();
	}

	if (!isDead && ac.isDead()) {
		ctx.sp.printConsole(ac.getBaseObject().getFormID());
		ctx.respawn();
	}
}, 'updateNeighbor');

const updateOwner = getFunctionText(() => {
	const ac = ctx.sp.Actor.from(ctx.refr as Actor);

	ac.startDeferredKill();

	const value = ctx.value;
	if (value !== ctx.state.value) {
		const die = !!value;
		if (die) {
			const pos = [ac.getPositionX(), ac.getPositionY(), ac.getPositionZ()];

			// Everyone should stop combat with us
			for (let i = 0; i < 200; ++i) {
				const randomActor = ctx.sp.Game.findRandomActor(pos[0], pos[1], pos[2], 10000);
				if (!randomActor) continue;
				const tgt = randomActor.getCombatTarget();
				if (!tgt || tgt.getFormID() !== 0x14) continue;
				randomActor.stopCombat();
			}

			ac.pushActorAway(ac, 0);
		}

		if (!die) {
			ctx.sp.Debug.sendAnimationEvent(ac, 'GetUpBegin');
		}

		ctx.state.value = value;
	}
}, 'updateOwner');

export const initIsDead = () => {
	mp.makeProperty('isDead', {
		isVisibleByOwner: true,
		isVisibleByNeighbors: true,
		updateNeighbor: updateNeighbor,
		updateOwner: updateOwner,
	});

	utils.hook('onDeath', (pcFormId: number) => {
		utils.log(`${pcFormId.toString(16)} died`);
		mp.set(pcFormId, 'isDead', true);
	});
};
