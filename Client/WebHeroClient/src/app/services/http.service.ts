import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Song } from '../models/song';
import { SearchQuery } from '../models/searchQuery';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http : HttpClient) { }

  private link : string = "https://localhost:7174/"

  async getSongs(searchQuery: SearchQuery): Promise<Song[]>{
  let x = await lastValueFrom(this.http.post<any>("https://api.enchor.us/search/advanced", searchQuery));
  console.log(x)

  var convertedArray: Song[] = [];

  for (let song of x.data)
  {
    const guitarEntryCount = song?.notesData?.noteCounts?.find((nc: any) => nc.instrument === 'guitar');
    const guitarCount = guitarEntryCount?.count ?? 0;

    const guitarEntryNPS = song?.notesData?.maxNps?.find((nc: any) => nc.instrument === 'guitar');
    const guitarNPS = guitarEntryNPS?.nps ?? 0;


    convertedArray.push(
      new Song(
        song.name,
        song.artist,
        song.year,
        song.album,
        Math.floor(song.song_length / 1000),
        guitarCount,
        guitarNPS,
        song.diff_guitar,
        "https://files.enchor.us/" + song.albumArtMd5 + ".jpg",
        song.md5


        // public name: string,
        // public artist: string,
        // public year: string,
        // public album: string,
        // public length: number, // seconds
        // public noteCount: number,
        // public NPS: number,
        // public difficulty: number, // out of 7
        // public imageURL: string,
        // public hash: string
      )
    )
  }
  return convertedArray
}

}
