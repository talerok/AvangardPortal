import { Component, OnInit } from '@angular/core';
import { ContractService } from '@common/services/contract.service';
import { ContractModel } from '@common/models/contract-model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-main-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

	public contracts: ContractModel[];

	constructor(
		private readonly _contractService: ContractService,
		private readonly _router: Router
	)
	{ }

	ngOnInit() {
		this._contractService.getAll(new Date()).subscribe(x => {
			this.contracts = x;
		});
	}

	public onSelect($event) {
		this._router.navigate([`/${$event}`]);
	}

}
