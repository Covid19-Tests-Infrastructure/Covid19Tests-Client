import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UserManagementComponent } from "./user-management.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { AdminGuard } from "../auth/guards/admin.guard";

const routes: Routes = [
	{ path: "create", component: CreateComponent, pathMatch: "full" },
	{ path: "edit/:username", component: EditComponent, pathMatch: "full" },
	{ path: "", component: UserManagementComponent, pathMatch: "full", canActivate: [AdminGuard] }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserManagementRoutingModule { }
