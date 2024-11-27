export interface Character {
    id: number;
    name: string;
    image: string;
    status: string;
    species: string;
    location: { name: string };
  }
  
  export interface ApiResponse {
    results: Character[];
    info: { next: string; prev: string };
  }
  