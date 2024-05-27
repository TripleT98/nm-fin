import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fall-back',
  standalone: true,
  imports: [],
  templateUrl: './fall-back.component.html',
  styleUrl: './fall-back.component.scss'
})
export class FallBackComponent {

  @Input() text: string = 'This list is empty!';

}
