import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IndexComponent } from './components/index/index.component';
import { RouterModule } from '@angular/router';
import { IndexRouting } from './index-routing';
import { CommonModule as Cmodule } from '@angular/common';
import { TileComponent } from './components/tile/tile.component';
import { CommonModule } from '@common/common.module';


@NgModule({
	declarations: [
		IndexComponent,
		TileComponent
	],
	imports: [
		Cmodule,
		CommonModule,
		BrowserModule,
		RouterModule.forRoot(IndexRouting),
	],
	providers: [],
	exports: [
		IndexComponent
	]
})
export class IndexModule { }
