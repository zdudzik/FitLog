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

    let statsObj = {
      runningStats: {
        milesRun: [],
        avgDist: [],
        avgPace: [],
        longestRun: [],
      },
      gymStats: {
        numVisits: [],
        totalTime: [],
        avgTime: [],
      },
      mostRecent: {
        runDate: -1,
        runTime: -1,
        runDist: -1,
        gymDate: -1,
        gymTime: -1,
      }
    }

    return this.http.get(url)
      .pipe(
        map((res: any) => {
          const data = res.feed.entry;
          const returnArray: Array<any> = [];
          if (data && data.length > 0) {
            let i = 0;
            data.forEach((entry: any) => {
              let obj = {};
              switch (i) {
                case 0: // miles run & num visits
                  // running
                  statsObj.runningStats.milesRun.push(entry.gsx$pastweek.$t);
                  statsObj.runningStats.milesRun.push(entry.gsx$thismonth.$t);
                  statsObj.runningStats.milesRun.push(entry.gsx$thisyear.$t);
                  statsObj.runningStats.milesRun.push(entry.gsx$alltime.$t);
                  // gym
                  statsObj.gymStats.numVisits.push(entry.gsx$pastweek_2.$t);
                  statsObj.gymStats.numVisits.push(entry.gsx$thismonth_2.$t);
                  statsObj.gymStats.numVisits.push(entry.gsx$thisyear_2.$t);
                  statsObj.gymStats.numVisits.push(entry.gsx$alltime_2.$t);
                  break;
                case 1: // avg dist and total time
                  // running
                  statsObj.runningStats.avgDist.push(entry.gsx$pastweek.$t);
                  statsObj.runningStats.avgDist.push(entry.gsx$thismonth.$t);
                  statsObj.runningStats.avgDist.push(entry.gsx$thisyear.$t);
                  statsObj.runningStats.avgDist.push(entry.gsx$alltime.$t);
                  // gym
                  statsObj.gymStats.totalTime.push(entry.gsx$pastweek_2.$t);
                  statsObj.gymStats.totalTime.push(entry.gsx$thismonth_2.$t);
                  statsObj.gymStats.totalTime.push(entry.gsx$thisyear_2.$t);
                  statsObj.gymStats.totalTime.push(entry.gsx$alltime_2.$t);
                  break;
                case 2: // avg pace and avg time
                  // running
                  statsObj.runningStats.avgPace.push(entry.gsx$pastweek.$t);
                  statsObj.runningStats.avgPace.push(entry.gsx$thismonth.$t);
                  statsObj.runningStats.avgPace.push(entry.gsx$thisyear.$t);
                  statsObj.runningStats.avgPace.push(entry.gsx$alltime.$t);
                  // gym
                  statsObj.gymStats.avgTime.push(entry.gsx$pastweek_2.$t);
                  statsObj.gymStats.avgTime.push(entry.gsx$thismonth_2.$t);
                  statsObj.gymStats.avgTime.push(entry.gsx$thisyear_2.$t);
                  statsObj.gymStats.avgTime.push(entry.gsx$alltime_2.$t);
                  break;
                case 3: // longest run
                  // running
                  statsObj.runningStats.longestRun.push(entry.gsx$pastweek.$t);
                  statsObj.runningStats.longestRun.push(entry.gsx$thismonth.$t);
                  statsObj.runningStats.longestRun.push(entry.gsx$thisyear.$t);
                  statsObj.runningStats.longestRun.push(entry.gsx$alltime.$t);
                  // recents (these are labelled incorrectly and a little janky, but data is correct)
                  statsObj.mostRecent.runDate = entry.gsx$gym.$t;
                  statsObj.mostRecent.runTime = entry.gsx$thismonth_2.$t;
                  statsObj.mostRecent.runDist = entry.gsx$pastweek_2.$t;
                  statsObj.mostRecent.gymDate = entry.gsx$thisyear_2.$t;
                  statsObj.mostRecent.gymTime = entry.gsx$alltime_2.$t;
                  break;
              }
              i++
            });
          }
          return statsObj;
        })
      );
  }
}