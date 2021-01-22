export type proffessionNames = 'miner' | 'herbalist' | 'woodsman';

export type proffession = {
	[name: string]: {
		tool?: number;
		clothes?: number;
		boots?: number;
		helmet?: number;
		gloves?: number;
	};
};
export const PROFFESSIONS: proffession = {
	miner: {
		tool: parseInt('000E3C16', 16),
		clothes: parseInt('00080697', 16),
		boots: parseInt('0001BE1B', 16),
	},
};
