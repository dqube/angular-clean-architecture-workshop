import { Component, OnInit } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";

@Component({
  selector: "app-rtl-sidebar",
  templateUrl: "./rtl-sidebar.component.html",
  styleUrls: ["./rtl-sidebar.component.scss"]
})
export class RtlSidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
