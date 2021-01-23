import { ObjectReference } from '../platform/ObjectReference';

export interface CellChangeEvent {
	hasError: boolean;
	err?: string;
	currentCell?: any;
	prevCell?: any;
}
export interface ActivateEvent {
	target: ObjectReference;
	caster: ObjectReference;
	isCrimeToActivate: boolean;
}
export interface ActivateEventReturn {
	baseId: number;
	name: string;
	target: ObjectReference;
	caster: ObjectReference;
	isCrimeToActivate: boolean;
}

export type message = {
	message?: string;
	type: 'error' | 'message' | 'add' | 'delete';
	baseId?: number;
	count?: number;
};
