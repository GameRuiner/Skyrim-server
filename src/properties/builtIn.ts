import { Appearance, Equipment, Inventar, MP } from '../types';

declare const mp: MP;

/**
 * Return object position in current cell
 * @param formId ID Object
 */
export function getPos(formId: number) {
	const [x, y, z]: number[] = mp.get(formId, 'pos');
	return { x, y, z };
}

/**
 * Return object angle in current cell
 * @param formId ID Object
 */
export function getAngle(formId: number) {
	const [x, y, z]: number[] = mp.get(formId, 'angle');
	return { x, y, z };
}

/**
 * Return current cell description name
 * @param formId ID Object
 */
export function getWorldOrCellDesc(formId: number): string {
	return mp.get(formId, 'worldOrCellDesc');
}

/**
 * Return appearence of actor
 * @param formId ID Object
 */
export function getAppearance(formId: number): Appearance {
	return mp.get(formId, 'appearance');
}

/**
 * Return true if open
 * @param formId ID Object
 */
export function getIsOpen(formId: number): boolean {
	return mp.get(formId, 'isOpen');
}

/**
 * Return true if disabled
 * @param formId ID Object
 */
export function getIsDisabled(formId: number): boolean {
	return mp.get(formId, 'isDisabled');
}

/**
 * Return true if online
 * @param formId ID Object
 */
export function getIsOnline(formId: number): boolean {
	return mp.get(formId, 'isOnline');
}

/**
 * Return type of object
 * @param formId ID Object
 */
export function getType(formId: number): 'MpActor' | 'MpObjectReference' {
	return mp.get(formId, 'type');
}

/**
 * Return base description of object
 * @param formId ID Object
 */
export function getBaseDesc(formId: number): string {
	return mp.get(formId, 'baseDesc');
}

/**
 * Return form description of object
 * @param formId ID Object
 */
export function getFormDesc(formId: number): '0' | '1' | '14:Skyrim.esm' {
	return mp.get(formId, 'formDesc');
}

/**
 * Return inventar of object
 * @param formId ID Object
 */
export function getInventar(formId: number): Inventar {
	return mp.get(formId, 'inventory');
}

/**
 * Return equipment of object
 * @param formId ID Object
 */
export function getEquipment(formId: number): Equipment {
	return mp.get(formId, 'equipment');
}
