import { createContext } from 'vm';
import { MP } from '../types';
import { EventName } from '../types/EventName';

declare const mp: MP;
declare const global: any;

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
				var prevRes = prev ? prev(...args) : undefined;
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
export const getFunctionText = (func: Function, functionName?: string): string => {
	let funcString = func
		.toString()
		.substring(0, func.toString().length - 1)
		.replace(new RegExp('^.+?{', 'm'), '')
		.trim();

	// add try catch
	const date = new Date(Date.now());
	const m = date.getMinutes();
	const s = date.getSeconds();
	const ms = date.getMilliseconds();
	funcString = `
	try {
		${funcString}
	} catch(err) {
		ctx.sp.printConsole('${m}:${s}:${ms} [ERROR getFunctionText] (${functionName})', err);
	}
	`;

	return funcString;
};

/**
 * generate function for client
 * @param func generated function
 * @param args params
 */
export const genClientFunction = (func: Function, functionName?: string, args?: any, log: boolean = false) => {
	let result = getFunctionText(func, functionName);

	if (log) {
		result = Array(10).fill('/').join('') + 'end params' + Array(10).fill('/').join('') + '\n' + result;
	}
	for (let name in args) {
		switch (typeof args[name]) {
			case 'number':
				result = `const ${name} = ${args[name]};\n` + result;
				break;
			case 'string':
				result = `const ${name} = '${args[name]}';\n` + result;
				break;
			case 'boolean':
				result = `const ${name} = ${args[name]};\n` + result;
				break;
			case 'object':
				if (Array.isArray(args[name])) {
					result = `const ${name} = [${args[name]}];\n` + result;
				}
				break;
		}
	}
	if (log) {
		result = Array(10).fill('/').join('') + 'params' + Array(10).fill('/').join('') + '\n' + result;
	}
	if (log) {
		utils.log('[DEBUG] Generated function\n', result);
	}
	return result;
};

export const initUtils = () => {
	utils.log('Gamemode init');
	if (!Array.isArray(global.knownEvents)) {
		global.knownEvents = [];
	}
	for (const eventName of global.knownEvents) {
		delete mp[eventName];
	}
};

/**
 * Check if point in polygon
 * @param x x coordinate of point
 * @param y y coordinate of point
 * @param xp all x coordinate of polygon
 * @param yp all y coordinate of polygon
 */
let cacheInPoly: { [key: string]: boolean } = {};
export const inPoly = (x: number, y: number, xp: number[], yp: number[]) => {
	const index = x.toString() + y.toString() + xp.join('') + yp.join('');
	if (cacheInPoly[index]) {
		return cacheInPoly[index];
	}
	let npol = xp.length;
	let j = npol - 1;
	let c = false;
	for (let i = 0; i < npol; i++) {
		if (
			((yp[i] <= y && y < yp[j]) || (yp[j] <= y && y < yp[i])) &&
			x > ((xp[j] - xp[i]) * (y - yp[i])) / (yp[j] - yp[i]) + xp[i]
		) {
			c = !c;
		}
		j = i;
	}
	cacheInPoly[index] = c;
	return c;
};
