// en gros lui y va effectuer la recherche de chansons et recracher la liste des chansons dans SongList

import { Song } from './../models/song';
import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { SongListComponent } from './song-list/song-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-browse',
    imports: [SongListComponent, CommonModule, FormsModule],
    templateUrl: './browse.component.html',
    styleUrl: './browse.component.css'
})
export class BrowseComponent {

  searchBar : string = ""

  songs : Song[] = [];

  constructor(public http : HttpService) {
    
  }

  async ngOnInit() : Promise<void> {
    this.songs = await this.http.getSongs(this.searchBar)
  }

  async searchSongs() {

    this.songs = await this.http.getSongs(this.searchBar);

  }

  onInputChanged() {
    this.searchSongs()
  }

}
