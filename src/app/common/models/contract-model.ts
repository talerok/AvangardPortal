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
	type: ContractType;
	num: string;
	itemAmount: number;
	itemName: string;
	period: Date[];

	state: ContractState;
	warnings: string[];
}
