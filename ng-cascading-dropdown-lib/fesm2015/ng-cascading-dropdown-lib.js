import { Injectable, ɵɵdefineInjectable, EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgCascadingDropdownLibService {
    constructor() { }
}
NgCascadingDropdownLibService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgCascadingDropdownLibService.ctorParameters = () => [];
/** @nocollapse */ NgCascadingDropdownLibService.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgCascadingDropdownLibService_Factory() { return new NgCascadingDropdownLibService(); }, token: NgCascadingDropdownLibService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgCascadingDropdownLibComponent {
    /**
     * Class Constructor
     */
    constructor() {
        /**
         * Page Specific Prop's
         */
        this.dropdownData = [];
        this.dropdownValue = [];
        this.childRootData = [];
        this.dropDownCounter = [];
        this.rootData = [];
        this.finalSelectedElement = {};
        // Toggle Dropdown disability
        this.disableDropdown = false;
        // Show Default Selection
        this.showDefaultSelection = false;
        // Show Horizontal dropdown or Vertical dropdown
        this.showHorizontal = true;
        // Notify the final dropdown value selected
        this.notifyFinalDropDownValue = new EventEmitter();
        // Notify all the Selected Values per dropdown
        this.notifyDropDownValue = new EventEmitter();
        // Notify if dropdown value is changed
        this.notifyChangeEvent = new EventEmitter();
    }
    /**
     * Angular Life Cycle Hook
     * @return {?}
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
     * @return {?}
     */
    processParentDropdownData() {
        this.rootData = this.processParentChildDropdownData(this.dropdownData);
        this.dropDownCounter.push(Object.assign([], this.rootData));
        this.dropdownValue[0] = 'default';
    }
    /**
     * Calls Parsing function and returns Parsed Array(Parent-Child Relationship)
     * @param {?} data
     * @return {?}
     */
    processParentChildDropdownData(data) {
        /** @type {?} */
        const tree = this.unflattenJson(data);
        return tree;
    }
    /**
     * Converting Flat JSON to Parent-Child Tree
     * @param {?} data
     * @return {?}
     */
    unflattenJson(data) {
        /** @type {?} */
        const tree = [];
        /** @type {?} */
        const mappedArr = {};
        /** @type {?} */
        let arrElem;
        /** @type {?} */
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
                }
                else {
                    tree.push(mappedElem);
                }
            }
        }
        return tree;
    }
    /**
     * Handle Dropdown change and do conditional Checking
     * @param {?} dataObj
     * @param {?} i
     * @return {?}
     */
    onDropdownChange(dataObj, i) {
        if (dataObj !== 'default' && dataObj.childData.length > 0) { // If child elements are present
            // If child elements are present
            /** @type {?} */
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
        }
        else if (dataObj === 'default') { // for default condition
            // for default condition
            /** @type {?} */
            const currentLength = i;
            this.dropdownValue[i] = 'default';
            for (let index = this.dropdownValue.length - 1; index > currentLength; index--) {
                this.dropdownValue.splice(index, 1);
            }
            for (let index = this.dropDownCounter.length - 1; index > currentLength; index--) {
                this.dropDownCounter.splice(index, 1);
            }
            this.notifyChangeEvent.emit(false);
        }
        else { // for final element with no child element
            this.dropdownValue[i] = dataObj;
            if (i === 0) {
                this.dropDownCounter = [];
                this.dropdownValue = [];
                this.dropDownCounter[0] = Object.assign([], this.rootData);
                this.dropdownValue[0] = dataObj;
            }
            else {
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
     * @param {?} dataObj
     * @param {?} i
     * @return {?}
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
NgCascadingDropdownLibComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-cascading-dropdown',
                template: "<ng-container *ngIf=\"dropDownCounter.length > 0\">\r\n    <div class=\"parent-container\">\r\n        <div *ngFor=\"let dropDownData of dropDownCounter; let i =index;\" [ngClass]=\"showHorizontal ? 'dropdown-container-horizontal' : 'dropdown-container-vertical'\">\r\n            <select [disabled]=\"disableDropdown\" name=\"dropdown\" [ngModel]=\"dropdownValue[i]\" [ngClass]=\"showHorizontal ? 'select-horizontal' : 'select-vertical'\"\r\n                (ngModelChange)=\"onDropdownChange($event, i)\">\r\n                <ng-container *ngIf=\"showDefaultSelection\">\r\n                    <option value=\"default\">\r\n                        {{ defaultSelectionData[i] }}\r\n                    </option>\r\n                </ng-container>\r\n                <option [ngValue]=\"data\" *ngFor=\"let data of dropDownData; let i=index;\">\r\n                    {{ data.grpName }}\r\n                </option>\r\n            </select>\r\n        </div>\r\n    </div>\r\n</ng-container>",
                styles: [".dropdown-container-horizontal{display:inline-block;margin:1%;width:10%}.dropdown-container-vertical{margin:1%;width:10%}.select-horizontal,.select-vertical{width:90%;height:30px;background-color:#fff!important;border-radius:3px;box-shadow:0 1px 5px #959595}"]
            }] }
];
/** @nocollapse */
NgCascadingDropdownLibComponent.ctorParameters = () => [];
NgCascadingDropdownLibComponent.propDecorators = {
    inputCascadingData: [{ type: Input }],
    defaultSelectionData: [{ type: Input }],
    disableDropdown: [{ type: Input }],
    showDefaultSelection: [{ type: Input }],
    showHorizontal: [{ type: Input }],
    notifyFinalDropDownValue: [{ type: Output }],
    notifyDropDownValue: [{ type: Output }],
    notifyChangeEvent: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgCascadingDropdownLibModule {
}
NgCascadingDropdownLibModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgCascadingDropdownLibComponent],
                imports: [
                    FormsModule,
                    CommonModule
                ],
                exports: [NgCascadingDropdownLibComponent]
            },] }
];

export { NgCascadingDropdownLibComponent, NgCascadingDropdownLibModule, NgCascadingDropdownLibService };
//# sourceMappingURL=ng-cascading-dropdown-lib.js.map
