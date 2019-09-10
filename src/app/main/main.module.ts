import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainComponent } from './component/main.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
	declarations: [
		MainComponent
	],
	imports: [
		RouterModule,
		CommonModule,
		BrowserModule,
	],
	providers: [],
	exports: [
		MainComponent
	]
})
export class MainModule { }
