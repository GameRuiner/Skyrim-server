import minify from 'string-minify';
import { MP, EventName } from '../types';

////////////////////////////////////////////////
declare const mp: MP;
declare const global: any;
////////////////////////////////////////////////

/**
 * UTILITIES
 */
export const utils = {
	/**
	 * print text in server side
	 * @param args arguments
	 */
	log: (...args: any) => {
		console.log.call(console, '[GM]', ...args);
	},
	/**
	 * return true if object is Actor
	 * @param formId unique identifier
	 */
	isActor: (formId: number) => {
		return mp.get(formId, 'type') === 'MpActor';
	},
	/**
	 * executing a function on the server side
	 * when an event is triggered on the client side
	 * @param eventName name of event
	 * @param callback function
	 */
	hook: (eventName: EventName, callback: (...args: any[]) => void) => {
		if (!global.knownEvents.includes(eventName)) {
			global.knownEvents.push(eventName);
		}
		const prev = mp[eventName];
		mp[eventName] = (...args: any[]) => {
			try {
				const prevRes = prev ? prev(...args) : undefined;
				const callbackRes = callback(...args);
				return callbackRes !== undefined ? callbackRes : prevRes;
			} catch (e) {
				utils.log(`'${eventName}' threw an error: ${e}`);
				if (e['stack']) {
					utils.log(e['stack']);
				}
				return undefined;
			}
		};
	},
};

/**
 * return function text as text
 * @param func source function
 */
export const getFunctionText = (func: Function): string => {
	return minify(func.toString())
		.replace(new RegExp('^.+?{', 'm'), '')
		.replace(new RegExp('[}]$', 'm'), '')
		.trim();
};

/**
 * generate function for client
 * @param func generated function
 * @param args params
 */
export const genClientFunction = (func: Function, args?: any) => {
	let result = getFunctionText(func);
	for (let name in args) {
		result = `const ${name} = ${args[name]};` + result;
	}
	return result;
};
