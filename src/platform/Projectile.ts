import { Form } from './Form';

export interface Projectile extends Form {
	from: (form: Form) => Projectile;
}
