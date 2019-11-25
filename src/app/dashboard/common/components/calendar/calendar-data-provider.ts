import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { CalendarHelper } from './calendar-helper';
import { CalendarStep } from './calendar-step';

export class CalendarDataProvider {
	private _visibleDate: Date = null;
	private _step: CalendarStep = CalendarStep.MONTH;

	private _data$ = new BehaviorSubject<Date[][]>([]);

	public data$ = this._data$.asObservable();
	public select$ = new Subject<Date>();

	public set visibleDate(value: Date) {
		this._visibleDate = value ? new Date(value.getTime()) : new Date();
		this._refresh();
	}

	public get visibleDate(): Date {
		return new Date(this._visibleDate.getTime());
	}

	public set step(value: CalendarStep) {
		this._step = value;
		this._refresh();
	}

	public get step(): CalendarStep {
		return this._step;
	}

	private _refresh() {
		switch (this.step) {
			case CalendarStep.MONTH:
				this._data$.next(
					CalendarHelper.getMonth(
						this._visibleDate.getMonth(),
						this._visibleDate.getFullYear()
					)
				);
				break;
			case CalendarStep.YEAR:
				this._data$.next(
					CalendarHelper.getYear(this._visibleDate.getFullYear())
				);
				break;
			case CalendarStep.DECADE:
				this._data$.next(
					CalendarHelper.getDecade(
						CalendarHelper.getDecadeNum(this._visibleDate.getFullYear())
					)
				);
				break;
		}
	}

	public changeAll(date: Date, step: CalendarStep) {
		this._visibleDate = date ? date : new Date();
		this._step = step;
		this._refresh();
	}

	private _moveVisibleDate(coef: number = 1) {
		switch (this.step) {
			case CalendarStep.MONTH:
				this._visibleDate.setMonth(this._visibleDate.getMonth() + 1 * coef);
				this._refresh();
				break;
			case CalendarStep.YEAR:
				this._visibleDate.setFullYear(
					this._visibleDate.getFullYear() + 1 * coef
				);
				this._refresh();
				break;
			case CalendarStep.DECADE:
				this._visibleDate.setFullYear(
					this._visibleDate.getFullYear() + CalendarHelper.decadeOffset * coef
				);
				this._refresh();
				break;
		}
	}

	public next() {
		this._moveVisibleDate();
	}

	public prev() {
		this._moveVisibleDate(-1);
	}

	public changeStep() {
		switch (this.step) {
			case CalendarStep.MONTH:
				this.step = CalendarStep.YEAR;
				break;
			case CalendarStep.YEAR:
				this.step = CalendarStep.DECADE;
				break;
			case CalendarStep.DECADE:
				this.step = CalendarStep.MONTH;
				break;
		}
	}

	public select(date: Date) {
		switch (this.step) {
			case CalendarStep.MONTH:
				this.select$.next(date);
				this.changeAll(date, CalendarStep.MONTH);
				break;
			case CalendarStep.YEAR:
				this.changeAll(date, CalendarStep.MONTH);
				break;
			case CalendarStep.DECADE:
				this.changeAll(date, CalendarStep.YEAR);
				break;
		}
	}

	constructor(
		visibleDate: Date = null,
		step: CalendarStep = CalendarStep.MONTH
	) {
		this.changeAll(visibleDate, step);
	}
}
