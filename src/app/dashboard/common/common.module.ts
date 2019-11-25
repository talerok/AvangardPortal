import { NgModule } from '@angular/core';
import { ContractService } from './services/contract.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule as Cmodule } from '@angular/common';
import { CalendarComponent } from './components/calendar/component/calendar.component';
import { CalendarService } from './services/calendar.service';
import { ContractInfoComponent } from './components/contract-info/contract-info.component';

@NgModule({
	declarations: [
		CalendarComponent,
		ContractInfoComponent
	],
	imports: [
		Cmodule,
		BrowserModule
	],
	providers: [
		ContractService,
		CalendarService
	],
	exports: [
		CalendarComponent,
		ContractInfoComponent
	]
})
export class CommonModule { }
