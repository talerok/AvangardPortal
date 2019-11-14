import {Routes} from '@angular/router';
import { ListComponent } from './list/components/list/list.component';
import { DetailComponent } from './detail/components/detail/detail.component';

export const mainRouting: Routes = [
	{
		path: '',
		component: ListComponent,
	},
	{
		path: ':id',
		component: DetailComponent,
	},
];

