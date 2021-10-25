import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

import { RtlComponent } from "./rtl.component";
import { RtlRoutes } from "./rtl.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RtlRoutes),
    JwBootstrapSwitchNg2Module,
    BsDropdownModule.forRoot(),
    FormsModule
  ],
  declarations: [RtlComponent]
})
export class RtlModule {}
