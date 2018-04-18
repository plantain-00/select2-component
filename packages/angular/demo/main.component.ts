import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms'

import { Select2Option, Select2Data } from '../dist/'
import { data1, data2, data3, data5, data12 } from 'select2-component/demo/'

@Component({
  selector: 'app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="width: 500px;">
      <a href="https://github.com/plantain-00/select2-component/tree/master/packages/angular/demo" target="_blank">the source code of the demo</a>
      <h3>options in group ({{value1}})</h3>
      <select2 [data]="data1"
        [value]="value1"
        (update)="update1($event)">
      </select2>
      <h3>options ({{value2}})</h3>
      <select2 [data]="data2"
        [value]="value2"
        (update)="update2($event)">
      </select2>
      <h3>less options ({{value3}})</h3>
      <select2 [data]="data3"
        [value]="value3"
        (update)="update3($event)">
      </select2>
      <h3>disabled ({{value4}})</h3>
      <select2 [data]="data4"
        [value]="value4"
        [disabled]="true">
      </select2>
      <h3>hide search box ({{value5}})</h3>
      <select2 [data]="data5"
        [value]="value5"
        [minCountForSearch]="minCountForSearch"
        (update)="update5($event)">
      </select2>
      <h3>placeholder ({{value6}})</h3>
      <select2 [data]="data6"
        placeholder="select an item"
        (update)="update6($event)">
      </select2>
      <h3>open and search event ({{value7}})</h3>
      <select2 [data]="data7"
        customSearchEnabled="true"
        (open)="open7()"
        (search)="search7($event)"
        (update)="update7($event)">
      </select2>
      <h3>multiple ({{value9}})</h3>
      <select2 [data]="data9"
        [value]="value9"
        multiple="true"
        (update)="update9($event)">
      </select2>
      <h3>form binding ({{value10}})</h3>
      <form [formGroup]="ctrlForm">
        <select2
          [(ngModel)]="value10"
          [data]="data10"
          formControlName="test10"
          placeholder="Select a state"
          material
          ></select2>
        <button (click)="reset10()">reset</button>
        <button (click)="change10()">Utah</button>
      </form>
      <h3>material style ({{value11}})</h3>
      <select2 [data]="data11"
        [value]="value11"
        (update)="update11($event)"
        material>
      </select2>
      <h3>boolean value ({{value12}})</h3>
      <select2 [data]="data12"
        [value]="value12"
        (update)="update12($event)">
      </select2>
    </div>
    `
})
export class MainComponent {
  data1 = data1
  data2 = data2
  data3 = data3
  data4: Select2Data = JSON.parse(JSON.stringify(data3))
  data5 = data5
  data6: Select2Data = JSON.parse(JSON.stringify(data3))
  data7: Select2Option[] = []
  data9: Select2Data = JSON.parse(JSON.stringify(data1))
  data10: Select2Data = JSON.parse(JSON.stringify(data1))
  data11: Select2Data = JSON.parse(JSON.stringify(data1))
  data12 = data12

  minCountForSearch = Infinity

  ctrlForm: FormGroup

  value1 = 'CA'
  value2 = 'CA'
  value3 = 'foo'
  value4 = 'bar'
  value5 = 'foo3'
  value6 = ''
  value7 = ''
  value9: string[] = []
  value10 = 'CA'
  value11 = 'CA'
  value12 = true

  constructor (private fb: FormBuilder) {
    this.ctrlForm = this.fb.group({
      test10: new FormControl(null, Validators.required)
    })
  }

  update1 (value: string) {
    this.value1 = value
  }
  update2 (value: string) {
    this.value2 = value
  }
  update3 (value: string) {
    this.value3 = value
  }
  update5 (value: string) {
    this.value5 = value
  }
  update6 (value: string) {
    this.value6 = value
  }
  open7 () {
    this.data7 = JSON.parse(JSON.stringify(data2))
  }
  update7 (value: string) {
    this.value7 = value
  }
  search7 (text: string) {
    this.data7 = text
            ? (JSON.parse(JSON.stringify(data2)) as Select2Option[]).filter(option => option.label.toLowerCase().indexOf(text.toLowerCase()) > -1)
            : JSON.parse(JSON.stringify(data2))
  }
  update9 (value: string[]) {
    this.value9 = value
  }
  reset10 () {
    const test10 = this.ctrlForm.get('test10')
    if (test10) {
      test10.reset()
    }
  }
  change10 () {
    const test10 = this.ctrlForm.get('test10')
    if (test10) {
      test10.setValue('UT')
    }
  }
  update11 (value: string) {
    this.value11 = value
  }
  update12 (value: boolean) {
    this.value12 = value
  }
}
