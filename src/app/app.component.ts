import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Accessibility } from '@ionic-native/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent {
  constructor() {}

  ngOnInit() {
    Accessibility.speak()
  }
}
