import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserControllerService, UserDto } from "../../../../api";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
	selector: "app-create",
	templateUrl: "./create.component.html",
	styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit {

	form: FormGroup;
	roles: UserDto.RoleEnum;

	constructor(private fb: FormBuilder,
				private userService: UserControllerService,
				private snackbar: MatSnackBar) {
		this.form = this.fb.group({
			username: ["", Validators.required],
			passwordDto: this.fb.group({
				oldPassword: [""],
				newPassword: ["", Validators.required]
			}),
			settings: this.fb.group({
				facility: ["", Validators.required],
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
		});
	}

	ngOnInit(): void {
	}

	onSave(): void {
		const user: UserDto = this.form.value;
		console.log(user);
		this.userService.addLocalUser(user).subscribe(
			result => this.snackbar.open("Nutzer wurde erfolgreich angelegt!", "OK", { duration: 3000 }),
			error => {
				console.log(error);
				this.snackbar.open("Fehler beim Erstellen des Nutzers.", "OK", { duration: 3000 });
			}
		);
	}

}
