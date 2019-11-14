import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './components/main/layout.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
	declarations: [
		LayoutComponent,
		HeaderComponent
	],
	imports: [
		RouterModule,
		CommonModule,
		BrowserModule,
	],
	providers: [],
	exports: [
		LayoutComponent
	]
})
export class LayoutModule { }
