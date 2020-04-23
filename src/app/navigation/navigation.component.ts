import { Component, ViewChild } from "@angular/core";
import { AuthService } from "../auth/services/auth.service";
import { UserDto } from "../../../api";
import { Observable } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map, shareReplay, withLatestFrom, filter } from "rxjs/operators";
import { Router, NavigationEnd } from "@angular/router";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
	selector: "app-navigation",
	templateUrl: "./navigation.component.html",
	styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent {

	loggedInUser: UserDto;
	roles = UserDto.RoleEnum;

	@ViewChild("drawer") drawer: MatSidenav;
	isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset])
		.pipe(
			map(result => result.matches),
			shareReplay()
		);

	constructor(private authService: AuthService,
				private breakpointObserver: BreakpointObserver,
				private router: Router) {
		router.events.pipe(
			withLatestFrom(this.isHandset$),
			filter(([a, b]) => b && a instanceof NavigationEnd)
		).subscribe(x => this.drawer.close());
	}

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
