import { Component, OnInit } from '@angular/core';
import { SheetService } from 'src/app/services/sheet.service';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit {

  data: any = [];

  constructor(public sheetService: SheetService) { }

  ngOnInit(): void {
    this.sheetService.getStats().subscribe(res => {
      this.data = res;
      console.log(this.data);
    })
  }

  public getData() {
    this.data= this.sheetService.getStats();
  }

}
