import { ContractSubStepModel, ContractStepModel } from './contract-step-model';
import { ContractStatus } from './contract-status-model';

export enum ContractType {
	GK,
	VTS
}

export interface ContractModel {
	uid: string;
	type: ContractType;
	num: string;
	itemAmount: number;
	itemName: string;
	period: Date[];

	status: ContractStatus;
	warnings: string[];
	steps: ContractStepModel[];
}
