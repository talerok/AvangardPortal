import {Routes} from '@angular/router';
import { LayoutComponent } from './main/layout/components/main/layout.component';
import { mainRouting } from './main/main-routing';

export const appRouting: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: mainRouting
	},
];

