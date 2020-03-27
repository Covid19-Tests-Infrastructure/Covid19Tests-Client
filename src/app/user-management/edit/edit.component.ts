import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { UserControllerService, UserDto } from "../../../../api";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../../auth/services/auth.service";

@Component({
	selector: "app-edit",
	templateUrl: "./edit.component.html",
	styleUrls: ["./edit.component.scss"]
})
export class EditComponent implements OnInit {

	form: FormGroup;
	username: string;
	isAdmin: boolean;

	constructor(private fb: FormBuilder,
				private userService: UserControllerService,
				private authService: AuthService,
				private route: ActivatedRoute,
				private router: Router,
				private snackbar: MatSnackBar) {

		this.form = this.fb.group({
			username: [""],
			passwordDto: this.fb.group({
				oldPassword: [""],
				newPassword: [""]
			}),
			settings: this.fb.group({
				facility: [""],
				ordererInfo: this.fb.group({
					firstname: [""],
					lastname: [""],
					lanr: [""],
					bsnr: [""],
					address: this.fb.group({
						street: [""],
						zip: [""],
						hnumber: [""],
						ort: [""],
					}),
					phoneNumber: [""],
					fax: [""],
					email: [""],
				}),
			}),
			role: [""],
			isActive: [true]
		});

	}

	ngOnInit(): void {
		this.username = this.route.snapshot.paramMap.get("username");
		this.userService.getUser(this.username).subscribe(
			result => {
				result.passwordDto = {
					newPassword: null,
					oldPassword: null
				};
				this.form.patchValue(result);
			},
			error => console.log(error)
		);

		this.isAdmin = this.authService.getUserSettings()?.role === UserDto.RoleEnum.ADMIN;
	}

	onSave(): void {
		const updatedUser: UserDto = this.form.value;

		if (!updatedUser.passwordDto?.newPassword && !updatedUser.passwordDto?.oldPassword) {
			updatedUser.passwordDto = null;
		}
		
		this.userService.editLocalUser(updatedUser, this.username).subscribe(
			result => {
				result.passwordDto = {
					newPassword: null,
					oldPassword: null
				};
				this.form.patchValue(result);
				this.snackbar.open("Nutzerdaten wurden erfolgreich geändert!", "OK", { duration: 3000 });
			},
			error => {
				console.log(error);
				this.snackbar.open("Fehler", "OK", { duration: 3000 });
			}
		);
	}

	onDelete(): void {
		if (window.confirm("Möchten Sie diesen Nutzer wirklich löschen ?")) {
			this.userService.deleteUser(this.username).subscribe(
				result => {
					this.snackbar.open("Nutzer wurde erfolgreich gelöscht!", "OK", { duration: 3000 });
					this.router.navigate(["/users"]);
				},
				error => {
					console.log(error);
					this.snackbar.open("Fehler", "OK", { duration: 3000 });
				}
			);
		}
	}

}
