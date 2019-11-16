import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractModel } from '@common/models/contract-model';
import { ContractService } from '@common/services/contract.service';
import { ContractSubStepModel } from '@common/models/contract-sub-step-model';
import { zip, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ChartData } from '@common/models/chart-data';
import { ContractHepler } from '@common/utils/contract-helper';
import { CalendarService } from '@common/services/calendar.service';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit, OnDestroy {

	public contract: ContractModel = null;
	public chartData: ChartData = null;
	private _takeUntil$ = new Subject<boolean>();

	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _calendarService: CalendarService,
		private readonly _contractService: ContractService,
		private readonly _changeDetectorRef: ChangeDetectorRef
	) { }

	ngOnInit() {
		const id = parseInt(this._activatedRoute.snapshot.paramMap.get('id'), 10);

		this._calendarService.date$.pipe(
			takeUntil(this._takeUntil$)
		).subscribe(x => {
			this._contractService.getById(id, x).subscribe(res => {
				this.contract = res;
				this._changeDetectorRef.markForCheck();
			});
		});
	}

	ngOnDestroy() {
		this._takeUntil$.next(true);
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
