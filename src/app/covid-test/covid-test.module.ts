import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CovidTestComponent } from "./covid-test.component";

@NgModule({
	declarations: [CovidTestComponent],
	imports: [
		SharedModule
	]
})
export class CovidTestModule { }
