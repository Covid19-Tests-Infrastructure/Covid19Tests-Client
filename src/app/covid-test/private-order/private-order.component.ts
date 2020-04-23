import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthControllerService, FormControllerService, PatientDto } from "../../../../api";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
	selector: "app-private-order",
	templateUrl: "./private-order.component.html",
	styleUrls: ["./private-order.component.scss"]
})
export class PrivateOrderComponent implements OnInit {

	form: FormGroup;
	genderEnum = PatientDto.GenderEnum;
	organisationAutoComplete = [
		"Polizei", 
		"Feuerwehr", 
		"Med. Einrichtung", 
		"Pflegerische Einrichtung", 
		"Krankenhaus", 
		"Arztpraxis"
	];
	insuranceAutoComplete = [
		"Mitglied",
		"Familienangehöriger",
		"Rentner"
	];

	constructor(private fb: FormBuilder,
		private authentication: AuthControllerService,
		private covidTestOrderService: FormControllerService,
		private router: Router,
		private snackbar: MatSnackBar) { 

		this.form = this.fb.group({
			occupationGroup: [""],
			firstname: ["", Validators.required],
			lastname: ["", Validators.required],
			gender: [this.genderEnum.M, Validators.required],
			bday: ["", Validators.required],
			address: this.fb.group({
				street: [""],
				zip: [""],
				hnumber: [""],
				ort: [""],
			}),
			phoneNumber: ["", Validators.required],
			healthCareOrganisationNumber: [""],
			personalHealthCareNumber: [""],
			insuranceType: ["", Validators.required],
			mobile: [true, Validators.required],
		});
	}

	ngOnInit(): void {
	}

	onSave(): void {
		if (this.form.valid) {
			const patient: PatientDto = this.form.value;
			this.covidTestOrderService.addFormularPrivate(patient).subscribe(
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

}
