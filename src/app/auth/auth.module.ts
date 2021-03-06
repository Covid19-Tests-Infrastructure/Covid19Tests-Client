import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AdminGuard } from "./guards/admin.guard";

@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		AuthService, 
		AuthGuard,
		AdminGuard,
		{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
	]

})
export class AuthModule { }
