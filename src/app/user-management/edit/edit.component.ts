import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { UserControllerService, UserDto } from "../../../../api";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
	selector: "app-edit",
	templateUrl: "./edit.component.html",
	styleUrls: ["./edit.component.scss"]
})
export class EditComponent implements OnInit {

	form: FormGroup;
	username: string;

	constructor(private fb: FormBuilder,
				private userService: UserControllerService,
				private route: ActivatedRoute,
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
			isActive: [""]
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
	}

	onSave(): void {
		const updatedUser: UserDto = this.form.value;

		if (!updatedUser.passwordDto?.newPassword && !updatedUser.passwordDto?.oldPassword) {
			updatedUser.passwordDto = null;
		}

		this.userService.editLocalUser(updatedUser, this.username).subscribe(
			result => {
				this.form.patchValue(result);
				this.snackbar.open("Nutzerdaten wurden erfolgreich geändert!", "OK", { duration: 3000 });
			},
			error => {
				console.log(error);
				this.snackbar.open("Fehler", "OK", { duration: 3000 });
			}
		);
	}

}
