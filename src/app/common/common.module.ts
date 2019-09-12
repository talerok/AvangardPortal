import { NgModule } from '@angular/core';
import { ContractService } from './services/contract.service';
import { ContractInfoComponent } from './components/contract-info/contract-info.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule as Cmodule } from '@angular/common';

@NgModule({
	declarations: [
		ContractInfoComponent
	],
	imports: [
		Cmodule,
		BrowserModule
	],
	providers: [
		ContractService
	],
	exports: [
		ContractInfoComponent
	]
})
export class CommonModule { }
