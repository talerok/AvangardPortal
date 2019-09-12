import { Component, OnInit } from '@angular/core';
import { ContractService } from '@common/services/contract.service';
import { ContractModel } from '@common/models/contract-model';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

	public contracts: ContractModel[];

	constructor(private readonly _contractService: ContractService) { }

	ngOnInit() {
		this._contractService.getAll(new Date()).subscribe(x => {
			this.contracts = x;
		});
	}

}
