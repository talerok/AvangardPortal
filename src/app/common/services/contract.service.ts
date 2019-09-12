import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContractModel, ContractType, ContractState } from '@common/models/contract-model';

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
	]

	private generateFakeWarnings(id: number): string[] {
		const size = id % (ContractService.stepsNames.length + 1);
		return ContractService.stepsNames.slice(0, size);
	}

	private generateFakeContracts(count: number): ContractModel[] {
		const res: ContractModel[] = [];
		for (let i = 0; i < count; i++) {
			res.push({
				type: i % 2 ? ContractType.GK : ContractType.VTS,
				num: `000${i}`,
				itemAmount: i + 100,
				itemName: `Изделие ${i}`,
				period: [new Date(), new Date()],
				state: i % 3 as ContractState,
				warnings: this.generateFakeWarnings(i)
			});
		}
		return res;
	}

	public getAll(date: Date): Observable<ContractModel[]> {
		return of(this.generateFakeContracts(20));
	}
}