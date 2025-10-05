import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http : HttpClient) { }

  private link : string = "https://localhost:7174/"

  async getSongs(){
  let x = await lastValueFrom(this.http.get<any>(this.link + "Song/GetTest/plinko"));
  console.log(x)
  return x
}

}
