import { Form } from './Form';
import { Alias, GlobalVariable } from './Classes';

export interface Quest extends Form {
	from: (form: Form) => Quest;
	completeAllObjectives: () => void;
	completeQuest: () => void;
	failAllObjectives: () => void;
	getAlias: (aiAliasID: number) => Alias;
	getAliasById: (aliasId: number) => Alias;
	getAliasByName: (name: string) => Alias;
	getAliases: () => object[];
	getCurrentStageID: () => number;
	getID: () => string;
	getNthAlias: (index: number) => Alias;
	getNumAliases: () => number;
	getPriority: () => number;
	isActive: () => boolean;
	isCompleted: () => boolean;
	isObjectiveCompleted: (aiObjective: number) => boolean;
	isObjectiveDisplayed: (aiObjective: number) => boolean;
	isObjectiveFailed: (aiObjective: number) => boolean;
	isRunning: () => boolean;
	isStageDone: (aiStage: number) => boolean;
	isStarting: () => boolean;
	isStopped: () => boolean;
	isStopping: () => boolean;
	reset: () => void;
	setActive: (abActive: boolean) => void;
	setCurrentStageID: (aiStageID: number) => Promise<boolean>;
	setObjectiveCompleted: (aiObjective: number, abCompleted: boolean) => void;
	setObjectiveDisplayed: (aiObjective: number, abDisplayed: boolean, abForce: boolean) => void;
	setObjectiveFailed: (aiObjective: number, abFailed: boolean) => void;
	start: () => Promise<boolean>;
	stop: () => void;
	updateCurrentInstanceGlobal: (aUpdateGlobal: GlobalVariable) => boolean;
	getQuest: (editorId: string) => Quest;
}
