import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CovidTestComponent } from "./covid-test.component";
import { RouterModule } from "@angular/router";

@NgModule({
	declarations: [CovidTestComponent],
	imports: [
		SharedModule,
		RouterModule,
	]
})
export class CovidTestModule { }
