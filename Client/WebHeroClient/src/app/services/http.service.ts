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

  async getSongs(searchTerm: string): Promise<Song[]>{
    var searchObject = 
    {
      search: searchTerm,
      page: 1,
      instrument: "guitar",
      difficulty: "expert",
      drumType: null,
      drumsReviewed: false,
      source: "website"}

    let x = await lastValueFrom(this.http.post<any>("https://api.enchor.us/search", searchObject));

var convertedArray: Song[] = [];

  for (let song of x.data)
  {
    const guitarEntryCount = song?.notesData?.noteCounts?.find((nc: any) => nc.instrument === 'guitar');
    const guitarCount = guitarEntryCount?.count ?? 0;

    const guitarEntryNPS = song?.notesData?.maxNps?.find((nc: any) => nc.instrument === 'guitar');
    const guitarNPS = guitarEntryNPS?.nps ?? 0;


    convertedArray.push(
      new Song(
        song.name,                                                // name
        song.artist,                                              // artist
        song.year,                                                // year
        song.album,                                               // album
        Math.floor(song.song_length / 1000),                      // length
        guitarCount,                                              // noteCount
        guitarNPS,                                                // NPS
        song.diff_guitar,                                         // Difficulty
        "https://files.enchor.us/" + song.albumArtMd5 + ".jpg",   // imageURL
        song.md5                                                  // hash
      )
    )
  }
  return convertedArray

  }

  async getSongsAdvanced(searchQuery: SearchQuery): Promise<Song[]>{
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
        song.name,                                                // name
        song.artist,                                              // artist
        song.year,                                                // year
        song.album,                                               // album
        Math.floor(song.song_length / 1000),                      // length
        guitarCount,                                              // noteCount
        guitarNPS,                                                // NPS
        song.diff_guitar,                                         // Difficulty
        "https://files.enchor.us/" + song.albumArtMd5 + ".jpg",   // imageURL
        song.md5                                                  // hash
      )
    )
  }
  return convertedArray
}

}
