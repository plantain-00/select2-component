import Vue from 'vue'
import Component from 'vue-class-component'
import '../dist/'
import { Select2Option, Select2Data, Select2Group, AutoComplete } from '../dist/'
import { data1, data2, data3, data5, data12 } from 'select2-component/demo/'

const customOptionComponentName = 'custom-option'

@Component({
  template: `<span>{{option.label}}<span style="float:right;color:red">{{option.value}}</span></span>`,
  props: ['option']
})
class CustomOption extends Vue {
  option!: Select2Option
}
Vue.component(customOptionComponentName, CustomOption)

Vue.component('auto-complete', AutoComplete)

const data8: Select2Data = JSON.parse(JSON.stringify(data1))
for (const groupOrOption of data8) {
  const options = (groupOrOption as Select2Group).options
  if (options) {
    for (const option of options) {
      option.component = customOptionComponentName
    }
  } else {
    (options as Select2Option).component = customOptionComponentName
  }
}

@Component({
  template: `
    <div style="width: 500px;">
      <a href="https://github.com/plantain-00/select2-component/tree/master/packages/vue/demo" target="_blank">the source code of the demo</a>
      <h3>options in group ({{value1}})</h3>
      <select2 :data="data1"
        :value="value1"
        @update="update1($event)">
      </select2>
      <h3>options ({{value2}})</h3>
      <select2 :data="data2"
        :value="value2"
        @update="update2($event)">
      </select2>
      <h3>less options ({{value3}})</h3>
      <select2 :data="data3"
        :value="value3"
        @update="update3($event)">
      </select2>
      <h3>disabled ({{value4}})</h3>
      <select2 :data="data4"
        :value="value4"
        :disabled="true">
      </select2>
      <h3>hide search box ({{value5}})</h3>
      <select2 :data="data5"
        :value="value5"
        :min-count-for-search="Infinity"
        @update="update5($event)">
      </select2>
      <h3>placeholder ({{value6}})</h3>
      <select2 :data="data6"
        placeholder="select an item"
        @update="update6($event)">
      </select2>
      <h3>open and search event ({{value7}})</h3>
      <select2 :data="data7"
        custom-search-enabled="true"
        @open="open7()"
        @search="search7($event)"
        @keydown="keydown($event)"
        @update="update7($event)">
      </select2>
      <h3>custom component ({{value8}})</h3>
      <select2 :data="data8"
        :value="value8"
        @update="update8($event)">
      </select2>
      <h3>multiple ({{value9}})</h3>
      <select2 :data="data9"
        :value="value9"
        multiple="true"
        @update="update9($event)">
      </select2>
      <h3>boolean value ({{value12}})</h3>
      <select2 :data="data12"
        :value="value12"
        @update="update12($event)">
      </select2>
      <h3>auto complete ({{value13}})</h3>
      <auto-complete :data="data13"
        :value="value13"
        @search="update13($event)"
        @select="update13($event)">
      </auto-complete>
      <h3>min and max ({{value14}})</h3>
      <select2 :data="data14"
        :value="value14"
        minimumInputLength="2"
        maximumInputLength="10"
        :keepSearchText="true"
        @update="update14($event)">
      </select2>
    </div>
    `
})
class App extends Vue {
  data1 = data1
  data2 = data2
  data3 = data3
  data4: Select2Data = JSON.parse(JSON.stringify(data3))
  data5 = data5
  data6: Select2Data = JSON.parse(JSON.stringify(data3))
  data7: Select2Option[] = []
  data8 = data8
  data9: Select2Data = JSON.parse(JSON.stringify(data1))
  data12 = data12
  get data13(): Select2Data {
    return this.value13
      ? [
        {
          value: this.value13,
          label: this.value13,
        },
        {
          value: this.value13 + this.value13,
          label: this.value13 + this.value13,
        },
        {
          value: this.value13 + this.value13 + this.value13,
          label: this.value13 + this.value13 + this.value13,
        },
      ]
      : []
  }
  data14 = data1

  value1 = 'CA'
  value2 = 'CA'
  value3 = 'foo'
  value4 = 'bar'
  value5 = 'foo3'
  value6 = ''
  value7 = ''
  value8 = 'CA'
  value9: string[] = []
  value12 = true
  value13 = ''
  value14 = 'CA'

  update1(value: string) {
    this.value1 = value
  }
  update2(value: string) {
    this.value2 = value
  }
  update3(value: string) {
    this.value3 = value
  }
  update5(value: string) {
    this.value5 = value
  }
  update6(value: string) {
    this.value6 = value
  }
  open7() {
    this.data7 = JSON.parse(JSON.stringify(data2))
  }
  update7(value: string) {
    this.value7 = value
  }
  search7(text: string) {
    this.data7 = text
      ? (JSON.parse(JSON.stringify(data2)) as Select2Option[]).filter(option => option.label.toLowerCase().indexOf(text.toLowerCase()) > -1)
      : JSON.parse(JSON.stringify(data2))
  }
  update8(value: string) {
    this.value8 = value
  }
  update9(value: string[]) {
    this.value9 = value
  }
  update12(value: boolean) {
    this.value12 = value
  }
  keydown(e: KeyboardEvent) {
    console.info(e.key)
  }
  update13(value: string) {
    this.value13 = value
  }
  update14(value: string) {
    this.value14 = value
  }
}

new App({ el: '#container' })
