import { CalendarStep } from './calendar-step';

export abstract class CalendarHelper {
	public static readonly decadeOffset = 12;

	private static _addDay(date: Date) {
		date.setDate(date.getDate() + 1);
	}

	private static _getDay(date: Date) {
		const res = date.getDay();
		return res ? res : 7;
	}

	private static _generateDateArray(firstDate: Date, lastDate: Date): Date[] {
		const curDate = new Date(firstDate.getTime());

		const res = [];
		while (curDate <= lastDate) {
			res.push(new Date(curDate.getTime()));
			this._addDay(curDate);
		}
		return res;
	}

	private static _getWeek(month: number, fullYear: number, week: number) {
		const firstDate = new Date(fullYear, month, 1);
		const weekOffset = 7 * week - this._getDay(firstDate) + 2;
		const firstWeekDate = new Date(fullYear, month, weekOffset);
		const lastWeekDate = new Date(fullYear, month, weekOffset + 6);
		return this._generateDateArray(firstWeekDate, lastWeekDate);
	}

	public static getMonth(month: number, fullYear: number): Date[][] {
		return [
			this._getWeek(month, fullYear, 0),
			this._getWeek(month, fullYear, 1),
			this._getWeek(month, fullYear, 2),
			this._getWeek(month, fullYear, 3),
			this._getWeek(month, fullYear, 4),
			this._getWeek(month, fullYear, 5)
		];
	}

	public static getYear(fullYear: number): Date[][] {
		const res = [];
		for (let i = 0; i < 4; i++) {
			const subRes = [];
			for (let j = 0; j < 3; j++) {
				subRes.push(new Date(fullYear, i * 3 + j, 1));
			}
			res.push(subRes);
		}

		return res;
	}

	public static getDecadeNum(fullYear: number): number {
		return Math.floor(fullYear / CalendarHelper.decadeOffset);
	}

	public static getDecadeRange(num: number) {
		return [num * this.decadeOffset, (num + 1) * this.decadeOffset - 1];
	}

	public static getDecade(num: number): Date[][] {
		const res = [];
		const firstYear = num * this.decadeOffset;

		for (let i = 0; i < 4; i++) {
			const subRes = [];
			for (let j = 0; j < 3; j++) {
				subRes.push(new Date(firstYear + i * 3 + j, 0, 1));
			}
			res.push(subRes);
		}
		return res;
	}

	public static compareDates(a: Date, b: Date, step: CalendarStep) {
		let aCoef: number;
		let bCoef: number;

		switch (step) {
			case CalendarStep.MONTH:
				aCoef = a.getFullYear() * 10000 + a.getMonth() * 100 + a.getDate();
				bCoef = b.getFullYear() * 10000 + b.getMonth() * 100 + b.getDate();
				break;
			case CalendarStep.YEAR:
				aCoef = a.getFullYear() * 100 + a.getMonth();
				bCoef = b.getFullYear() * 100 + b.getMonth();
				break;
			case CalendarStep.DECADE:
				aCoef = a.getFullYear();
				bCoef = b.getFullYear();
				break;
		}
		if (aCoef === bCoef) {
			return 0;
		} else if (aCoef > bCoef) {
			return 1;
		} else {
			return -1;
		}
	}
}
