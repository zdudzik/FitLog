import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SheetComponent } from './components/sheet/sheet.component';
//import { AuthGuard } from './guards/auth.guard';

const routes : Routes =[
  {
    path: '',
    component: SheetComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }