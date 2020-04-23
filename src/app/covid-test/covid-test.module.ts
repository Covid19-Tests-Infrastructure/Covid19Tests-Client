import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CovidTestComponent } from "./covid-test.component";
import { RouterModule } from "@angular/router";
import { PrivateOrderComponent } from "./private-order/private-order.component";

@NgModule({
	declarations: [CovidTestComponent, PrivateOrderComponent],
	imports: [
		SharedModule,
		RouterModule,
	]
})
export class CovidTestModule { }
