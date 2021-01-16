import { Actor } from './skyrimPlatform';
import { SkyrimPlatform } from './skyrimPlatformInterface';

export interface CTX {
	sp: SkyrimPlatform;
	refr: Actor;
	value: any;
	state: { [key: string]: any };
	get: (propertyName: string) => any;
	getFormIdInServerFormat: (formId: number) => number;
	getFormIdInClientFormat: (formId: number) => number;
	respawn: () => void;
	sendEvent: (...args: any) => void;
}
