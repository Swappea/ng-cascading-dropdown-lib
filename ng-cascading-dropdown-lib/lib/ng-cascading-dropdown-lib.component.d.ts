import { OnInit, EventEmitter } from '@angular/core';
export declare class NgCascadingDropdownLibComponent implements OnInit {
    /**
     * Page Specific Prop's
     */
    dropdownData: any[];
    dropdownValue: any[];
    childRootData: any[];
    dropDownCounter: any[];
    private rootData;
    private finalSelectedElement;
    /**
     * Input Output Prop's
     */
    inputCascadingData: any;
    defaultSelectionData: any;
    disableDropdown: boolean;
    showDefaultSelection: boolean;
    showHorizontal: boolean;
    notifyFinalDropDownValue: EventEmitter<{}>;
    notifyDropDownValue: EventEmitter<{}>;
    notifyChangeEvent: EventEmitter<{}>;
    /**
     * Class Constructor
     */
    constructor();
    /**
     * Angular Life Cycle Hook
     */
    ngOnInit(): void;
    /**
     * Separate Server Dropdown Data into Parent And Child Array
     * and Call Parsing Function
     */
    processParentDropdownData(): void;
    /**
     * Calls Parsing function and returns Parsed Array(Parent-Child Relationship)
     */
    processParentChildDropdownData(data: any): any[];
    /**
     * Converting Flat JSON to Parent-Child Tree
     */
    unflattenJson(data: any): any[];
    /**
     * Handle Dropdown change and do conditional Checking
     */
    onDropdownChange(dataObj: any, i: any): void;
    /**
     * Called by dropdown if child element is present
     */
    populateDropDownCounter(dataObj: any, i: any): void;
}
