import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './components/main/layout.component';
import { CommonModule as Cmodule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeaderCalendarComponent } from './components/header-calendar/header-calendar.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@common/common.module';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		LayoutComponent,
		HeaderComponent,
		HeaderCalendarComponent
	],
	imports: [
		RouterModule,
		Cmodule,
		CommonModule,
		FormsModule,
		BrowserModule,
		OverlayPanelModule,
		BrowserAnimationsModule
	],
	providers: [],
	exports: [
		LayoutComponent
	]
})
export class LayoutModule { }
