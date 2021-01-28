import { SoundDescriptor } from './Classes';
import { Form } from './Form';
import { ObjectReference } from './ObjectReference';

export interface Sound {
	from: (form: Form) => Sound;
	getDescriptor: () => SoundDescriptor;
	play: (akSource: ObjectReference) => number;
	playAndWait: (akSource: ObjectReference) => Promise<boolean>;
	setInstanceVolume: (aiPlaybackInstance: number, afVolume: number) => void;
	stopInstance: (aiPlaybackInstance: number) => void;
}
