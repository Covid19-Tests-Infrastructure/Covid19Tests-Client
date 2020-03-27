import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthControllerService } from "../../../../api";

@Injectable({
	providedIn: "root"
})
export class AuthService {

	private readonly authTokenKey = "authToken";

	constructor(private router: Router,
				private authenticationService: AuthControllerService,
				private http: HttpClient) { }

	async login(username: string, password: string): Promise<void> {
		const result = await this.authenticationService.authenticate(username, password).toPromise()
			.catch(error => {
				console.log(error);
				// Rethrow the error, so calling component is able to display the error
				throw new Error("Login fehlgeschlagen."); 
			});

		// If login was successful, store the received authentication token
		const token = (result as any).token as string;

		if (token) {
			localStorage.setItem(this.authTokenKey, token);
			this.router.navigate(["/covid-test"]);
		}
	}

	logout(): void {
		localStorage.removeItem(this.authTokenKey);
		this.router.navigate(["/login"]);
	}

	/**
	 * Checks if user is in possession of an authentication token.
	 * (Attention: Does not guarantee that the token is still valid (i.e could be expired).)
	 */
	isLoggedIn(): boolean {
		return !!localStorage.getItem(this.authTokenKey);
	}

	/**
	 * Returns the stored AccessToken (JWT), which can be appended to the Authorization-header
	 * ("Bearer <Token>") to authenticate the user for requests to the server.
	 */
	getAccessToken(): string {
		return localStorage.getItem(this.authTokenKey);
	}

}
