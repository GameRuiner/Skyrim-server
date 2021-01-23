import { CTX } from '../platform';
import { message } from '../types/Events';
import { getFunctionText } from '../utility';
import { MP } from '../types';
declare const mp: MP;
declare const ctx: CTX;

function sendMessage() {
	try {
		if (ctx.value !== ctx.state.message) {
			ctx.state.message = ctx.value;
			ctx.sp.printConsole('sendMessage', ctx.value);
			ctx.sp.printConsole('sendMessage', ctx.state.message);
			if (ctx.value) {
				const myMessage: message = ctx.value;
				if (myMessage) {
					if (myMessage.type === 'add') {
						let message = 'Добавлен новый предмет.';
						if (myMessage.baseId) {
							const itemName = ctx.sp.Game.getForm(myMessage.baseId).getName();
							message = `Добавлен новый предмет: ${itemName}.`;
							if (myMessage.count && myMessage.count > 0) {
								message = `Добавлен новый предмет: ${itemName} +${myMessage.count}.`;
							}
						}
						ctx.sp.Debug.notification(message);
					}
					if (myMessage.type === 'delete') {
						let message = 'Предмет удален.';
						if (myMessage.baseId) {
							const itemName = ctx.sp.Game.getForm(myMessage.baseId).getName();
							message = `Предмет удален: ${itemName}.`;
							if (myMessage.count && myMessage.count > 0) {
								message = `Предмет удален: ${itemName} -${myMessage.count}.`;
							}
						}
						ctx.sp.Debug.notification(myMessage.message ?? 'OK!');
					}
					if (myMessage.type === 'message') {
						ctx.sp.Debug.notification(myMessage.message ?? 'OK!');
					}
				} else {
					ctx.sp.Debug.notification(ctx.value);
				}
			}
		}
	} catch (e) {
		ctx.sp.printConsole(e);
	}
}

export const init = () => {
	mp.makeProperty('message', {
		isVisibleByOwner: true,
		isVisibleByNeighbors: false,
		updateOwner: getFunctionText(sendMessage),
		updateNeighbor: '',
	});
};
