import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IndexComponent } from './components/index/index.component';
import { RouterModule } from '@angular/router';
import { IndexRouting } from './index-routing';
import { CommonModule } from '@angular/common';
import { TileComponent } from './components/tile/tile.component';


@NgModule({
	declarations: [
		IndexComponent,
		TileComponent
	],
	imports: [
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
