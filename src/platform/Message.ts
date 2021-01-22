import { Form } from './Form';

export interface Message {
	from: (form: Form) => Message;
	show: (
		param1: number,
		param2: number,
		param3: number,
		param4: number,
		param5: number,
		param6: number,
		param7: number,
		param8: number,
		param9: number
	) => Promise<number>;
	showAsHelpMessage: (param1: string, param2: number, param3: number, param4: number) => void;
	resetHelpMessage: (param1: string) => void;
}
