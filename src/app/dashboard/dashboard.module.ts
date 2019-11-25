import { NgModule } from '@angular/core';
import { ListModule } from './list/list.module';
import { LayoutModule } from './layout/layout.module';
import { DetailModule } from './detail/detail.module';

@NgModule({
	declarations: [],
	imports: [
		DetailModule,
		ListModule,
		LayoutModule
	],
	providers: [],
	bootstrap: []
})
export class DashboardModule { }
