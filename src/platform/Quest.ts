import * as skyrimPlatform from './skyrimPlatform';
import { Form } from './Form';

export interface Quest extends Form {
	from: (form: Form) => Quest;
	completeAllObjectives: () => void;
	completeQuest: () => void;
	failAllObjectives: () => void;
	getAlias: (aiAliasID: number) => skyrimPlatform.Alias;
	getAliasById: (aliasId: number) => skyrimPlatform.Alias;
	getAliasByName: (name: string) => skyrimPlatform.Alias;
	getAliases: () => object[];
	getCurrentStageID: () => number;
	getID: () => string;
	getNthAlias: (index: number) => skyrimPlatform.Alias;
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
	updateCurrentInstanceGlobal: (aUpdateGlobal: skyrimPlatform.GlobalVariable) => boolean;
	getQuest: (editorId: string) => Quest;
}
