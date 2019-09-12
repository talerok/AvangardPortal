import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ContractModel, ContractType, ContractState } from '@common/models/contract-model';

@Component({
	selector: 'app-contract-info',
	templateUrl: './contract-info.component.html',
	styleUrls: ['./contract-info.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractInfoComponent implements OnInit {

	@Input() contract: ContractModel;

	constructor() { }

	ngOnInit() {
	}

	public get contractType(): string {
		switch (this.contract.type) {
			case ContractType.GK:
				return 'ГК';
			case ContractType.VTS:
				return 'ВТС';
		}
	}

	public get state(): string {
		switch (this.contract.state) {
			case ContractState.OK:
				return 'ok';
			case ContractState.DANGER:
				return 'danger';
			case ContractState.CRITICAL:
				return 'critical';
		}
	}

	public formatDate(date: Date) {
		return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
	}

}
