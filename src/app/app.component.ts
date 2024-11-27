import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RickAndMortyService } from './services/rick-and-morty.service';
import { CharacterListComponent } from './components/character-list/character-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, CharacterListComponent],
})
export class AppComponent implements OnInit {
  characters: any[] = [];
  nextPage: string | null = null;
  prevPage: string | null = null;

  constructor(private rickAndMortyService: RickAndMortyService) {}

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters(page: number = 1) {
    this.rickAndMortyService.getCharacters(page).subscribe(
      (data: any) => {
        this.characters = data.results;
        this.nextPage = data.info.next;
        this.prevPage = data.info.prev;
      },
      (error) => {
        console.error('Error al cargar los personajes', error);
      }
    );
  }

  goToNextPage() {
    if (this.nextPage) {
      const page = this.extractPageNumber(this.nextPage);
      this.loadCharacters(page);
    }
  }

  goToPreviousPage() {
    if (this.prevPage) {
      const page = this.extractPageNumber(this.prevPage);
      this.loadCharacters(page);
    }
  }

  extractPageNumber(url: string): number {
    const match = url.match(/page=(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  }
}
