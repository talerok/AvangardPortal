import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
	declarations: [
		MainComponent,
		HeaderComponent
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
