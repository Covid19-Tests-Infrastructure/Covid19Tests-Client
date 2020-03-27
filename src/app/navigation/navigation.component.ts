import { Component } from "@angular/core";
import { AuthService } from "../auth/services/auth.service";
import { UserDto } from "../../../api";

@Component({
	selector: "app-navigation",
	templateUrl: "./navigation.component.html",
	styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent {

	loggedInUser: UserDto;

	constructor(private authService: AuthService) { }

	getUsername(): string {
		return this.authService.getUserSettings().username ?? null;
	}

	getLoggedInUser(): UserDto {
		return this.authService.getUserSettings();
	}

	isLoggedIn(): boolean {
		return this.authService.isLoggedIn();
	}
  
	logout(): void {
		this.authService.logout();
	}

}
