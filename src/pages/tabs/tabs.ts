import { ContactPage } from './../contact/contact';
import { AboutPage } from './../about/about';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  homePage = HomePage;
  aboutPage = AboutPage;
  contactPage = ContactPage;
  
}
