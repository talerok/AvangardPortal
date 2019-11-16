import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CalendarService } from '@common/services/calendar.service';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-header-calendar',
  templateUrl: './header-calendar.component.html',
  styleUrls: ['./header-calendar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderCalendarComponent implements ControlValueAccessor, OnInit, OnDestroy {

	public value: Date = new Date();
	private _takeUntil$ = new Subject<boolean>();
	private _changeFn = (value: Date) => {};
	private _touchFn = () => {};

  	constructor(
		private readonly _changeDetectorRef: ChangeDetectorRef,
		private readonly _calendarService: CalendarService
	) { }

 	ngOnInit() {
		this._calendarService.date$.pipe(
			takeUntil(this._takeUntil$)
		).subscribe(x => {
			this.value = x;
			this._changeDetectorRef.markForCheck();
		});
  	}

	ngOnDestroy() {
		this._takeUntil$.next(true);
	}

	public valueChange(value: Date) {
		this._calendarService.date$.next(value);
	}

  	public writeValue(obj: any): void {
		this.value = obj;
		this._changeDetectorRef.markForCheck();
	}

	public registerOnChange(fn: any): void {
		this._changeFn = fn;
	}

	public registerOnTouched(fn: any): void {
		this._touchFn = fn;
	}
}
