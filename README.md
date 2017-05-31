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
<select2 :data="data">
</select2>
```

the online demo: https://plantain-00.github.io/select2-component/demo/vue/index.html

the source code of the demo: https://github.com/plantain-00/select2-component/tree/master/demo/vue

#### reactjs component demo

```ts
import { Select2 } from "select2-component/dist/react";
```

```jsx
<Select2 data={this.data}>
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
<select2 [data]="data">
</select2>
```

the online demo: https://plantain-00.github.io/select2-component/demo/angular/index.html

the source code of the demo: https://github.com/plantain-00/select2-component/tree/master/demo/angular

#### properties and events of the component

name | type | description
--- | --- | ---
data | [Select2Data](#select2-data-structure) | the data of the select2

#### select2 data structure

```ts
type Select2Data = {
    component: string | Function; // the item component, for vuejs, it is the component name, for reactjs, it is the class object
    data: any; // the data will be passed to the component as `data` props
};
```

#### features

+ vuejs component
+ reactjs component
+ angular component
+ commonjs module
+ custom component
