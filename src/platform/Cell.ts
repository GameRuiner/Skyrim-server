import { ActorBase, Faction } from './Classes';
import { Form } from './Form';
import { ObjectReference } from './ObjectReference';

export interface Cell extends Form {
	from: (form: Form) => Cell;
	getActorOwner: () => ActorBase;
	getFactionOwner: () => Faction;
	getNthRef: (n: number, formTypeFilter: number) => ObjectReference;
	getNumRefs: (formTypeFilter: number) => number;
	getWaterLevel: () => number;
	isAttached: () => boolean;
	isInterior: () => boolean;
	reset: () => void;
	setActorOwner: (akActor: ActorBase) => void;
	setFactionOwner: (akFaction: Faction) => void;
	setFogColor: (
		aiNearRed: number,
		aiNearGreen: number,
		aiNearBlue: number,
		aiFarRed: number,
		aiFarGreen: number,
		aiFarBlue: number
	) => void;
	setFogPlanes: (afNear: number, afFar: number) => void;
	setFogPower: (afPower: number) => void;
	setPublic: (abPublic: boolean) => void;
}
