# Angular 8 Cascading Dropdown

Angular 8 Cascading Dropdown Component for web applications. Dynamic and easy to use.

## Table of Contents

##### 1. Getting Started

##### 2. Installation

##### 3. Usage

## Getting Started

### Installation

- The Cascading Dropdown Dropdown package is published on the [npm](https://www.npmjs.com/package/ng-cascading-dropdown-lib) Registry.
- Install the package :
  `npm install ng-cascading-dropdown-lib`

### Usage

Import `NgCascadingDropdownLibModule` into `NgModule` in `app.module.ts`. Angular's `FormsModule` is also required.

```js
import { NgCascadingDropdownLibModule } from 'ng-cascading-dropdown-lib';
import { FormsModule } from '@angular/forms';

@NgModule({
  // ...
  imports: [
    NgCascadingDropdownLibModule,
    FormsModule
  ]
  // ...
})

```

```js
import { Component, OnInit } from "@angular/core";

export class AppComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  ngOnInit() {
    this.dropdownList = [
      {
        id: 1,
        grpName: "Asia",
        parentGroupID: null
      },
      {
        id: 2,
        grpName: "North America",
        parentGroupID: null
      },
      {
        id: 3,
        grpName: "Europe",
        parentGroupID: null
      },
      {
        id: 4,
        grpName: "India",
        parentGroupID: 1
      },
      {
        id: 5,
        grpName: "Pakistan",
        parentGroupID: 1
      },
      {
        id: 6,
        grpName: "China",
        parentGroupID: 1
      },
      {
        id: 7,
        grpName: "USA",
        parentGroupID: 2
      },
      {
        id: 8,
        grpName: "Germany",
        parentGroupID: 3
      },
      {
        id: 9,
        grpName: "Maharashtra",
        parentGroupID: 4
      },
      {
        id: 10,
        grpName: "Texas",
        parentGroupID: 7
      },
      {
        id: 11,
        grpName: "Bayern",
        parentGroupID: 8
      },
      {
        id: 12,
        grpName: "Mumbai",
        parentGroupID: 9
      },
      {
        id: 13,
        grpName: "Dallas",
        parentGroupID: 10
      },
      {
        id: 14,
        grpName: "Munich",
        parentGroupID: 11
      }
    ];

    defaulDropdownData = [
      "Select Continent",
      "Select Country",
      "Select State",
      "Select City"
    ];
  }
  onDropdownSelection(event) {
    console.log("FINAL VALUE", event);
  }

  notifySelections(event) {
    console.log("ALL SELECTIONS", event);
  }
}
```

Add the following component tag in you template

```html
<ng-cascading-dropdown
  [inputCascadingData]="testData"
  [defaultSelectionData]="defaulTestData"
  [showDefaultSelection]="true"
  (notifyDropDownValue)="notifySelections($event)"
  (notifyFinalDropDownValue)="onDropdownSelection($event)"
>
</ng-cascading-dropdown>
```
