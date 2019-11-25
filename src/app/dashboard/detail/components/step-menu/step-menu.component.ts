import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ScrollPanel } from 'primeng/scrollpanel';
import { ContractStepModel, ContractSubStepModel } from 'src/app/dashboard/common/models/contract-step-model';

class StepMenuElement {
	public opened = false;

	constructor(
		public readonly data: ContractStepModel | ContractSubStepModel,
		public readonly children: StepMenuElement[]
	) {}
}

@Component({
	selector: 'app-dashboard-detail-step-menu',
	templateUrl: './step-menu.component.html',
	styleUrls: ['./step-menu.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepMenuComponent {

	public menu: StepMenuElement[] = null;
	private _selected: StepMenuElement = null;

	@ViewChild(ScrollPanel, {static: true}) scrollPanel: ScrollPanel;

	@Input() set steps(value: ContractStepModel[]) {
		this.menu = value.map((step) => new StepMenuElement(
			step,
			step.substeps.map(subStep => new StepMenuElement(subStep, null))
		));
		this._refreshScroll();
		setTimeout(x => {
			this.select(this.menu[0]);
		});
	}

	public get selected(): StepMenuElement {
		return this._selected;
	}

	@Output() selectedChange = new EventEmitter<ContractStepModel | ContractSubStepModel>();

	constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

	public toggleStep($event, step: StepMenuElement) {
		$event.preventDefault();
		step.opened = !step.opened;
		this. _refreshScroll();
	}

	private _refreshScroll() {
		setTimeout(() => {
			this.scrollPanel.refresh();
		});
	}

	public select(step: StepMenuElement) {
		this._selected = step;
		this.selectedChange.emit(step.data);
	}

}
