import { AnimationProp } from './animationsProp';

const collectors: AnimationProp = {
	miner: {
		start: ['idleplayer', 'idlepickaxetableenter'],
		end: ['idlepickaxeexit', 'idlepickaxetableexit', 'idlechairexitstart'],
	},
	herbalist: {
		start: [],
		end: [],
	},
	woodsman: {
		start: [],
		end: [],
	},
};

export default collectors;
