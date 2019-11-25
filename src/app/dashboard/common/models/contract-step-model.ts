import { ContractStatus } from './contract-status-model';

export interface ContractStepModel {
	uid: string;
	name: string;
	status: ContractStatus;
	substeps: ContractSubStepModel[];
}

export interface ContractSubStepModel {
	uid: string;
	name: string;
	status: ContractStatus;
}
