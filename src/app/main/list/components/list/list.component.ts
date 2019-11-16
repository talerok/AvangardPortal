import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ContractService } from '@common/services/contract.service';
import { ContractModel } from '@common/models/contract-model';
import { Router } from '@angular/router';
import { CalendarService } from '@common/services/calendar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-main-list',
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
