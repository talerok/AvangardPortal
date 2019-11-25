import { CalendarHelper } from './calendar-helper';
import { CalendarStep } from './calendar-step';

export class CalendarLocal {
	public readonly days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

	private readonly _months = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь'
	];

	private readonly _shortMonths = [
		'Янв.',
		'Фев.',
		'Март',
		'Апр.',
		'Май',
		'Июнь',
		'Июль',
		'Авг.',
		'Сент.',
		'Окт.',
		'Ноя.',
		'Дек.'
	];

	public getStr(date: Date, step: CalendarStep) {
		switch (step) {
			case CalendarStep.MONTH:
				return date.getDate();
			case CalendarStep.YEAR:
				return this._shortMonths[date.getMonth()];
			case CalendarStep.DECADE:
				return date.getFullYear();
		}
	}

	public getInfo(date: Date, step: CalendarStep): string {
		switch (step) {
			case CalendarStep.MONTH:
				return `${this._months[date.getMonth()]} ${date.getFullYear()}г.`;
			case CalendarStep.YEAR:
				return String(date.getFullYear());
			case CalendarStep.DECADE:
				const decade = CalendarHelper.getDecadeNum(date.getFullYear());
				const range = CalendarHelper.getDecadeRange(decade);
				return `${range[0]} - ${range[1]}`;
		}
	}
}
