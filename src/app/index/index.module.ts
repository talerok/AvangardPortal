import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IndexComponent } from './components/index/index.component';
import { RouterModule } from '@angular/router';
import { CommonModule as Cmodule } from '@angular/common';
import { TileComponent } from './components/tile/tile.component';
import { CommonModule } from '@common/common.module';
import { indexRouting } from './index-routing';


@NgModule({
	declarations: [
		IndexComponent,
		TileComponent
	],
	imports: [
		Cmodule,
		CommonModule,
		BrowserModule,
		RouterModule.forRoot(indexRouting),
	],
	providers: [],
	exports: [
		IndexComponent
	]
})
export class IndexModule { }
