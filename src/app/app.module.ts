import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { environment } from "../environments/environment";

import { AppComponent } from "./app.component";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { NavigationComponent } from "./navigation/navigation.component";
import { LayoutModule } from "@angular/cdk/layout";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AuthModule } from "./auth/auth.module";
import { SharedModule } from "./shared/shared.module";
import { CovidTestModule } from "./covid-test/covid-test.module";
import { ApiModule, BASE_PATH } from "../../api";
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { HomeComponent } from "./home/home.component";
import { ImprintComponent } from "./imprint/imprint.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { AllgemeinComponent } from "./covid-test/allgemein/allgemein.component";

export function createTranslateLoader(http: HttpClient): TranslateLoader {
	return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
	declarations: [
		AppComponent,
		NavigationComponent,
		HomeComponent,
		ImprintComponent,
		PrivacyComponent,
		AllgemeinComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ApiModule,
		MatNativeDateModule,
		TranslateModule.forRoot({
			defaultLanguage: "de",
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [HttpClient]
			}
		}),
		SharedModule,
		MaterialModule,
		LayoutModule,
		AuthModule,
		CovidTestModule
	],
	providers: [
		{ provide: BASE_PATH, useValue: environment.API_BASE_PATH },
		{ provide: LOCALE_ID, useValue: "de" },
		{ provide: MAT_DATE_LOCALE, useValue: "de" }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
