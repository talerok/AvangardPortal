import { NgModule } from '@angular/core';

import { MainComponent } from './main/components/main/main.component';
import { MainModule } from './main/main.module';
import { IndexModule } from './index/index.module';
import { CommonModule } from '@common/common.module';
import { DetailModule } from './detail/detail.module';
import { HeaderComponent } from './main/components/header/header.component';

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
