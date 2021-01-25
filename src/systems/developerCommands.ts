import { genClientFunction, utils } from '../utility';
import { consoleOutput, actorValues } from '../properties';
import { AttrAll, MP } from '../types';
import { currentActor } from '../constants';
import { spawnSystem } from './spawnSystem';
import { CTX } from '../platform';
import { inventorySystem } from './inventorySystem';

declare const mp: MP;
declare const ctx: CTX;

const chooseFormId = (pcFormId: number, selectedFormId?: number) => {
	return selectedFormId ? selectedFormId : pcFormId;
};

const chooseTip = (pcFormId: number, selectedFormId?: number) => {
	return selectedFormId ? '(selected)' : '(your character)';
};

export const reinit = (pcFormId: number, selectedFormId?: number) => {
	const targetFormId = chooseFormId(pcFormId, selectedFormId);
	const tip = chooseTip(pcFormId, selectedFormId);

	mp.onReinit(targetFormId, { force: true });

	consoleOutput.print(targetFormId, `Reinit ${targetFormId.toString(16)} ${tip}`);
};

const setav = (pcFormId: number, selectedFormId: number, avName: AttrAll, newValueStr: string) => {
	let newValue = parseFloat(newValueStr);
	newValue = isFinite(newValue) ? newValue : 1;

	const targetFormId = chooseFormId(pcFormId, selectedFormId);
	const tip = chooseTip(pcFormId, selectedFormId);
	actorValues.set(targetFormId, avName, 'base', newValue);
	consoleOutput.print(targetFormId, `Set ${avName} to ${newValue} ${tip}`);
};

const kill = (pcFormId: number, selectedFormId: number) => {
	const targetFormId = chooseFormId(pcFormId, selectedFormId);
	const tip = chooseTip(pcFormId, selectedFormId);

	const prev = mp.get(targetFormId, 'isDead');
	mp.set(targetFormId, 'isDead', !prev);

	consoleOutput.print(
		targetFormId,
		'Play visual effects for killing/resurrection',
		`${targetFormId.toString(16)} ${tip}`
	);
};

const spawn = (pcFormId: number, selectedFormId: number) => {
	const targetFormId = chooseFormId(pcFormId, selectedFormId);
	const tip = chooseTip(pcFormId, selectedFormId);

	spawnSystem.spawn(targetFormId);

	consoleOutput.print(targetFormId, `Teleporting to the spawnpoint ${targetFormId.toString(16)} ${tip}`);
};

const spawnpoint = (pcFormId: number, selectedFormId: number) => {
	const targetFormId = chooseFormId(pcFormId, selectedFormId);
	const tip = chooseTip(pcFormId, selectedFormId);

	spawnSystem.updateSpawnPoint(targetFormId);

	consoleOutput.print(targetFormId, `Spawnpoint has been updated for ${targetFormId.toString(16)} ${tip}`);
};

const tp = (pcFormId: number, selectedFormId: number) => {
	const targetFormId = chooseFormId(pcFormId, selectedFormId);
	//const tip = chooseTip(pcFormId, selectedFormId);

	const p = mp.get(targetFormId, 'pos');
	mp.set(pcFormId, 'pos', p);
};

export const initDevCommands = () => {
	utils.hook('_onConsoleCommand', (pcFormId: number, ...args: any[]) => {
		const selectedFormId = args[0] !== currentActor ? args[0] : pcFormId;
		const sub = args[1];
		const arg0 = args[2];
		const arg1 = args[3];
		const arg2 = args[4];
		switch (sub) {
			case 'reinit':
				reinit(pcFormId, selectedFormId);
				break;
			case 'setav':
				setav(pcFormId, selectedFormId, arg0, arg1);
				break;
			case 'kill':
				kill(pcFormId, selectedFormId);
				break;
			case 'spawn':
				spawn(pcFormId, selectedFormId);
				break;
			case 'spawnpoint':
				spawnpoint(pcFormId, selectedFormId);
				break;
			case 'tp':
				tp(pcFormId, 127529);
				break;
			case 'scale':
				const scale = mp.get(pcFormId, 'scale');
				utils.log(scale);
				mp.set(pcFormId, 'scale', scale === 1 ? 2 : 1);
				break;
			case 'msg':
				const pos = mp.get(pcFormId, 'pos');
				break;
			case 'additem':
				if (!arg0) return;
				inventorySystem.addItem(pcFormId, arg0, arg1 ? +arg1 : 1, arg2 ? true : false);
				break;

			default:
				break;
		}
	});
};
