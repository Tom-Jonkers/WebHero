// lui il affiche une seule chanson et il va permettre a l'utilisateur de la partir dans l'interface WebGL
import { ColorThiefService } from '@soarlin/angular-color-thief';
import { Component, Input, ElementRef } from '@angular/core';
import { Song } from '../../../models/song';
import { Router } from '@angular/router';

@Component({
    selector: 'app-song-tile',
    imports: [],
    templateUrl: './song-tile.component.html',
    styleUrl: './song-tile.component.css'
})
export class SongTileComponent {
  @Input({ required: true }) song!: Song;

  public visualDifficulty: string = ""
  public visualDifficultyBlank: string = ""
  public visualLength: string = ""
  public palette: number[][] = []
  public gradient: string[] = []

  constructor(private colorThief: ColorThiefService, private el: ElementRef<HTMLElement>, private router: Router) {}

  async ngOnInit() {
    for (let i: number = 0; i < 7; i++)
    {
      if (i <= this.song.difficulty)
        this.visualDifficulty += "★ "
      else
        this.visualDifficultyBlank += "★ "
    }

    this.visualLength = Math.floor(this.song.length / 60) + ":" + String(this.song.length % 60).padStart(2, '0')

    await this.loadPaletteFromUrl()
    this.generateGradient()


  }

  async loadPaletteFromUrl() {
    var proxyURL = 'https://images.weserv.nl/?url=' + encodeURIComponent(this.song.imageURL.replace(/^https?:\/\//i, '')) + '&w=400';
    try {
      const resp = await fetch(proxyURL);
      const blob = await resp.blob();
      const objectUrl = URL.createObjectURL(blob);
      this.palette = await this.colorThief.getPaletteFromUrl(objectUrl, 5);
    } catch (error) {
      console.error('Failed to load image:', error);
    }
  }

  generateGradient() {
    var array: { color: number[]; cmpVal: number }[] = [];
    for (let i = 0; i < Math.min(3, this.palette.length); i++) {
      const color = this.palette[i];
      const max = Math.floor(Math.max(...color) / 255 * 100);
      const min = Math.floor(Math.min(...color) / 255 * 100);

      var sat = (max / min) / max;
      var val = max;

      var cmpVal = sat + val;

      var colorCMP = { color, cmpVal };
      array.push(colorCMP);
    }

    array.sort((a, b) => a.cmpVal - b.cmpVal);
    array.shift();
    
    for (let color of array)
    {
      this.gradient.push("#" + color.color[0].toString(16) + color.color[1].toString(16) + color.color[2].toString(16))
    }

    for (let i = 0; i < this.gradient.length; i++) {
      this.el.nativeElement.style.setProperty(`--g${i}`, this.gradient[i]);
    }
  
  }

  playSong() {
    this.router.navigate(['/play', this.song.hash]);
  }
}
