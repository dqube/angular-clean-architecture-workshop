/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import { ToastrService } from 'ngx-toastr';
import { ComponentBase } from '@buildmotion/foundation';
import { LoggingService } from '@buildmotion/logging';

const misc: any = {
  sidebar_mini_active: true
};

@Component({
  selector: 'buildmotion-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent extends ComponentBase implements OnInit {
  constructor(loggingService: LoggingService, router: Router, public toastr: ToastrService) {
    super('AdminLayoutComponent', loggingService, router);
  }
  @HostListener('window:scroll', ['$event'])
  showNavbarButton = () => {
    const mainPanel: any = document.getElementsByClassName('main-panel')[0];
    const navbarMinimize: any = document.getElementsByClassName(
      'navbar-minimize-fixed'
    )[0];

    if (
      document.documentElement.scrollTop > 50 ||
      document.scrollingElement.scrollTop > 50 ||
      mainPanel.scrollTop > 50
    ) {
      navbarMinimize.style.opacity = 1;
    } else if (
      document.documentElement.scrollTop <= 50 ||
      document.scrollingElement.scrollTop <= 50 ||
      mainPanel.scrollTop <= 50
    ) {
      navbarMinimize.style.opacity = 0;
    }
  };

  ngOnInit() {
    const mainPanel: any = document.getElementsByClassName('main-panel')[0];
    const sidebar: any = document.getElementsByClassName('sidebar-wrapper')[0];

    if (navigator.platform.indexOf('Win') > -1) {
      document.documentElement.className += ' perfect-scrollbar-on';
      document.documentElement.classList.remove('perfect-scrollbar-off');
      let ps = new PerfectScrollbar(mainPanel);
      ps = new PerfectScrollbar(sidebar);
      const tables: any = document.querySelectorAll('.table-responsive');
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    this.showNavbarButton();
  }

  minimizeSidebar() {
    const body = document.getElementsByTagName('body')[0];
    if (body.classList.contains('sidebar-mini')) {
      misc.sidebar_mini_active = true;
    } else {
      misc.sidebar_mini_active = false;
    }
    if (misc.sidebar_mini_active === true) {
      body.classList.remove('sidebar-mini');
      misc.sidebar_mini_active = false;
      this.showSidebarMessage('Sidebar mini deactivated...');
    } else {
      body.classList.add('sidebar-mini');
      this.showSidebarMessage('Sidebar mini activated...');
      misc.sidebar_mini_active = true;
    }

    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(function() {
      window.dispatchEvent(new Event('resize'));
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
        toastClass: 'alert alert-danger alert-with-icon',
        positionClass: 'toast-top-right'
      }
    );
  }
}
