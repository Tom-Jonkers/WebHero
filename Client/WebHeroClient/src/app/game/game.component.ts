import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import JSZip from 'jszip';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  public md5: string = "epic fail";


  constructor(private route: ActivatedRoute, private http: HttpService) {
    
  }

  async ngOnInit() {
    this.md5 = this.route.snapshot.paramMap.get('md5')!;

    // if (this.md5 != "")
    // {
    //   const zipUrl = "https://www.enchor.us/download?md5=" + this.md5;
    //   await this.loadZipFromUrl(zipUrl);
    // }
    console.log("🤓💖💖🤓");
    var songChart = await this.http.getSongChart(this.md5);
    console.log(songChart);
    console.log("🤓💖💖🤓");

  }

  // async loadZipFromUrl(url: string) {
  //   try {
  //   const response = await fetch(url, { redirect: 'follow', credentials: 'include' });

  //   console.log('Status:', response.status);
  //   console.log('Content-Type:', response.headers.get('Content-Type'));

  //   if (!response.ok) {
  //     throw new Error(`HTTP ${response.status} – ${response.statusText}`);
  //   }

  //   // Use arrayBuffer to handle binary ZIP files
  //   const arrayBuffer = await response.arrayBuffer();

  //   const zip = await JSZip.loadAsync(arrayBuffer);
  //   console.log('ZIP loaded successfully:', zip);

  // } catch (error) {
  //   console.error('Error loading ZIP:', error);
  // }
  // }

}