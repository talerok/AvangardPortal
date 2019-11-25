import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ContractModel, ContractType } from '../../models/contract-model';
import { ContractStatus } from '../../models/contract-status-model';

@Component({
	selector: 'app-dashboard-contract-info',
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

	public get status(): string {
		switch (this.contract.status) {
			case ContractStatus.OK:
				return 'ok';
			case ContractStatus.DANGER:
				return 'danger';
			case ContractStatus.CRITICAL:
				return 'critical';
		}
	}

	public formatDate(date: Date) {
		return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
	}

}
