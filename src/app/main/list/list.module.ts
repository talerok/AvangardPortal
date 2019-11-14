import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { RouterModule } from '@angular/router';
import { CommonModule as Cmodule } from '@angular/common';
import { TileComponent } from './components/tile/tile.component';
import { CommonModule } from '@common/common.module';


@NgModule({
	declarations: [
		ListComponent,
		TileComponent
	],
	imports: [
		Cmodule,
		CommonModule,
		BrowserModule
	],
	providers: [],
	exports: [
		ListComponent
	]
})
export class ListModule { }
