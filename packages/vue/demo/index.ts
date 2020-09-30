import { createApp, defineComponent, PropType } from 'vue'
import { Select2 } from '../dist/'
import { Select2Option, Select2Data, Select2Group, AutoComplete } from '../dist/'
import { data1, data2, data3, data5, data12 } from 'select2-component/demo/'

const customOptionComponentName = 'custom-option'

const CustomOption = defineComponent({
  template: `<span>{{option.label}}<span style="float:right;color:red">{{option.value}}</span></span>`,
  props: {
    option: {
      type: Object as PropType<Select2Option>,
      required: true,
    }
  }
})

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

const App = defineComponent({
  data: () => {
    return {
      data1,
      data2,
      data3,
      data4: JSON.parse(JSON.stringify(data3)) as Select2Data,
      data5,
      data6: JSON.parse(JSON.stringify(data3)) as Select2Data,
      data7: [] as Select2Option[],
      data8,
      data9: JSON.parse(JSON.stringify(data1)) as Select2Data,
      data12,
      data14: data1,
      value1: 'CA',
      value2: 'CA',
      value3: 'foo',
      value4: 'bar',
      value5: 'foo3',
      value6: '',
      value7: '',
      value8: 'CA',
      value9: [] as string[],
      value12: true,
      value13: '',
      value14: 'CA',
    }
  },
  computed: {
    data13(): Select2Data {
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
  },
  methods: {
    update1(value: string) {
      this.value1 = value
    },
    update2(value: string) {
      this.value2 = value
    },
    update3(value: string) {
      this.value3 = value
    },
    update5(value: string) {
      this.value5 = value
    },
    update6(value: string) {
      this.value6 = value
    },
    open7() {
      this.data7 = JSON.parse(JSON.stringify(data2))
    },
    update7(value: string) {
      this.value7 = value
    },
    search7(text: string) {
      this.data7 = text
        ? (JSON.parse(JSON.stringify(data2)) as Select2Option[]).filter(option => option.label.toLowerCase().indexOf(text.toLowerCase()) > -1)
        : JSON.parse(JSON.stringify(data2))
    },
    update8(value: string) {
      this.value8 = value
    },
    update9(value: string[]) {
      this.value9 = value
    },
    update12(value: boolean) {
      this.value12 = value
    },
    keydown(e: KeyboardEvent) {
      console.info(e.key)
    },
    update13(value: string) {
      this.value13 = value
    },
    update14(value: string) {
      this.value14 = value
    },
  },
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
        :custom-search-enabled="true"
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
        :multiple="true"
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
        :minimumInputLength="2"
        :maximumInputLength="10"
        :keepSearchText="true"
        @update="update14($event)">
      </select2>
    </div>
    `
})

const app = createApp(App)
app.component('select2', Select2)
app.component(customOptionComponentName, CustomOption)
app.component('auto-complete', AutoComplete)
app.mount('#container')
