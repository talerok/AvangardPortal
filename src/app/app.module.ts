import { NgModule } from '@angular/core';
import { GlobalLayoutComponent } from './global-layout/global-layout.component';
import { RouterModule } from '@angular/router';
import { appRouting } from './app-routing';
import { HeaderCalendarComponent } from './dashboard/layout/components/header-calendar/header-calendar.component';
import { DashboardModule } from './dashboard/dashboard.module';
@NgModule({
	declarations: [GlobalLayoutComponent],
	imports: [
		DashboardModule,
		RouterModule.forRoot(appRouting)
	],
	providers: [],
	bootstrap: [GlobalLayoutComponent]
})
export class AppModule { }
