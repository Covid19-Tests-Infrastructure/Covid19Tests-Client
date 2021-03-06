import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";
import { LoginComponent } from "./auth/login/login.component";
import { CovidTestComponent } from "./covid-test/covid-test.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth/guards/auth.guard";
import { ImprintComponent } from "./imprint/imprint.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { AdminGuard } from "./auth/guards/admin.guard";
import { PrivateOrderComponent } from "./covid-test/private-order/private-order.component";
import { AllgemeinComponent } from "./covid-test/allgemein/allgemein.component";

const routes: Routes = [
	{ path: "login", component: LoginComponent, pathMatch: "full" },
	{ path: "404", component: PageNotFoundComponent, pathMatch: "full" },
	{ path: "privacy", component: PrivacyComponent, pathMatch: "full" },
	{ path: "imprint", component: ImprintComponent, pathMatch: "full" },
	{ path: "covid-test", component: CovidTestComponent, pathMatch: "full", canActivate: [AuthGuard] },
	{ path: "covid-test-privat", component: PrivateOrderComponent, pathMatch: "full", canActivate: [AuthGuard] },
	{ path: "covid-test-allgemein", component: AllgemeinComponent, pathMatch: "full", canActivate: [AuthGuard] },
	{ path: "users", loadChildren: () => import("./user-management/user-management.module").then(m => m.UserManagementModule), canActivate: [AdminGuard] },
	{ path: "", component: HomeComponent, pathMatch: "full" },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
