import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialModule } from "../material/material.module";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { AuthModule } from "../auth/auth.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
	declarations: [PageNotFoundComponent],
	imports: [ 
		CommonModule,
		AuthModule,
		MaterialModule
	],
	exports: [
		CommonModule,
		AuthModule,
		TranslateModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [],
})
export class SharedModule {}
