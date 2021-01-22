export interface CellChangeEvent {
  hasError: boolean;
  err?: string;
  cell?: any;
}
export interface ActivateEvent {
  target: number;
  caster: number;
  isCrimeToActivate: boolean;
}

export type message = {
  message?: string;
  type: "error" | "message" | "add" | "delete";
  baseId?: number;
  count?: number;
};
