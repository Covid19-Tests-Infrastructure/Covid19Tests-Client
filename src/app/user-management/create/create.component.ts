import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { UserControllerService, UserDto } from "../../../../api";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
	selector: "app-create",
	templateUrl: "./create.component.html",
	styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit {

	form: FormGroup;

	constructor(private fb: FormBuilder,
				private userService: UserControllerService,
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
					ordererInfo: [""],
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
		this.userService.addLocalUser(user).subscribe(
			result => this.snackbar.open("Nutzer wurde erfolgreich angelegt!", "OK", { duration: 3000 }),
			error => {
				console.log(error);
				this.snackbar.open("Fehler beim Erstellen des Nutzers.", "OK", { duration: 3000 });
			}
		);
	}

}
