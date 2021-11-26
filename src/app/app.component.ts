import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NgxMasonryOptions, NgxMasonryDirective, NgxMasonryAnimations } from 'ngx-masonry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'myworld-test';
  tempFormGroup: FormGroup;
  public masonryOptions: NgxMasonryOptions = {
    gutter: 30,
    itemSelector: 'masonry-item',
    columnWidth: 'masonry-item',
    horizontalOrder: true,
    fitWidth: true,
    percentPosition: true,
    animations: {},
  };

  cities = [
    'solapur',
    'pune'
  ];
  states = [
    'MH',
    'TS'
  ];
  data = [
    {
      name: 'Sachin',
      city: '',
      state: 'MH'
    },
    {
      name: 'Tejas',
      city: 'pune',
      state: 'MH'
    },
    {
      name: 'Rahul',
      city: 'pune',
      state: 'TS'
    }
  ];
  displayedColumns: string[] = ['name', 'city', 'state'];
  dataSource: MatTableDataSource<any>;
  userArray: any;

  constructor(private fb: FormBuilder) {
    this.dataSource = new MatTableDataSource();
    this.tempFormGroup = this.fb.group({
      tempFormArray: this.fb.array([])
    });
  }

  addValue(data: any): any {
   return this.fb.group({
      name: new FormControl(data.name),
      city: new FormControl(data.city),
      state: new FormControl(data.state)
    });
  }

   asFormGroup(user: any): FormGroup {
    const fg = new FormGroup({
      name: new FormControl(user.name),
      city: new FormControl(user.city),
      state: new FormControl(user.state)
    });
    return fg;
  }

  ngOnInit(): void {
  const temp = new FormArray(this.data.map(this.asFormGroup));
  this.tempFormGroup.setControl('tempFormArray', temp);
  this.dataSource = new MatTableDataSource((this.tempFormGroup.get('tempFormArray') as FormArray).controls);
  }
}
