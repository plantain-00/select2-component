[![Dependency Status](https://david-dm.org/plantain-00/select2-component.svg)](https://david-dm.org/plantain-00/select2-component)
[![devDependency Status](https://david-dm.org/plantain-00/select2-component/dev-status.svg)](https://david-dm.org/plantain-00/select2-component#info=devDependencies)
[![Build Status](https://travis-ci.org/plantain-00/select2-component.svg?branch=master)](https://travis-ci.org/plantain-00/select2-component)
[![npm version](https://badge.fury.io/js/select2-component.svg)](https://badge.fury.io/js/select2-component)
[![Downloads](https://img.shields.io/npm/dm/select2-component.svg)](https://www.npmjs.com/package/select2-component)

# select2-component
A vuejs, reactjs and angular select component.

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
    @update="update(arguments[0])">
</select2>
```

the online demo: https://plantain-00.github.io/select2-component/demo/vue/index.html

the source code of the demo: https://github.com/plantain-00/select2-component/tree/master/demo/vue

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

the source code of the demo: https://github.com/plantain-00/select2-component/tree/master/demo/react

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

the source code of the demo: https://github.com/plantain-00/select2-component/tree/master/demo/angular

#### properties and events of the component

name | type | description
--- | --- | ---
data | [Select2Data](#select2-data-structure) | the data of the select2
value | string | initial value
disabled | boolean? | whether the component is disabled
minCountForSearch | number? = 6 | hide search box if `options.length < minCountForSearch`
update | (value: string) => void | triggered when user select an option

#### select2 data structure

```ts
type Select2Data = (Select2Group | Select2Option)[];

type Select2Group = {
    label: string;
    options: Select2Option[];
};

type Select2Option = {
    value: string;
    label: string;
    disabled?: boolean;
};
```

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
