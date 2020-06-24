import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PatientDto, AuthControllerService, FormControllerService, DefaultFormDto } from "../../../../api";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
	selector: "app-allgemein",
	templateUrl: "./allgemein.component.html",
	styleUrls: ["./allgemein.component.scss"]
})
export class AllgemeinComponent implements OnInit {

	form: FormGroup;
	genderEnum = PatientDto.GenderEnum;

	constructor(private fb: FormBuilder,
				private authentication: AuthControllerService,
				private covidTestOrderService: FormControllerService,
				private router: Router,
				private snackbar: MatSnackBar) { 

		this.form = this.fb.group({
			firstname: ["", Validators.required],
			lastname: ["", Validators.required],
			gender: [this.genderEnum.M, Validators.required],
			bday: ["", Validators.required],
			phoneNumber: [null],
			comment: [null],
			mobile: [true, Validators.required],
			testAddressNote: [null],
			contactSeverity: [null],
			editor: [null],
			address: this.fb.group({
				street: [null],
				zip: [null],
				hnumber: [null],
				ort: [null],
			}),
		});
	}

	ngOnInit(): void {
	}

	onSave(): void {
		if (this.form.valid) {
			const defaultForm: DefaultFormDto = this.form.value;
			this.covidTestOrderService.addFormularDefault(defaultForm).subscribe(
				result => {
					this.snackbar.open("Bestellung erfolgreich verschickt!", "OK", { duration: 3000 });
					this.router.navigateByUrl("/");
				},
				error => {
					console.log(error);
					this.snackbar.open("Fehler! Bestellung konnte nicht verschickt werden.", "OK", { duration: 3000 });
				}
			);
		}
	}

	isFirmenadresse(): boolean {
		return this.form.get("mobile").value == true;
	}

}
