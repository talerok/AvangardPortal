import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { ContractModel, ContractType } from '../models/contract-model';
import { ContractStatus } from '../models/contract-status-model';
import { ContractStepModel } from '../models/contract-step-model';
import { ContractStepDataModel } from '../models/contract-step-data-model';

@Injectable()
export class ContractService {

	public static readonly stepsNames = [
		'Обеспечиность ПКИ',
		'Обеспеченость ДСЕ',
		'На сборке',
		'Отгружено на снаряжение',
		'На снаряжении',
		'Отгружено заказчику',
		'Принято заказчиком'
	];

	private _generateFakeWarnings(): string[] {
		return ContractService.stepsNames.slice(0, this._getRandomInt(-1, ContractService.stepsNames.length));
	}

	private _generateFakeContract(): ContractModel {
		return {
			uid: this._guid(),
			type: this._getRandomInt(1, 2) % 2 ? ContractType.GK : ContractType.VTS,
			num: `N/A`,
			itemAmount: this._getRandomInt(50, 150),
			itemName: `Изделие ${this._getRandomInt(1, 2)}`,
			period: [new Date(), new Date()],
			status: this._generateRandomStatus(),
			warnings: this._generateFakeWarnings(),
			steps: this._generateFakeSteps()
		};
	}

	private _getRandomInt(min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	private _generateRandomData() {
		const res = [];
		for (let i = 0; i < 12; i ++) {
			res.push(i === 0 ? this._getRandomInt(0, 20) : res[i - 1] + this._getRandomInt(0, 20));
		}
		return res;
	}

	private _guid() {
		const _p8 = (s) =>  {
			const p = (Math.random().toString(16) + '000000000').substr(2, 8);
			return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p ;
		};
		return _p8(false) + _p8(true) + _p8(true) + _p8(false);
	}

	private _generateRandomStatus(): ContractStatus {
		return this._getRandomInt(0, 2);
	}

	private _generateFakeSteps() {
		return ContractService.stepsNames.map(x => {
			const res: ContractStepModel = {uid: this._guid(), name: x, status: this._generateRandomStatus(), substeps: []};
			for (let i = 0; i < this._getRandomInt(2, 5); i++) {
				res.substeps.push({uid: this._guid(), name: `${x} ${i + 1}`, status: this._generateRandomStatus()});
			}
			return res;
		});
	}

	private _generateFakeContracts(count: number): ContractModel[] {
		const res: ContractModel[] = [];
		for (let i = 0; i < count; i++) {
			res.push(this._generateFakeContract());
		}
		return res;
	}

	public getAll(date: Date): Observable<ContractModel[]> {
		return of(this._generateFakeContracts(20)).pipe(timeout(1000));
	}

	public getById(uid: string, date: Date): Observable<ContractModel> {
		const res = this._generateFakeContract();
		res.uid = uid;
		return of(this._generateFakeContract()).pipe(timeout(1000));
	}

	public getStepData(uid: string, date: Date): Observable<ContractStepDataModel> {
		const res = {plan: this._generateRandomData(), fact: this._generateRandomData()};
		return of(res).pipe(timeout(1000));
	}

	public getSubStepData(uid: string, date: Date): Observable<ContractStepDataModel> {
		const res = {plan: this._generateRandomData(), fact: this._generateRandomData()};
		return of(res).pipe(timeout(1000));
	}
}
