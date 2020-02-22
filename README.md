# select2-component

[![Dependency Status](https://david-dm.org/plantain-00/select2-component.svg)](https://david-dm.org/plantain-00/select2-component)
[![devDependency Status](https://david-dm.org/plantain-00/select2-component/dev-status.svg)](https://david-dm.org/plantain-00/select2-component#info=devDependencies)
[![Build Status: Linux](https://travis-ci.org/plantain-00/select2-component.svg?branch=master)](https://travis-ci.org/plantain-00/select2-component)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/select2-component?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/select2-component/branch/master)
[![npm version](https://badge.fury.io/js/select2-component.svg)](https://badge.fury.io/js/select2-component)
[![Downloads](https://img.shields.io/npm/dm/select2-component.svg)](https://www.npmjs.com/package/select2-component)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fplantain-00%2Fselect2-component%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/select2-component)

A vuejs and reactjs select component.

## features

+ vuejs component
+ reactjs component
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

## link css

```html
<link rel="stylesheet" href="./node_modules/select2-component/dist/select2.min.css" />
```

## vuejs component

[![gzip size](https://img.badgesize.io/https://unpkg.com/select2-vue-component?compression=gzip)](https://unpkg.com/select2-vue-component)

`npm i select2-vue-component`

```ts
import "select2-vue-component";
```

or

```html
<script src="./node_modules/vue/dist/vue.min.js"></script>
<script src="./node_modules/vue-class-component/dist/vue-class-component.min.js"></script>
<script src="./node_modules/select2-vue-component/dist/select2-vue-component.min.js"></script>
```

```html
<select2 :data="data"
    :value="value"
    @update="update($event)">
</select2>
```

the online demo: <https://plantain-00.github.io/select2-component/packages/vue/demo>

## reactjs component

[![gzip size](https://img.badgesize.io/https://unpkg.com/select2-react-component?compression=gzip)](https://unpkg.com/select2-react-component)

`npm i select2-react-component`

```ts
import { Select2 } from "select2-react-component";
```

or

```html
<script src="./node_modules/react/umd/react.production.min.js"></script>
<script src="./node_modules/react-dom/umd/react-dom.production.min.js"></script>
<script src="./node_modules/select2-react-component/dist/select2-react-component.min.js"></script>
```

```jsx
<Select2 data={this.data}
    value={this.value}
    update={value => this.update(value)}>
</Select2>
```

the online demo: <https://plantain-00.github.io/select2-component/packages/react/demo>

## properties and events of the component

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
keydown, keyup, keypress | (e: KeyboardEvent) => void | triggered when search input triggers keydown, keyup, keypress
minimumInputLength | number? | if minimumInputLength = 3, only start searching when the user has input 3 or more characters
maximumInputLength | number? | if maximumInputLength = 20, only allow terms up to 20 characters long

## select2 data structure

```ts
type Select2Data = (Select2Group | Select2Option)[];

type Select2Group = {
    label: string;
    options: Select2Option[];
    classes?: string;
};

type Select2Option = {
    value: Select2Value;
    label: string;
    disabled?: boolean;
    component?: string | Function; // the component
    classes?: string;
};

type Select2Value = string | number | boolean;

type Select2UpdateValue = Select2Value | Select2Value[];
```

## auto complete

### vuejs auto complete component

`npm i select2-vue-component`

```ts
import Vue from "vue";
import { AutoComplete } "select2-vue-component";

Vue.component("auto-complete", AutoComplete)
```

```html
<auto-complete :data="data"
    :value="value"
    @search="search($event)"
    @select="select($event)">
</auto-complete>
```

### reactjs auto complete component

`npm i select2-react-component`

```ts
import { AutoComplete } from "select2-react-component";
```

```jsx
<AutoComplete data={this.data}
    value={this.value}
    search={value => this.search(value)}
    select={value => this.select(value)}>
</AutoComplete>
```

### properties and events of the auto complete component

name | type | description
--- | --- | ---
data | [Select2Data](#select2-data-structure) | the data of the select2
value | string | initial value
update | (value: [Select2UpdateValue](#select2-data-structure)) => void | triggered when user change search text or select an option
select | (value: [Select2UpdateValue](#select2-data-structure)) => void | triggered when user select an option
search | (text: string) => void | triggered when search text changed
keydown, keyup, keypress | (e: KeyboardEvent) => void | triggered when search input triggers keydown, keyup, keypress

## change logs

```bash
# v4
npm i select2-component

# v5
npm i select2-vue-component
npm i select2-react-component
npm i select2-angular-component
```

```ts
// v4
import "select2-component/vue";
import { Select2 } from "select2-component/react";
import { Select2Module } from "select2-component/angular";

// v5
import "select2-vue-component";
import { Select2 } from "select2-react-component";
import { Select2Module } from "select2-angular-component";
```

```html
// v4
<link rel="stylesheet" href="./node_modules/select2-component/select2.min.css" />

// v5
<link rel="stylesheet" href="./node_modules/select2-component/dist/select2.min.css" />
```

```ts
// v3 angular AOT:
import { Select2Module } from "select2-component/angular";

// v4 angular AOT:
import { Select2Module } from "select2-component/aot/angular";
```

```ts
// v3.1
import { Select2Module } from "select2-component/angular";
import { Select2 } from "select2-component/angular.component";

// v3.0
import { Select2Component } from "select2-component/angular";
```

```ts
// v3
<link rel="stylesheet" href="./node_modules/select2-component/select2.min.css" />
import "select2-component/vue";
import { Select2 } from "select2-component/react";
import { Select2Component } from "select2-component/angular";

// v2
<link rel="stylesheet" href="./node_modules/select2-component/dist/select2.min.css" />
import "select2-component/dist/vue";
import { Select2 } from "select2-component/dist/react";
import { Select2Component } from "select2-component/dist/angular";
```

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
