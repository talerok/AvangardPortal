import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractModel } from '@common/models/contract-model';
import { ContractService } from '@common/services/contract.service';
import { ContractSubStepModel } from '@common/models/contract-sub-step-model';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartData } from '@common/models/chart-data';
import { ContractHepler } from '@common/utils/contract-helper';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit {

	public contract: ContractModel = null;
	public chartData: ChartData = null;

	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _contractService: ContractService,
		private readonly _changeDetectorRef: ChangeDetectorRef
	) { }

	ngOnInit() {
		const id = parseInt(this._activatedRoute.snapshot.paramMap.get('id'), 10);

		this._contractService.getById(id).subscribe(res => {
			this.contract = res;
		});
	}

	public stepSelected(id: number) {
		const data = ContractHepler.getStepChartData(this.contract, id);
		if (!data) {
			return;
		}
		this.chartData = data;
	}

	public subStepSelected(id: number) {
		this.chartData = ContractHepler.getSubStepChartData(this.contract, id);
		this._changeDetectorRef.markForCheck();
	}

}
