import { Routes } from "@angular/router";

import { RtlComponent } from "./rtl.component";

export const RtlRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "rtl",
        component: RtlComponent
      }
    ]
  }
];
