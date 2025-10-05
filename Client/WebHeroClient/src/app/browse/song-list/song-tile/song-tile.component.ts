// lui il affiche une seule chanson et il va permettre a l'utilisateur de la partir dans l'interface WebGL

import { Component, Input } from '@angular/core';
import { Song } from '../../../models/song';

@Component({
  selector: 'app-song-tile',
  standalone: true,
  imports: [],
  templateUrl: './song-tile.component.html',
  styleUrl: './song-tile.component.css'
})
export class SongTileComponent {
  @Input({ required: true }) song!: Song;

  public visualDifficulty: string = ""

  ngOnInit() {
    for (let i: number = 0; i < 7; i++)
    {
      if (i <= this.song.difficulty)
        this.visualDifficulty += "★ "
      else
        this.visualDifficulty += "☆ "
    }
  }
}
