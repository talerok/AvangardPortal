import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractModel } from '@common/models/contract-model';
import { ContractService } from '@common/services/contract.service';
import { ContractSubStepModel } from '@common/models/contract-sub-step-model';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit {

	public contract: ContractModel = null;

	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _contractService: ContractService
	) { }

	ngOnInit() {
		const id = parseInt(this._activatedRoute.snapshot.paramMap.get('id'), 10);

		this._contractService.getById(id).subscribe(res => {
			this.contract = res;
		});
	}

}
