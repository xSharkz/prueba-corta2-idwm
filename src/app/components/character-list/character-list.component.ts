import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-list',
  imports: [CommonModule],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  standalone: true,
})
export class CharacterListComponent {
  @Input() characters: any[] = [];
}
