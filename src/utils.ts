declare var global: any;
declare var mp: any;

export const utils = {
	log: (...args: any) => {
		console.log.call(console, '[GM]', ...args);
	},
	isActor: (formId: number) => {
		return mp.get(formId, 'type') === 'MpActor';
	},
	hook: (eventName: string, callback: (...args: any[]) => void) => {
		if (!global.knownEvents.includes(eventName)) {
			global.knownEvents.push(eventName);
		}
		const prev = mp[eventName];
		mp[eventName] = (...args: any) => {
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

export const init = () => {
	utils.log('Gamemode init');
	if (!Array.isArray(global.knownEvents)) {
		global.knownEvents = [];
	}
	for (const eventName of global.knownEvents) {
		delete mp[eventName];
	}
};
