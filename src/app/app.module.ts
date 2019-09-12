import { NgModule } from '@angular/core';

import { MainComponent } from './main/component/main.component';
import { MainModule } from './main/main.module';
import { IndexModule } from './index/index.module';
import { CommonModule } from '@common/common.module';
import { DetailComponent } from './detail/components/detail/detail.component';
import { DetailModule } from './detail/detail.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MainModule,
		IndexModule,
		DetailModule
	],
	providers: [],
	bootstrap: [MainComponent]
})
export class AppModule { }
