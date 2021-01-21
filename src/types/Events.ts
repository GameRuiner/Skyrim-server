export interface CellChangeEvent {
	hasError: boolean;
	err?: string;
	currentCell?: any;
	prevCell?: any;
}
