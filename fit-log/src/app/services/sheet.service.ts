import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  constructor(private http: HttpClient) { }
  
  public getStats(): Observable<any> {
    const sheetno="oi09udo"
    const sheetid = "194s-nX40PFQSNT9yrLd6frHD5HRoWXW0A_1S9hT5Rbc"
    const url = `https://spreadsheets.google.com/feeds/list/${sheetid}/${sheetno}/public/values?alt=json`;
  
      return this.http.get(url)
        .pipe(
          map((res: any) => {
            const data = res.feed.entry;
  
            const returnArray: Array<any> = [];
            if (data && data.length > 0) {
              data.forEach((entry: any) => {
                let obj = {};
                for (const x in entry) {
                  //if (x.includes('gsx$') && entry[x].$t) {
                    //obj[x.split('$')[1]] = entry[x]['$t'];
                  //}
                  obj = entry[x];
                }
                returnArray.push(entry);
                //returnArray.push(entry);
              });
            }
            return returnArray;
          })
        );
    }
}
