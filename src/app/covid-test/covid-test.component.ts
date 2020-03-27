import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Covid19Info, PatientDto, FormDto, FormControllerService, AuthControllerService } from "../../../api";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
	selector: "app-covid-test",
	templateUrl: "./covid-test.component.html",
	styleUrls: ["./covid-test.component.scss"]
})
export class CovidTestComponent implements OnInit {

	form: FormGroup;
	acceptCheckbox: false;

	genderEnum = PatientDto.GenderEnum;
	rkiCritEnum = Covid19Info.RkiCritEnum;
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
			orderer: this.fb.group({
				firstname: ["", Validators.required],
				lastname: ["", Validators.required],
				lanr: [""],
				bsnr: [""],
				address: this.fb.group({
					street: ["", Validators.required],
					zip: ["", Validators.required],
					hnumber: ["", Validators.required],
					ort: ["", Validators.required],
				}),
				phoneNumber: ["", Validators.required],
				fax: [""],
				email: ["", [Validators.required, Validators.email]],
			}),
			patient: this.fb.group({
				occupationGroup: ["", Validators.required],
				firstname: ["", Validators.required],
				lastname: ["", Validators.required],
				gender: ["", Validators.required],
				bday: ["", Validators.required],
				address: this.fb.group({
					street: ["", Validators.required],
					zip: ["", Validators.required],
					hnumber: ["", Validators.required],
					ort: ["", Validators.required],
				}),
				phoneNumber: ["", Validators.required],
				healthCareOrganisationNumber: ["", Validators.required],
				personalHealthCareNumber: ["", Validators.required],
				insuranceType: ["", Validators.required],
				mobile: [true, Validators.required],
			}),
			info: this.fb.group({
				diagnose: ["", Validators.required],
				rkiCrit: [this.rkiCritEnum.NOTHING, Validators.required],
				rkiReason: [""]
			}),
		});
	}

	ngOnInit(): void {
		this.authentication.isTokenValid().subscribe(
			result => {
				this.form.patchValue({ orderer: result.settings.ordererInfo });
			},
			error => console.log(error)
		);
	}

	onSave(): void {
		if (this.form.valid) {
			const formDto: FormDto = this.form.value;
			this.covidTestOrderService.addFormular(formDto).subscribe(
				result => {
					this.snackbar.open("Anmeldung erfolgreich verschickt!", "OK", { duration: 3000 });
					this.router.navigate(["/"]);
				},
				error => {
					console.log(error);
					this.snackbar.open("Fehler! Anmeldung konnte nicht verschickt werden.", "OK", { duration: 3000 });
				}
			);
		}
	}

}
