import { NgModule } from '@angular/core';

import { MainComponent } from './main/component/main.component';
import { MainModule } from './main/main.module';
import { IndexModule } from './index/index.module';

@NgModule({
	declarations: [],
	imports: [
		MainModule,
		IndexModule
	],
	providers: [],
	bootstrap: [MainComponent]
})
export class AppModule { }
