import { NgModule } from "@angular/core";
import { UserManagementRoutingModule } from "./user-management-routing.module";
import { UserManagementComponent } from "./user-management.component";
import { SharedModule } from "../shared/shared.module";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";


@NgModule({
	declarations: [UserManagementComponent, CreateComponent, EditComponent],
	imports: [
		SharedModule,
		UserManagementRoutingModule
	]
})
export class UserManagementModule { }
