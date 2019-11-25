import {Routes} from '@angular/router';
import { LayoutComponent } from './dashboard/layout/components/layout/layout.component';
import { dashboardRouting } from './dashboard/dashboard-routing';

export const appRouting: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: dashboardRouting
	},
];

