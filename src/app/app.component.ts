import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from './services/rick-and-morty.service';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, CharacterListComponent],
})
export class AppComponent implements OnInit {
  characters: any[] = [];
  nextPage: string | null = null;
  prevPage: string | null = null;
  searchName: string = '';

  constructor(private rickAndMortyService: RickAndMortyService) {}

  ngOnInit(): void {
    this.loadCharacters();
    initFlowbite();
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

  searchCharacters() {
    this.rickAndMortyService.searchCharacters(this.searchName).subscribe(
      (data: any) => {
        this.characters = data.results;
        this.nextPage = data.info.next;
        this.prevPage = data.info.prev;
      },
      (error) => {
        console.error('Error al buscar personajes', error);
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
