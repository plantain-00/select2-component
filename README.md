[![Dependency Status](https://david-dm.org/plantain-00/select2-component.svg)](https://david-dm.org/plantain-00/select2-component)
[![devDependency Status](https://david-dm.org/plantain-00/select2-component/dev-status.svg)](https://david-dm.org/plantain-00/select2-component#info=devDependencies)
[![Build Status](https://travis-ci.org/plantain-00/select2-component.svg?branch=master)](https://travis-ci.org/plantain-00/select2-component)
[![npm version](https://badge.fury.io/js/select2-component.svg)](https://badge.fury.io/js/select2-component)
[![Downloads](https://img.shields.io/npm/dm/select2-component.svg)](https://www.npmjs.com/package/select2-component)

# select2-component
A vuejs, reactjs and angular select component.

#### features

+ vuejs component
+ reactjs component
+ angular component
+ commonjs module
+ select one
+ options or groups
+ scroll
+ local search
+ select by keyboard
+ disabled option
+ disabled component
+ hide search box
+ placeholder
+ custom component(vuejs and reactjs only)
+ multiple selection

#### install

`npm i select2-component`

#### link css

```html
<link rel="stylesheet" href="./node_modules/select2-component/dist/select2.min.css" />
```

#### vuejs component demo

`npm i vue vue-class-component`

```ts
import "select2-component/dist/vue";
```

```html
<select2 :data="data"
    :value="value"
    @update="update($event)">
</select2>
```

the online demo: https://plantain-00.github.io/select2-component/demo/vue/index.html

#### reactjs component demo

```ts
import { Select2 } from "select2-component/dist/react";
```

```jsx
<Select2 data={this.data}
    value={this.value}
    update={value => this.update(value)}>
</Select2>
```

the online demo: https://plantain-00.github.io/select2-component/demo/react/index.html

#### angular component demo

```ts
import { Select2Component } from "select2-component/dist/angular";

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [MainComponent, Select2Component],
    bootstrap: [MainComponent],
})
class MainModule { }
```

```html
<select2 [data]="data"
    [value]="value"
    (update)="update($event)">
</select2>
```

the online demo: https://plantain-00.github.io/select2-component/demo/angular/index.html

#### properties and events of the component

name | type | description
--- | --- | ---
data | [Select2Data](#select2-data-structure) | the data of the select2
value | [Select2Value](#select2-data-structure)? | initial value
disabled | boolean? | whether the component is disabled
minCountForSearch | number? = 6 | hide search box if `options.length < minCountForSearch`
placeholder | string? | the placeholder string if nothing selected
customSearchEnabled | boolean? | will trigger `search` event, and disable inside filter
multiple | boolean? | select multiple options
update | (value: [Select2UpdateValue](#select2-data-structure)) => void | triggered when user select an option
open | () => void | triggered when user open the options
search | (text: string) => void | triggered when search text changed

#### select2 data structure

```ts
type Select2Data = (Select2Group | Select2Option)[];

type Select2Group = {
    label: string;
    options: Select2Option[];
};

type Select2Option = {
    value: Select2Value;
    label: string;
    disabled?: boolean;
    component?: string | Function; // the component
};

type Select2Value = string | number;

type Select2UpdateValue = Select2Value | Select2Value[];
```

#### change log

```js
// v2
<select2 [data]="data"
    [value]="value"
    (update)="update($event)">
</select2>

// v1
<select2 [data]="data"
    [value]="value"
    (select)="select($event)">
</select2>
```
