import { LocationRefType } from './Classes';
import { Form } from './Form';
import { Keyword } from './Keyword';

export interface Location extends Form {
	from: (form: Form) => Location;
	getKeywordData: (param1: Keyword) => number;
	getRefTypeAliveCount: (param1: LocationRefType) => number;
	getRefTypeDeadCount: (param1: LocationRefType) => number;
	hasCommonParent: (param1: Location, param2: Keyword) => boolean;
	hasRefType: (param1: LocationRefType) => boolean;
	isChild: (param1: Location) => boolean;
	isCleared: () => boolean;
	isLoaded: () => boolean;
	setCleared: (param1: boolean) => void;
	setKeywordData: (param1: Keyword, param2: number) => void;
}
