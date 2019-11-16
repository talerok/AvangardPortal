import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';

@Injectable()
export class CalendarService {
	private readonly _localStorageKey = 'dashboard-date';

	private get _storageDate(): number {
		const res = localStorage.getItem(this._localStorageKey);
		return res ? Number(res) : null;
	}

	private set _storageDate(val: number) {
		localStorage.setItem(this._localStorageKey, String(val));
	}

	public date$: BehaviorSubject<Date>;

	constructor() {
		let curDate = this._storageDate;
		if (!curDate) {
			curDate = new Date().getTime();
			this._storageDate = curDate;
		}

		this.date$ = new BehaviorSubject<Date>(new Date(curDate));
		this.date$.pipe(
			skip(1)
		).subscribe(x => {
			localStorage.setItem(this._localStorageKey, x ?  String(x.getTime()) : undefined);
		});
	}
}
