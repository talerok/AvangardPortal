import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	OnDestroy,
	ChangeDetectorRef,
	Input,
	forwardRef
} from '@angular/core';
import { CalendarDataProvider } from '../calendar-data-provider';
import { CalendarLocal } from '../calendar-local';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { CalendarHelper } from '../calendar-helper';
import { CalendarStep } from '../calendar-step';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
	selector: 'app-dashboard-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CalendarComponent),
			multi: true
		}
	]
})
export class CalendarComponent implements ControlValueAccessor, OnInit, OnDestroy {
	private readonly _takeUntil$ = new Subject<boolean>();
	private readonly _touched$ = new Subject<any>();

	public readonly dataProvider: CalendarDataProvider = new CalendarDataProvider();
	public readonly local: CalendarLocal = new CalendarLocal();

	private _selected: Date = null;

	private _today = new Date();

	@Input() secondValue: Date = null;

	@Input() disabled = false;

	@Input() customCellClassFn: (cell: Date, step: CalendarStep) => string[];

	@Input() disableCellFn: (cell: Date, step: CalendarStep) => boolean;

	private _touchFn = () => {};
	private _changeFn = (value: Date) => {};

	ngOnInit() {
		this.dataProvider.select$.pipe(takeUntil(this._takeUntil$)).subscribe(x => {
			if (!this.disabled) {
				this._selected = new Date(x.getTime());
				this._changeFn(new Date(x.getTime()));
			}
		});

		this._touched$
			.pipe(
				takeUntil(this._takeUntil$),
				take(1)
			)
			.subscribe(() => this._touchFn());
	}

	ngOnDestroy() {
		this._takeUntil$.next(true);
	}

	public nextClick() {
		this.dataProvider.next();
	}

	public prevClick() {
		this.dataProvider.prev();
	}

	public changeStep() {
		this.dataProvider.changeStep();
	}

	private _checkDisable(cell: Date) {
		return (
			this.disableCellFn && this.disableCellFn(cell, this.dataProvider.step)
		);
	}

	public select(cell: Date) {
		if (this._checkDisable(cell)) {
			return;
		}

		this.dataProvider.select(cell);
	}

	public getStr(cell: Date) {
		return this.local.getStr(cell, this.dataProvider.step);
	}

	public getClasses(cell: Date) {
		const res = [];
		if (this._selected) {
			const selectedComp = CalendarHelper.compareDates(
				this._selected,
				cell,
				this.dataProvider.step
			);

			if (selectedComp === 0) {
				res.push('selected');
			} else if (this.secondValue) {
				const secondValueComp = CalendarHelper.compareDates(
					this.secondValue,
					cell,
					this.dataProvider.step
				);

				if (secondValueComp === 0) {
					res.push('selected');
				} else if (selectedComp === -1 && secondValueComp === 1) {
					res.push('in-range');
				} else if (selectedComp === 1 && secondValueComp === -1) {
					res.push('in-range');
				}
			}
		}

		if (
			CalendarHelper.compareDates(this._today, cell, this.dataProvider.step) ===
			0
		) {
			res.push('today');
		}

		if (this._checkDisable(cell)) {
			res.push('disabled');
		}

		const customClasses = this.customCellClassFn
			? this.customCellClassFn(cell, this.dataProvider.step)
			: null;
		if (customClasses) {
			res.push.apply(res, customClasses);
		}

		return res;
	}

	constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

	public get Info(): string {
		return this.local.getInfo(
			this.dataProvider.visibleDate,
			this.dataProvider.step
		);
	}

	public writeValue(obj: any): void {
		this._selected = obj;
		this.dataProvider.visibleDate = obj;
		this._changeDetectorRef.markForCheck();
	}

	public registerOnChange(fn: any): void {
		this._changeFn = fn;
	}

	public registerOnTouched(fn: any): void {
		this._touchFn = fn;
	}

	public setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
		this._changeDetectorRef.markForCheck();
	}

	public onTouch() {
		this._touched$.next();
	}
}
