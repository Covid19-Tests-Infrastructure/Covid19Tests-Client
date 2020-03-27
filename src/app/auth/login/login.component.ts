import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent {

	username = "lukas";
	password = "slayer";
	errorMessage: string;

	constructor(private authService: AuthService) { }

	async login(): Promise<void> {
		await this.authService.login(this.username, this.password)
			.catch(error => {
				this.errorMessage = error;
			});
	}

}
