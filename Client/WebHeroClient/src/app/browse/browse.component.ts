import { SearchQuery } from './../models/searchQuery';
// en gros lui y va effectuer la recherche de chansons et recracher la liste des chansons dans SongList

import { Component, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
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

  const searchQuery = new SearchQuery()

  this.songs = await this.http.getSongs(searchQuery);

  }


}
