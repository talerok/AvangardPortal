import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ContractSubStepModel } from '@common/models/contract-sub-step-model';
import { ContractService } from '@common/services/contract.service';

class StepMenuElement {

	public opened = false;

	constructor(
		public readonly id: number,
		public readonly name: string,
		public readonly children: StepMenuElement[]
	) {}
}

@Component({
	selector: 'app-detail-step-menu',
	templateUrl: './step-menu.component.html',
	styleUrls: ['./step-menu.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepMenuComponent {

	public menu: StepMenuElement[] = null;

	public _selected: StepMenuElement = null;

	@Output() stepSelected = new EventEmitter<number>();
	@Output() subStepSelected = new EventEmitter<number>();

	@Input() set steps(value: ContractSubStepModel[][]) {

		this.menu = value.map((step, i) => new StepMenuElement(
			i,
			this._getStepName(i),
			step.map(subStep => new StepMenuElement(subStep.id, subStep.name, null))
		));
	}

	private _getStepName(id: number) {
		return ContractService.stepsNames[id];
	}

	public toggleStep($event, step: StepMenuElement) {
		$event.preventDefault();
		step.opened = !step.opened;
	}

	public select(step: StepMenuElement) {
		this._selected = step;
		if (this._selected.children) {
			this.stepSelected.emit(this._selected.id);
		} else {
			this.subStepSelected.emit(this._selected.id);
		}
	}

}
