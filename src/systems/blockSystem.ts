import { genClientFunction } from '../utility';
import { consoleOutput } from '../properties';
import { CTX } from '../platform';

declare const ctx: CTX;

export const blockSystem = {
	/**
	 * Block activation of objects
	 * @param pcFormId actor id
	 * @param formIds object ids to block activation
	 */
	block: (pcFormId: number, formIds: number[]) => {
		consoleOutput.evalClient(
			pcFormId,
			genClientFunction(
				() => {
					formIds.forEach((x) => {
						const form = ctx.sp.Game.getForm(x);
						const obj = ctx.sp.ObjectReference.from(form);
						obj.blockActivation(true);
					});
				},
				'block objects',
				{ formIds }
			)
		);
	},

	/**
	 * UnBlock activation of objects
	 * @param pcFormId actor id
	 * @param formIds object ids to unblock activation
	 */
	unblock: (pcFormId: number, formIds: number[]) => {
		consoleOutput.evalClient(
			pcFormId,
			genClientFunction(
				() => {
					formIds.forEach((x) => {
						const form = ctx.sp.Game.getForm(x);
						const obj = ctx.sp.ObjectReference.from(form);
						obj.blockActivation(false);
					});
				},
				'unblock objects',
				{ formIds }
			)
		);
	},
};
