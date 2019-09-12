import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ContractSubStepModel } from '@common/models/contract-sub-step-model';
import { ContractService } from '@common/services/contract.service';

@Component({
	selector: 'app-detail-step-menu',
	templateUrl: './step-menu.component.html',
	styleUrls: ['./step-menu.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepMenuComponent {

	@Input() steps: ContractSubStepModel[][];

	public getStepName(id: number) {
		return ContractService.stepsNames[id];
	}

}
