import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContractModel } from 'src/app/dashboard/common/models/contract-model';
import { ContractService } from 'src/app/dashboard/common/services/contract.service';
import { CalendarService } from 'src/app/dashboard/common/services/calendar.service';

@Component({
	selector: 'app-dashboard-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy {

	public contracts: ContractModel[];
	private _takeUntil$ = new Subject<boolean>();

	constructor(
		private readonly _contractService: ContractService,
		private readonly _calendarService: CalendarService,
		private readonly _changeDetectorRef: ChangeDetectorRef,
		private readonly _router: Router
	) {}

	ngOnInit() {
		this._contractService.getAll(new Date()).subscribe(x => {
			this.contracts = x;
		});

		this._calendarService.date$.pipe(
			takeUntil(this._takeUntil$)
		).subscribe(x => {
			this._contractService.getAll(x).subscribe(data => {
				this.contracts = data;
				this._changeDetectorRef.markForCheck();
			});
		});
	}

	ngOnDestroy() {
		this._takeUntil$.next(true);
	}

	public onSelect($event) {
		this._router.navigate([`/${$event}`]);
	}

}
