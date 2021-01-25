import { ObjectReference } from '../platform/ObjectReference';

export interface CellChangeEvent {
	hasError: boolean;
	err?: string;
	currentCell?: CellChangeItem;
	prevCell?: CellChangeItem;
}
export interface CellChangeItem {
	id: number;
	name: string;
	type: number;
	keywords?: number[];
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

export interface ActivateMessageEventReturn {
	msgId: number;
	answer: number;
}

export interface InputEvent {
	name: string;
	code: number;
}

export interface ContainerChangedEventResult {
	oldContainer: number;
	newContainer: number;
	baseId: number;
	count: number;
	other: any;
}

export type message = {
	message?: string;
	type: 'error' | 'message' | 'add' | 'delete';
	baseId?: number;
	count?: number;
};
