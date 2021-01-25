import { ExtraData } from './interfaces';

export type PacketType = 'message' | 'disconnect' | 'connectionAccepted' | 'connectionFailed' | 'connectionDenied';
export type BaseExtraList = ExtraData[];
