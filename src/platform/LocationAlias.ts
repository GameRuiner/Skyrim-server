import { Form } from './Form';
import { Location } from './Location';

export interface LocationAlias {
	from: (form: Form) => LocationAlias;
	clear: () => void;
	forceLocationTo: (param1: Location) => void;
	getLocation: () => Location;
}
