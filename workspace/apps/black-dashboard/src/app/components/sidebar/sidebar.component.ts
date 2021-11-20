import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  rtlTitle: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  smallTitle?: string;
  rtlTitle: string;
  rtlSmallTitle?: string;
  type?: string;
  collapse?: string;
  children?: ChildrenItems2[];
  isCollapsed?: boolean;
}

export interface ChildrenItems2 {
  path?: string;
  smallTitle?: string;
  rtlSmallTitle?: string;
  title?: string;
  rtlTitle: string;
  type?: string;
}

//Menu Items
export const ROUTES_ORIGINAL: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'tim-icons icon-chart-pie-36',
    rtlTitle: 'لوحة القيادة'
  },
  {
    path: '/pages',
    title: 'Pages',
    type: 'sub',
    icontype: 'tim-icons icon-image-02',
    collapse: 'pages',
    rtlTitle: 'صفحات',
    isCollapsed: true,
    children: [
      {
        path: 'pricing',
        rtlTitle: ' التسعير ',
        rtlSmallTitle: 'ع ',
        title: 'Pricing',
        type: 'link',
        smallTitle: 'P'
      },
      {
        path: 'rtl',
        rtlTitle: 'دعم رتل ',
        rtlSmallTitle: 'ص',
        title: 'RTL Support',
        type: 'link',
        smallTitle: 'RS'
      },
      {
        path: 'timeline',
        rtlTitle: 'الجدول الزمني ',
        rtlSmallTitle: ' ت',
        title: 'Timeline',
        type: 'link',
        smallTitle: 'T'
      },
      {
        path: 'login',
        rtlTitle: ' تسجيل الدخول ',
        rtlSmallTitle: ' هعذا',
        title: 'Login',
        type: 'link',
        smallTitle: 'L'
      },
      {
        path: 'register',
        rtlTitle: ' تسجيل',
        rtlSmallTitle: 'ص ',
        title: 'Register',
        type: 'link',
        smallTitle: 'R'
      },
      {
        path: 'lock',
        rtlTitle: 'اقفل الشاشة ',
        rtlSmallTitle: 'هذاع ',
        title: 'Lock Screen',
        type: 'link',
        smallTitle: 'LS'
      },
      {
        path: 'profile',
        rtlTitle: 'ملف تعريفي للمستخدم',
        rtlSmallTitle: ' شع',
        title: 'User Profile',
        type: 'link',
        smallTitle: 'UP'
      }
    ]
  },
  {
    path: '/components',
    title: 'Components',
    type: 'sub',
    icontype: 'tim-icons icon-molecule-40',
    collapse: 'components',
    isCollapsed: true,
    rtlTitle: '  المكونات',
    children: [
      {
        path: 'multilevel',
        isCollapsed: true,
        title: 'Multilevel Collapse',
        type: 'sub',
        smallTitle: 'MLT',
        rtlTitle: 'انهيار متعدد المستويات',
        rtlSmallTitle: ' ر',
        collapse: 'multilevel',
        children: [
          {
            path: 'buttons',
            rtlTitle: 'مثال ',
            rtlSmallTitle: 'ش ',
            title: 'Buttons',
            type: 'link',
            smallTitle: 'B'
          }
        ]
      },
      {
        path: 'buttons',
        rtlTitle: 'مثال ',
        rtlSmallTitle: 'ش ',
        title: 'Buttons',
        type: 'link',
        smallTitle: 'B'
      },
      {
        path: 'grid',
        rtlTitle: ' نظام الشبكة ',
        rtlSmallTitle: 'زو ',
        title: 'Grid System',
        type: 'link',
        smallTitle: 'GS'
      },
      {
        path: 'panels',
        rtlTitle: ' لوحات ',
        rtlSmallTitle: 'ع',
        title: 'Panels',
        type: 'link',
        smallTitle: 'P'
      },
      {
        path: 'sweet-alert',
        rtlTitle: 'التنبيه الحلو ',
        rtlSmallTitle: ' ومن',
        title: 'Sweet Alert',
        type: 'link',
        smallTitle: 'SA'
      },
      {
        path: 'notifications',
        rtlTitle: 'إخطارات ',
        rtlSmallTitle: 'ن ',
        title: 'Notifications',
        type: 'link',
        smallTitle: 'N'
      },
      {
        path: 'icons',
        rtlTitle: 'الرموز ',
        rtlSmallTitle: ' و',
        title: 'Icons',
        type: 'link',
        smallTitle: 'I'
      },
      {
        path: 'typography',
        rtlTitle: 'طباعة ',
        rtlSmallTitle: ' ر',
        title: 'Typography',
        type: 'link',
        smallTitle: 'T'
      }
    ]
  },
  {
    path: '/maps',
    title: 'Maps',
    type: 'sub',
    rtlTitle: '  خرائط',
    icontype: 'tim-icons icon-pin',
    collapse: 'maps',
    isCollapsed: true,
    children: [
      {
        path: 'google',
        rtlTitle: ' خرائط جوجل ',
        rtlSmallTitle: 'ز ',
        title: 'Google Maps',
        type: 'link',
        smallTitle: 'GM'
      },
      {
        path: 'full-screen',
        rtlTitle: 'خريطة كاملة الشاشة ',
        rtlSmallTitle: ' وو',
        title: 'Full Screen Map',
        type: 'link',
        smallTitle: 'FSM'
      },
      {
        path: 'vector',
        rtlTitle: ' سهم التوجيه، الخريطة',
        rtlSmallTitle: ' تم',
        title: 'Vector Map',
        type: 'link',
        smallTitle: 'VM'
      }
    ]
  }
];

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'tim-icons icon-chart-pie-36',
    rtlTitle: 'لوحة القيادة'
  },
  {
    path: '/accounts',
    title: 'Accounts',
    type: 'link',
    icontype: 'tim-icons icon-chart-pie-36',
    rtlTitle: ''
  }
];

@Component({
  selector: 'buildmotion-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
