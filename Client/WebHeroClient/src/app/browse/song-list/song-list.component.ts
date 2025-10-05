// lui y va afficher la liste des SongTile

import { Component, Input } from '@angular/core';
import { Song } from '../../models/song';
import { SongTileComponent } from './song-tile/song-tile.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-song-list',
    imports: [SongTileComponent, CommonModule],
    templateUrl: './song-list.component.html',
    styleUrl: './song-list.component.css'
})
export class SongListComponent {
  @Input({ required: true }) songList!: Song[];
}
