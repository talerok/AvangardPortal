import { NgModule } from '@angular/core';
import { GlobalLayoutComponent } from './global-layout/global-layout.component';
import { MainModule } from './main/main.module';
import { RouterModule } from '@angular/router';
import { appRouting } from './app-routing';
@NgModule({
	declarations: [GlobalLayoutComponent],
	imports: [
		MainModule,
		RouterModule.forRoot(appRouting)
	],
	providers: [],
	bootstrap: [GlobalLayoutComponent]
})
export class AppModule { }
