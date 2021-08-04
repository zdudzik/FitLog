import { Component, OnInit } from '@angular/core';
import { SheetService } from 'src/app/services/sheet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: any = [];

  constructor(public sheetService: SheetService) { }

  ngOnInit(): void {
    this.sheetService.getStats().subscribe(res => {
      this.data = res;
      console.log(this.data);
    })
  }

  

  public getData() {
    this.data.push(this.sheetService.getStats());
  }

}
