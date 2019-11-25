import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { zip, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ContractModel } from 'src/app/dashboard/common/models/contract-model';
import { ContractStepDataModel } from 'src/app/dashboard/common/models/contract-step-data-model';
import { CalendarService } from 'src/app/dashboard/common/services/calendar.service';
import { ContractService } from 'src/app/dashboard/common/services/contract.service';
import { ContractSubStepModel, ContractStepModel } from 'src/app/dashboard/common/models/contract-step-model';

@Component({
	selector: 'app-dashboard-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit, OnDestroy {

	public contract: ContractModel = null;
	public chartData: ContractStepDataModel = null;
	private _takeUntil$ = new Subject<boolean>();

	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _calendarService: CalendarService,
		private readonly _contractService: ContractService,
		private readonly _changeDetectorRef: ChangeDetectorRef
	) { }

	ngOnInit() {
		const uid = this._activatedRoute.snapshot.paramMap.get('id');

		this._calendarService.date$.pipe(
			takeUntil(this._takeUntil$)
		).subscribe(x => {
			this._contractService.getById(uid, x).subscribe(res => {
				this.contract = res;
				this._changeDetectorRef.markForCheck();
			});
		});
	}

	ngOnDestroy() {
		this._takeUntil$.next(true);
	}

	public stepSelected(step: ContractStepModel | ContractSubStepModel) {
		if (Object.keys(step).indexOf('substeps') === -1) {
			this._contractService.getStepData(step.uid, this._calendarService.date$.value).subscribe(x => {
				this.chartData = x;
				this._changeDetectorRef.markForCheck();
			});
		} else {
			this._contractService.getSubStepData(step.uid, this._calendarService.date$.value).subscribe(x => {
				this.chartData = x;
				this._changeDetectorRef.markForCheck();
			});
		}
	}
}
