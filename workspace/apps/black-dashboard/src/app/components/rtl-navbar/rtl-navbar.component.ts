import { Component, OnInit, ElementRef } from "@angular/core";
import { Location } from "@angular/common";
import { ROUTES } from "../sidebar/sidebar.component";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

var misc: any = {
  sidebar_mini_active: true
};

@Component({
  selector: "app-rtl-navbar",
  templateUrl: "./rtl-navbar.component.html",
  styleUrls: ["./rtl-navbar.component.scss"]
})
export class RtlNavbarComponent implements OnInit {
  isCollapsed = true;
  location: Location;
  private toggleButton: any;

  private listTitles: any[];
  constructor(location: Location, public toastr: ToastrService, private element: ElementRef,
  private router: Router,) {
    this.location = location;
  }
  minimizeSidebar() {
    const body = document.getElementsByTagName("body")[0];
    if (body.classList.contains("sidebar-mini")) {
      misc.sidebar_mini_active = true;
    } else {
      misc.sidebar_mini_active = false;
    }
    if (misc.sidebar_mini_active === true) {
      body.classList.remove("sidebar-mini");
      misc.sidebar_mini_active = false;
      this.showSidebarMessage("الشريط الجانبي الصغير غير نشط ...");
    } else {
      body.classList.add("sidebar-mini");
      this.showSidebarMessage("الشريط الجانبي الصغير مفعل ...");
      misc.sidebar_mini_active = true;
    }

    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(function() {
      window.dispatchEvent(new Event("resize"));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(function() {
      clearInterval(simulateWindowResize);
    }, 1000);
  }
  showSidebarMessage(message) {
    this.toastr.show(
      '<span data-notify="icon" class="tim-icons icon-bell-55"></span>',
      message,
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: "toast-top-center"
      }
    );
  }
  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.router.events.subscribe(event => {
      this.sidebarClose();
    });
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = <HTMLElement>(
      document.getElementsByTagName("body")[0]
    );
    const html = document.getElementsByTagName("html")[0];
    if (window.innerWidth < 991) {
      body.style.position = "fixed";
    }

    setTimeout(function() {
      toggleButton.classList.add("toggled");
    }, 500);

    html.classList.add("nav-open");
    var $layer = document.createElement('div');
    $layer.setAttribute('id', 'bodyClick');


    if (html.getElementsByTagName('body')) {
        document.getElementsByTagName('body')[0].appendChild($layer);
    }
    var $toggle = document.getElementsByClassName("navbar-toggler")[0];
    $layer.onclick = function() { //asign a function
      html.classList.remove('nav-open');
      setTimeout(function() {
          $layer.remove();
          $toggle.classList.remove('toggled');
      }, 400);
      const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];

      if (window.innerWidth < 991) {
        setTimeout(function(){
          mainPanel.style.position = '';
        }, 500);
      }
    }.bind(this);

    html.classList.add('nav-open');
  }
  sidebarClose() {
    const html = document.getElementsByTagName("html")[0];
    this.toggleButton.classList.remove("toggled");
    const body = <HTMLElement>(
      document.getElementsByTagName("body")[0]
    );

    if (window.innerWidth < 991) {
      setTimeout(function() {
        body.style.position = "";
      }, 500);
    }
    var $layer: any = document.getElementById("bodyClick");
    if ($layer) {
      $layer.remove();

    }
    html.classList.remove("nav-open");
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.split("/")[2];

    for (let i = 0; i < this.listTitles.length; i++) {
      if (this.listTitles[i].type === "sub") {
        for (let j = 0; j < this.listTitles[i].children.length; j++) {
          if (this.listTitles[i].children[j].path === titlee) {
            return this.listTitles[i].children[j].rtlTitle;
          }
        }
      }
    }

    return "لوحة القيادة";
  }
}
