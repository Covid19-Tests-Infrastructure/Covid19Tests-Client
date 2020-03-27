import { Component, OnInit, ViewChild } from "@angular/core";
import { UserControllerService, UserDto } from "../../../api";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
	selector: "app-user-management",
	templateUrl: "./user-management.component.html",
	styleUrls: ["./user-management.component.css"]
})
export class UserManagementComponent implements OnInit {

	users: UserDto[] = [];

	displayedColumns: string[] = ["username", "firstname", "lastname", "email", "role"];
	dataSource: MatTableDataSource<UserDto>;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private userService: UserControllerService) { }

	ngOnInit(): void {
		this.userService.getAllUsers().subscribe(
			result => {
				this.users = result;
				this.dataSource = new MatTableDataSource(this.users);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			},
			error => console.log(error)
		);
	}

	applyFilter(filterValue: string): void {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

}
