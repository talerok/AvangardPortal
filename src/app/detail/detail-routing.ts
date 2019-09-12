import {Routes} from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';

export const detailRouting: Routes = [
	{
		path: ':id',
		component: DetailComponent,
	}
];

