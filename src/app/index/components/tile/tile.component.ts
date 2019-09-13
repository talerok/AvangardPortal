import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ContractModel } from '@common/models/contract-model';


@Component({
	selector: 'app-index-tile',
	templateUrl: './tile.component.html',
	styleUrls: ['./tile.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent implements OnInit {

	@Input() contracts: ContractModel[];

	// tslint:disable-next-line: no-output-native
	@Output() select = new EventEmitter<number>();

	constructor() { }

	ngOnInit() {
	}

}
