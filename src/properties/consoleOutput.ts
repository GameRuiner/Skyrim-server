import { MP } from '../platform';

declare const mp: MP;

const genericPrint = (
	propName: string,
	formId: number,
	...printConsoleArgs: any[]
) => {
	const prev = mp.get(formId, propName);
	const n = prev ? prev.n : 0;
	mp.set(formId, propName, {
		n: n + 1,
		args: printConsoleArgs,
		date: +Date.now(),
	});
};

export type printTargetsPropName = 'consoleOutput' | 'notification';

export const consoleOutput = {
	print: (formId: number, ...args: any[]) =>
		genericPrint('consoleOutput', formId, ...args),
	printNote: (formId: number, ...args: any[]) =>
		genericPrint('notification', formId, ...args),
};

const printTargets = {
	consoleOutput: 'ctx.sp.printConsole(...ctx.value.args)',
	notification: 'ctx.sp.Debug.notification(...ctx.value.args)',
};
const props: printTargetsPropName[] = ['consoleOutput', 'notification'];

export const init = () => {
	for (const propName of props) {
		const updateOwner = () => `
      if (ctx.state.n${propName} === ctx.value.n) return;
      ctx.state.n${propName} = ctx.value.n;
      if (ctx.value.date) {
        if (Math.abs(ctx.value.date - +Date.now()) > 2000) return;
      }
      ${printTargets[propName]}
    `;
		mp.makeProperty(propName, {
			isVisibleByOwner: true,
			isVisibleByNeighbors: false,
			updateNeighbor: '',
			updateOwner: updateOwner(),
		});
	}
};
