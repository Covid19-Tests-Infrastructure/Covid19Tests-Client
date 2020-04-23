import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PrivateOrderComponent } from "./private-order.component";

describe("PrivateOrderComponent", () => {
	let component: PrivateOrderComponent;
	let fixture: ComponentFixture<PrivateOrderComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ PrivateOrderComponent ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PrivateOrderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
