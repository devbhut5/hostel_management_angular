import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Aside } from './aside/aside';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header, Aside, Footer],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {

}
