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
	itemName: string;
	itemNumber: number;
	delivery: Date;
	Period: Date[];

	state: ContractState;
	warnings: string[];
}
