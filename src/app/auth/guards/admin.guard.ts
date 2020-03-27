import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { UserDto } from "../../../../api";

@Injectable({
	providedIn: "root"
})
export class AdminGuard implements CanActivate {

	constructor(private authService: AuthService, 
				private router: Router) { }

	canActivate(): boolean {
		if (!this.authService.isLoggedIn() || this.authService.getUserSettings().role !== UserDto.RoleEnum.ADMIN) {
			this.router.navigate(["/login"]);
			return false;
		}

		return true;
	}

}
