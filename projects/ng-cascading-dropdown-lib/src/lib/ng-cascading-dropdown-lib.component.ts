// Angular imports
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ng-cascading-dropdown',
  templateUrl: './ng-cascading-dropdown-lib.component.html',
  styleUrls: ['./ng-cascading-dropdown-lib.component.css']
})
export class NgCascadingDropdownLibComponent implements OnInit {

  /**
   * Page Specific Prop's
   */
  public dropdownData = [];
  public dropdownValue = [];
  public childRootData = [];
  public dropDownCounter = [];

  private rootData = [];
  private finalSelectedElement = {};

  /**
   * Input Output Prop's
   */
  // Input Data for cascading dropdown
  @Input() inputCascadingData;

  // Input Data for default selection to be show per dropdown
  @Input() defaultSelectionData;

  // Toggle Dropdown disability
  @Input() disableDropdown = false;

  // Show Default Selection
  @Input() showDefaultSelection = false;

  // Notify the final dropdown value selected
  @Output() notifyFinalDropDownValue = new EventEmitter();

  // Notify all the Selected Values per dropdown
  @Output() notifyDropDownValue = new EventEmitter();

  // Notify if dropdown value is changed
  @Output() notifyChangeEvent = new EventEmitter();

  /**
   * Class Constructor
   */
  constructor() { }


  /**
   * Angular Life Cycle Hook
   */
  ngOnInit() {
    if (this.inputCascadingData) {
      this.dropdownData = this.inputCascadingData;
      this.processParentDropdownData();
    }
  }

  /**
   * Separate Server Dropdown Data into Parent And Child Array
   * and Call Parsing Function
   */

  processParentDropdownData() {
    this.rootData = this.processParentChildDropdownData(this.dropdownData);
    this.dropDownCounter.push(Object.assign([], this.rootData));
    this.dropdownValue[0] = 'default';
  }

  /**
   * Calls Parsing function and returns Parsed Array(Parent-Child Relationship)
   */

  processParentChildDropdownData(data) {
    const tree = this.unflattenJson(data);
    return tree;
  }

  /**
   * Converting Flat JSON to Parent-Child Tree
   */

  unflattenJson(data) {
    const tree = [];
    const mappedArr = {};
    let arrElem;
    let mappedElem;

    for (let i = 0, len = data.length; i < len; i++) {
      arrElem = data[i];
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id].childData = [];
    }
    for (const id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        if (mappedElem.parentGroupID) {
          mappedArr[mappedElem.parentGroupID].childData.push(mappedElem);
        } else {
          tree.push(mappedElem);
        }
      }
    }
    return tree;
  }


  /**
   * Handle Dropdown change and do conditional Checking
   */

  onDropdownChange(dataObj, i) {
    if (dataObj !== 'default' && dataObj.childData.length > 0) { // If child elements are present
      const currentLength = i;
      this.dropDownCounter = [];
      if (i === 0) {
        this.dropdownValue = [];
      }
      for (let index = this.dropdownValue.length - 1; index > currentLength; index--) {
        this.dropdownValue.splice(index, 1);
      }
      this.populateDropDownCounter(dataObj, i);
      this.notifyChangeEvent.emit(false);
    } else if (dataObj === 'default') { // for default condition
      const currentLength = i;
      this.dropdownValue[i] = 'default';
      for (let index = this.dropdownValue.length - 1; index > currentLength; index--) {
        this.dropdownValue.splice(index, 1);
      }
      for (let index = this.dropDownCounter.length - 1; index > currentLength; index--) {
        this.dropDownCounter.splice(index, 1);
      }
      this.notifyChangeEvent.emit(false);
    } else { // for final element with no child element
      this.dropdownValue[i] = dataObj;
      if (i === 0) {
        this.dropDownCounter = [];
        this.dropdownValue = [];
        this.dropDownCounter[0] = Object.assign([], this.rootData);
        this.dropdownValue[0] = dataObj;
      } else {
        this.dropDownCounter = this.dropDownCounter.slice(0, i + 1);
        this.dropdownValue = this.dropdownValue.slice(0, i + 1);
      }
      this.finalSelectedElement = {};
      this.finalSelectedElement = Object.assign({}, dataObj);
      this.notifyFinalDropDownValue.emit(this.finalSelectedElement);
      this.notifyDropDownValue.emit(this.dropdownValue);
    }
  }

  /**
   * Called by dropdown if child element is present
   */

  populateDropDownCounter(dataObj, i) {
    this.dropdownValue[i] = dataObj;
    this.dropDownCounter[0] = Object.assign([], this.rootData);
    for (let j = 1; j < this.dropdownValue.length + 1; j++) {
      this.dropDownCounter[j] = Object.assign([], this.dropdownValue[j - 1].childData);
    }
    this.dropdownValue[i + 1] = 'default';
  }

}
