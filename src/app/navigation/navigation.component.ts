import { Component } from "@angular/core";
import { AuthService } from "../auth/services/auth.service";

@Component({
	selector: "app-navigation",
	templateUrl: "./navigation.component.html",
	styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent {

	constructor(private authService: AuthService) { }

	isLoggedIn(): boolean {
		return this.authService.isLoggedIn();
	}
  
	logout(): void {
		this.authService.logout();
	}

}
