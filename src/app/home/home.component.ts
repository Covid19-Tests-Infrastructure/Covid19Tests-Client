import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/services/auth.service";
import { UserDto } from "../../../api";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

	constructor(private authService: AuthService) { }

	ngOnInit(): void {
	}

	/** Returns an absolute link to the order form corresponding the user's role. */
	getLink(): string {
		const role = this.authService.getUserSettings()?.role;

		if (!role) return "login";

		switch (role) {
		case UserDto.RoleEnum.DEFAULT:
			return "/covid-test-allgemein"; 
		case UserDto.RoleEnum.KVN:
			return "/covid-test";
		case UserDto.RoleEnum.PRIVATE:
			return "/covid-test-privat"; 
		case UserDto.RoleEnum.ADMIN:
			return "/covid-test-allgemein"; 
		default:
			return "";
		}
	}

}
