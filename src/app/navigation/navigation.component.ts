import { Component } from "@angular/core";
import { AuthService } from "../auth/services/auth.service";
import { UserDto } from "../../../api";
import { Observable } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map, shareReplay } from "rxjs/operators";

@Component({
	selector: "app-navigation",
	templateUrl: "./navigation.component.html",
	styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent {

	loggedInUser: UserDto;

	isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset])
		.pipe(
			map(result => result.matches),
			shareReplay()
		);

	constructor(private authService: AuthService,
				private breakpointObserver: BreakpointObserver) { }

	getUsername(): string {
		return this.authService.getUserSettings()?.username ?? "";
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
