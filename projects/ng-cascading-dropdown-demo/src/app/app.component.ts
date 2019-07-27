import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  testData = [
    {
      id: 1,
      grpName: 'Asia',
      parentGroupID: null
    },
    {
      id: 2,
      grpName: 'North America',
      parentGroupID: null
    },
    {
      id: 3,
      grpName: 'Europe',
      parentGroupID: null
    },
    {
      id: 4,
      grpName: 'India',
      parentGroupID: 1
    },
    {
      id: 5,
      grpName: 'Pakistan',
      parentGroupID: 1
    },
    {
      id: 6,
      grpName: 'China',
      parentGroupID: 1
    },
    {
      id: 7,
      grpName: 'USA',
      parentGroupID: 2
    },
    {
      id: 8,
      grpName: 'Germany',
      parentGroupID: 3
    },
    {
      id: 9,
      grpName: 'Maharashtra',
      parentGroupID: 4
    },
    {
      id: 10,
      grpName: 'Texas',
      parentGroupID: 7
    },
    {
      id: 11,
      grpName: 'Bayern',
      parentGroupID: 8
    },
    {
      id: 12,
      grpName: 'Mumbai',
      parentGroupID: 9
    },
    {
      id: 13,
      grpName: 'Dallas',
      parentGroupID: 10
    },
    {
      id: 14,
      grpName: 'Munich',
      parentGroupID: 11
    }
  ];

  defaulTestData = [
    'Select Continent',
    'Select Country',
    'Select State',
    'Select City',
  ];

  constructor() {

  }

  ngOnInit() {

  }

  notifyFinalDropDownValue(event) {
    console.log('FINAL VALUE', event);
  }

  notifyDropDownValue(event) {
    console.log('ALL SELECTIONS', event);
  }
}
