// en gros lui y va effectuer la recherche de chansons et recracher la liste des chansons dans SongList

import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { SongTileComponent } from './song-list/song-tile/song-tile.component';
import { Song } from '../models/song';
import { SongListComponent } from './song-list/song-list.component';

@Component({
    selector: 'app-browse',
    imports: [SongListComponent],
    templateUrl: './browse.component.html',
    styleUrl: './browse.component.css'
})
export class BrowseComponent {

  

  songs : Song[] = [];

  constructor(public http : HttpService) {
    
  }

  async ngOnInit() : Promise<void> {

    // TEMPORARY
    // TEMPORARY
    // TEMPORARY

  this.songs = [
    new Song(
      "Next Semester",
      "twenty one pilots",
      "2024",
      "Clancy",
      355,
      2847,
      8.02,
      3,
      "https://files.enchor.us/5ba8d49ff64a354af264cb509ebdf532.jpg",
      "supermariostyle2"
    ),
    new Song(
      "Legend",
      "twenty one pilots",
      "2018",
      "Trench",
      355,
      2847,
      8.02,
      3,
      "https://files.enchor.us/ff8183965a5aa79bae581904c4bb2b8c.jpg",
      "supermariostyle"
    ),
    new Song(
      "Bohemian Rhapsody",
      "Queen",
      "1975",
      "A Night at the Opera",
      355,
      2847,
      8.02,
      6,
      "https://files.enchor.us/1089365b1654efd07101ad9cbf10a215.jpg",
      "abc123def456"
    ),
    new Song(
      "Stairway to Heaven",
      "Led Zeppelin",
      "1971",
      "Led Zeppelin IV",
      482,
      3156,
      6.55,
      5,
      "https://files.enchor.us/0e25c24ac1ae789b79ce38de4c203e71.jpg",
      "def456ghi789"
    ),
    new Song(
      "Hotel California",
      "Eagles",
      "1976",
      "Hotel California",
      391,
      2934,
      7.51,
      4,
      "https://files.enchor.us/f7188da3d721e113147d1c387b771ff2.jpg",
      "ghi789jkl012"
    )
  ];
  // TEMPORARY
  // TEMPORARY
  // TEMPORARY
  }


}
