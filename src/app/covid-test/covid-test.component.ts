import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Covid19Info, AddressDto, OrdererDto, PatientDto, FormDto, FormControllerService, AuthControllerService } from "../../../api";
import { Observable } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
	selector: "app-covid-test",
	templateUrl: "./covid-test.component.html",
	styleUrls: ["./covid-test.component.scss"]
})
export class CovidTestComponent implements OnInit {

	form: FormGroup;
	rkiCritEnum = Covid19Info.RkiCritEnum;
	organisationAutoComplete = [
		"Polizei", 
		"Feuerwehr", 
		"Med. Einrichtung", 
		"Pflegerische Einrichtung", 
		"Krankenhaus", 
		"Arztpraxis"
	];
	filteredOptions: Observable<string[]>;

	orderer: OrdererDto;
	patient: PatientDto;
	covid19info: Covid19Info;
	address: AddressDto;

	constructor(private fb: FormBuilder,
				private authentication: AuthControllerService,
				private covidTestOrderService: FormControllerService,
				private router: Router,
				private snackbar: MatSnackBar) {

		this.form = this.fb.group({
			orderer: this.fb.group({
				firstname: ["", Validators.required],
				lastname: ["", Validators.required],
				lanr: ["", Validators.required],
				bsnr: ["", Validators.required],
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
				rkiReason: ["", Validators.required]
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
		const formDto: FormDto = this.form.value;
		this.covidTestOrderService.addFormular(formDto).subscribe(
			result => {
				console.log(result);
				this.snackbar.open("Erfolg!", "OK", { duration: 3000 });
				this.router.navigate(["/covid-test"]);
			},
			error => {
				console.log(error);
				this.snackbar.open("Fehler!", "OK", { duration: 3000 });
			}
		);
	}

}
