import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContractModel, ContractType, ContractState } from '@common/models/contract-model';
import { ContractSubStepModel } from '@common/models/contract-sub-step-model';

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

	private _generateFakeWarnings(id: number): string[] {
		const size = id % (ContractService.stepsNames.length + 1);
		return ContractService.stepsNames.slice(0, size);
	}

	private _generateFakeContract(id: number): ContractModel {
		return {
			id,
			type: id % 2 ? ContractType.GK : ContractType.VTS,
			num: `000${id}`,
			itemAmount: id + 100,
			itemName: `Изделие ${id}`,
			period: [new Date(), new Date()],
			state: id % 3 as ContractState,
			warnings: this._generateFakeWarnings(id),
			steps: this._generateFakeSteps(id)
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

	private _generateFakeSteps(id: number) {
		const res = ContractService.stepsNames.map((x, stepId) => {
			const subSteps: ContractSubStepModel[] = [];
			for (let i = 0; i < (id + stepId + 1) % 6; i++) {
				subSteps.push({
					id: 100000 * id + 1000 * stepId + i,
					name: `${x} ${i}`,
					data: {
						plan: this._generateRandomData(),
						fact: this._generateRandomData()
					}
				});
			}
			return subSteps;
		});
		return res;
	}

	private _generateFakeContracts(count: number): ContractModel[] {
		const res: ContractModel[] = [];
		for (let i = 0; i < count; i++) {
			res.push(this._generateFakeContract(i));
		}
		return res;
	}

	public getAll(date: Date): Observable<ContractModel[]> {
		return of(this._generateFakeContracts(20));
	}

	public getById(id: number, date: Date): Observable<ContractModel> {
		const res = this._generateFakeContract(id);
		return of(res);
	}
}
