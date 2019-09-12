import { NgModule } from '@angular/core';

import { MainComponent } from './main/component/main.component';
import { MainModule } from './main/main.module';
import { IndexModule } from './index/index.module';
import { CommonModule } from '@common/common.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MainModule,
		IndexModule
	],
	providers: [],
	bootstrap: [MainComponent]
})
export class AppModule { }
