import { ContractSubStepModel } from './contract-sub-step-model';

export enum ContractType {
	GK,
	VTS
}

export enum ContractState {
	OK,
	DANGER,
	CRITICAL,
}

export interface ContractModel {
	id: number;
	type: ContractType;
	num: string;
	itemAmount: number;
	itemName: string;
	period: Date[];

	state: ContractState;
	warnings: string[];

	steps: ContractSubStepModel[][];
}
