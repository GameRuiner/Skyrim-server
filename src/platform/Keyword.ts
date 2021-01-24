import { Form } from './Form';
import { ObjectReference } from './ObjectReference';

export interface Keyword extends Form {
	from: (form: Form) => Keyword;
	getString: () => string;
	sendStoryEvent: (
		akLoc: Location,
		akRef1: ObjectReference,
		akRef2: ObjectReference,
		aiValue1: number,
		aiValue2: number
	) => void;
	sendStoryEventAndWait: (
		akLoc: Location,
		akRef1: ObjectReference,
		akRef2: ObjectReference,
		aiValue1: number,
		aiValue2: number
	) => Promise<boolean>;
	getKeyword: (key: string) => Keyword;
}
