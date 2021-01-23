import { EventName } from '../types/EventName';
import { PropertyName } from '../types/PropertyName';

/* Definition */
interface MakePropertyOptions {
	// If set to false, `updateOwner` would never be invoked
	// Player's client wouldn't see it's own value of this property
	// Reasonable for passwords and other secret values
	isVisibleByOwner: boolean;

	// If set to false, `updateNeighbor` would never be invoked
	// Player's client wouldn't see values of neighbor Actors/ObjectReferences
	isVisibleByNeighbors: boolean;

	// Body of functions that would be invoked on client every update.
	updateOwner: string; // For the PlayerCharacter
	updateNeighbor: string; // For each synchronized Actor/ObjectReference
}

export interface MP {
	makeProperty(propertyName: PropertyName, options: MakePropertyOptions): void;
	makeEventSource(eventName: EventName, functionBody: string): void;
	get(formId: number, propertyName: PropertyName): any;
	set(formId: number, propertyName: PropertyName, newValue: any): void;
	clear(): void;
	[key: string]: (...args: any[]) => void;
}
