import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule as Cmodule } from '@angular/common';
import { CommonModule } from '@common/common.module';
import { DetailComponent } from './components/detail/detail.component';
import { RouterModule } from '@angular/router';
import { detailRouting } from './detail-routing';
import { StepMenuComponent } from './components/step-menu/step-menu.component';
import { ChartComponent } from './components/chart/chart.component';
import {ScrollPanelModule} from 'primeng/scrollpanel';

@NgModule({
	declarations: [
		DetailComponent,
		StepMenuComponent,
		ChartComponent
	],
	imports: [
		Cmodule,
		CommonModule,
		BrowserModule,
		RouterModule.forRoot(detailRouting),

		ScrollPanelModule,
	],
	providers: [],
	exports: [
	]
})
export class DetailModule { }
