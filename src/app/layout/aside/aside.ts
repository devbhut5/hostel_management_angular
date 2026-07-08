import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aside',
  imports: [RouterLink, CommonModule],
  templateUrl: './aside.html',
  styleUrl: './aside.scss',
})
export class Aside implements OnInit, OnDestroy {

  menuList: any[] = [];
  private routerSubscription!: Subscription;

  constructor(private router: Router) { }

  ngOnInit() {
    this.getMenuList();
    this.checkActiveMenu();
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkActiveMenu();
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  getMenuList() {
    this.menuList = [
      {
        label: 'Dashboard',
        icon: 'dashboard',
        routerLink: '/dashboard'
      },
      {
        label: 'Hostel Management',
        icon: 'hostel-management',
        isOpen: false,
        children: [
          {
            label: 'Hostel',
            routerLink: '/hostel',
            icon: 'hostel'
          },
          {
            label: 'Room',
            routerLink: '/room',
            icon: 'room'
          },
        ]
      },
      {
        label: 'Student Management',
        icon: 'student-management',
        isOpen: false,
        children: [
          {
            label: 'Student',
            routerLink: '/student',
            icon: 'student'
          },
          {
            label: 'Room-Allocation',
            routerLink: '/room-allocation',
            icon: 'room-allocation'
          },
        ]
      },
      {
        label: 'Fee',
        icon: 'fee',
        routerLink: '/fee'
      },
      {
        label: 'Settings',
        icon: 'setting',
        isOpen: false,
        children: [
          {
            label: 'Hostel Information',
            routerLink: '/setting/hostel-information',
            icon: 'hostel'
          },
          {
            label: 'Fee Configuration',
            routerLink: '/setting/fee-configuration',
            icon: 'fee'
          },
        ]
      },
    ];
  }

  checkActiveMenu() {
    const currentUrl = this.router.url;
    this.menuList.forEach((menu: any) => {
      if (menu.children && menu.children.length > 0) {
        const hasActiveChild = menu.children.some((child: any) => {
          return this.isActiveRoute(currentUrl, child.routerLink);
        });
        if (hasActiveChild) {
          menu.isOpen = true;
        } else {
          menu.isOpen = false;
        }
      }
    });
  }

  isParentActive(menu: any): boolean {
    if (!menu.children) return false;
    const currentUrl = this.router.url;
    return menu.children.some((child: any) => this.isActiveRoute(currentUrl, child.routerLink));
  }

  isRouteActive(routeLink: string): boolean {
    return this.isActiveRoute(this.router.url, routeLink);
  }

  isActiveRoute(currentUrl: string, routeLink: string): boolean {
    if (!currentUrl || !routeLink) return false;
    const currentPath = currentUrl.split('?')[0].split('#')[0];
    const targetPath = routeLink.split('?')[0].split('#')[0];
    return currentPath === targetPath || currentPath.startsWith(targetPath + '/');
  }

  toggleSubmenu(menu: any) {
    if (menu.children && menu.children.length > 0) {
      const targetState = !menu.isOpen;
      // Close all submenus (accordion behavior)
      this.menuList.forEach((m: any) => {
        if (m.children) {
          m.isOpen = false;
        }
      });
      // Toggle the clicked one
      menu.isOpen = targetState;
    }
  }

}

