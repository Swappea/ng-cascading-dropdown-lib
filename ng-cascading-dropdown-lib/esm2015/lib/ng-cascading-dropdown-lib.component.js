/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Angular imports
import { Component, Input, Output, EventEmitter } from '@angular/core';
export class NgCascadingDropdownLibComponent {
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
if (false) {
    /**
     * Page Specific Prop's
     * @type {?}
     */
    NgCascadingDropdownLibComponent.prototype.dropdownData;
    /** @type {?} */
    NgCascadingDropdownLibComponent.prototype.dropdownValue;
    /** @type {?} */
    NgCascadingDropdownLibComponent.prototype.childRootData;
    /** @type {?} */
    NgCascadingDropdownLibComponent.prototype.dropDownCounter;
    /**
     * @type {?}
     * @private
     */
    NgCascadingDropdownLibComponent.prototype.rootData;
    /**
     * @type {?}
     * @private
     */
    NgCascadingDropdownLibComponent.prototype.finalSelectedElement;
    /**
     * Input Output Prop's
     * @type {?}
     */
    NgCascadingDropdownLibComponent.prototype.inputCascadingData;
    /** @type {?} */
    NgCascadingDropdownLibComponent.prototype.defaultSelectionData;
    /** @type {?} */
    NgCascadingDropdownLibComponent.prototype.disableDropdown;
    /** @type {?} */
    NgCascadingDropdownLibComponent.prototype.showDefaultSelection;
    /** @type {?} */
    NgCascadingDropdownLibComponent.prototype.showHorizontal;
    /** @type {?} */
    NgCascadingDropdownLibComponent.prototype.notifyFinalDropDownValue;
    /** @type {?} */
    NgCascadingDropdownLibComponent.prototype.notifyDropDownValue;
    /** @type {?} */
    NgCascadingDropdownLibComponent.prototype.notifyChangeEvent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2FzY2FkaW5nLWRyb3Bkb3duLWxpYi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1jYXNjYWRpbmctZHJvcGRvd24tbGliLyIsInNvdXJjZXMiOlsibGliL25nLWNhc2NhZGluZy1kcm9wZG93bi1saWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU8vRSxNQUFNLE9BQU8sK0JBQStCOzs7O0lBMkMxQzs7OztRQXRDTyxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNsQixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQixvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUVwQixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QseUJBQW9CLEdBQUcsRUFBRSxDQUFDOztRQVl6QixvQkFBZSxHQUFHLEtBQUssQ0FBQzs7UUFHeEIseUJBQW9CLEdBQUcsS0FBSyxDQUFDOztRQUc3QixtQkFBYyxHQUFHLElBQUksQ0FBQzs7UUFHckIsNkJBQXdCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7UUFHOUMsd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7UUFHekMsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUtqQyxDQUFDOzs7OztJQU1qQixRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7WUFDNUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7U0FDbEM7SUFDSCxDQUFDOzs7Ozs7SUFPRCx5QkFBeUI7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FB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QUF3RDs7SUFHeEQsOERBQW1EOztJQUduRCw0REFBaUQiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBbmd1bGFyIGltcG9ydHNcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZy1jYXNjYWRpbmctZHJvcGRvd24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9uZy1jYXNjYWRpbmctZHJvcGRvd24tbGliLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9uZy1jYXNjYWRpbmctZHJvcGRvd24tbGliLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdDYXNjYWRpbmdEcm9wZG93bkxpYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhZ2UgU3BlY2lmaWMgUHJvcCdzXHJcbiAgICovXHJcbiAgcHVibGljIGRyb3Bkb3duRGF0YSA9IFtdO1xyXG4gIHB1YmxpYyBkcm9wZG93blZhbHVlID0gW107XHJcbiAgcHVibGljIGNoaWxkUm9vdERhdGEgPSBbXTtcclxuICBwdWJsaWMgZHJvcERvd25Db3VudGVyID0gW107XHJcblxyXG4gIHByaXZhdGUgcm9vdERhdGEgPSBbXTtcclxuICBwcml2YXRlIGZpbmFsU2VsZWN0ZWRFbGVtZW50ID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIElucHV0IE91dHB1dCBQcm9wJ3NcclxuICAgKi9cclxuICAvLyBJbnB1dCBEYXRhIGZvciBjYXNjYWRpbmcgZHJvcGRvd25cclxuICBASW5wdXQoKSBpbnB1dENhc2NhZGluZ0RhdGE7XHJcblxyXG4gIC8vIElucHV0IERhdGEgZm9yIGRlZmF1bHQgc2VsZWN0aW9uIHRvIGJlIHNob3cgcGVyIGRyb3Bkb3duXHJcbiAgQElucHV0KCkgZGVmYXVsdFNlbGVjdGlvbkRhdGE7XHJcblxyXG4gIC8vIFRvZ2dsZSBEcm9wZG93biBkaXNhYmlsaXR5XHJcbiAgQElucHV0KCkgZGlzYWJsZURyb3Bkb3duID0gZmFsc2U7XHJcblxyXG4gIC8vIFNob3cgRGVmYXVsdCBTZWxlY3Rpb25cclxuICBASW5wdXQoKSBzaG93RGVmYXVsdFNlbGVjdGlvbiA9IGZhbHNlO1xyXG5cclxuICAvLyBTaG93IEhvcml6b250YWwgZHJvcGRvd24gb3IgVmVydGljYWwgZHJvcGRvd25cclxuICBASW5wdXQoKSBzaG93SG9yaXpvbnRhbCA9IHRydWU7XHJcblxyXG4gIC8vIE5vdGlmeSB0aGUgZmluYWwgZHJvcGRvd24gdmFsdWUgc2VsZWN0ZWRcclxuICBAT3V0cHV0KCkgbm90aWZ5RmluYWxEcm9wRG93blZhbHVlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvLyBOb3RpZnkgYWxsIHRoZSBTZWxlY3RlZCBWYWx1ZXMgcGVyIGRyb3Bkb3duXHJcbiAgQE91dHB1dCgpIG5vdGlmeURyb3BEb3duVmFsdWUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8vIE5vdGlmeSBpZiBkcm9wZG93biB2YWx1ZSBpcyBjaGFuZ2VkXHJcbiAgQE91dHB1dCgpIG5vdGlmeUNoYW5nZUV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBDbGFzcyBDb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBBbmd1bGFyIExpZmUgQ3ljbGUgSG9va1xyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMuaW5wdXRDYXNjYWRpbmdEYXRhKSB7XHJcbiAgICAgIHRoaXMuZHJvcGRvd25EYXRhID0gdGhpcy5pbnB1dENhc2NhZGluZ0RhdGE7XHJcbiAgICAgIHRoaXMucHJvY2Vzc1BhcmVudERyb3Bkb3duRGF0YSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VwYXJhdGUgU2VydmVyIERyb3Bkb3duIERhdGEgaW50byBQYXJlbnQgQW5kIENoaWxkIEFycmF5XHJcbiAgICogYW5kIENhbGwgUGFyc2luZyBGdW5jdGlvblxyXG4gICAqL1xyXG5cclxuICBwcm9jZXNzUGFyZW50RHJvcGRvd25EYXRhKCkge1xyXG4gICAgdGhpcy5yb290RGF0YSA9IHRoaXMucHJvY2Vzc1BhcmVudENoaWxkRHJvcGRvd25EYXRhKHRoaXMuZHJvcGRvd25EYXRhKTtcclxuICAgIHRoaXMuZHJvcERvd25Db3VudGVyLnB1c2goT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5yb290RGF0YSkpO1xyXG4gICAgdGhpcy5kcm9wZG93blZhbHVlWzBdID0gJ2RlZmF1bHQnO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbHMgUGFyc2luZyBmdW5jdGlvbiBhbmQgcmV0dXJucyBQYXJzZWQgQXJyYXkoUGFyZW50LUNoaWxkIFJlbGF0aW9uc2hpcClcclxuICAgKi9cclxuXHJcbiAgcHJvY2Vzc1BhcmVudENoaWxkRHJvcGRvd25EYXRhKGRhdGEpIHtcclxuICAgIGNvbnN0IHRyZWUgPSB0aGlzLnVuZmxhdHRlbkpzb24oZGF0YSk7XHJcbiAgICByZXR1cm4gdHJlZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnZlcnRpbmcgRmxhdCBKU09OIHRvIFBhcmVudC1DaGlsZCBUcmVlXHJcbiAgICovXHJcblxyXG4gIHVuZmxhdHRlbkpzb24oZGF0YSkge1xyXG4gICAgY29uc3QgdHJlZSA9IFtdO1xyXG4gICAgY29uc3QgbWFwcGVkQXJyID0ge307XHJcbiAgICBsZXQgYXJyRWxlbTtcclxuICAgIGxldCBtYXBwZWRFbGVtO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBkYXRhLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGFyckVsZW0gPSBkYXRhW2ldO1xyXG4gICAgICBtYXBwZWRBcnJbYXJyRWxlbS5pZF0gPSBhcnJFbGVtO1xyXG4gICAgICBtYXBwZWRBcnJbYXJyRWxlbS5pZF0uY2hpbGREYXRhID0gW107XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IGlkIGluIG1hcHBlZEFycikge1xyXG4gICAgICBpZiAobWFwcGVkQXJyLmhhc093blByb3BlcnR5KGlkKSkge1xyXG4gICAgICAgIG1hcHBlZEVsZW0gPSBtYXBwZWRBcnJbaWRdO1xyXG4gICAgICAgIGlmIChtYXBwZWRFbGVtLnBhcmVudEdyb3VwSUQpIHtcclxuICAgICAgICAgIG1hcHBlZEFyclttYXBwZWRFbGVtLnBhcmVudEdyb3VwSURdLmNoaWxkRGF0YS5wdXNoKG1hcHBlZEVsZW0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0cmVlLnB1c2gobWFwcGVkRWxlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJlZTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGUgRHJvcGRvd24gY2hhbmdlIGFuZCBkbyBjb25kaXRpb25hbCBDaGVja2luZ1xyXG4gICAqL1xyXG5cclxuICBvbkRyb3Bkb3duQ2hhbmdlKGRhdGFPYmosIGkpIHtcclxuICAgIGlmIChkYXRhT2JqICE9PSAnZGVmYXVsdCcgJiYgZGF0YU9iai5jaGlsZERhdGEubGVuZ3RoID4gMCkgeyAvLyBJZiBjaGlsZCBlbGVtZW50cyBhcmUgcHJlc2VudFxyXG4gICAgICBjb25zdCBjdXJyZW50TGVuZ3RoID0gaTtcclxuICAgICAgdGhpcy5kcm9wRG93bkNvdW50ZXIgPSBbXTtcclxuICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duVmFsdWUgPSBbXTtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IHRoaXMuZHJvcGRvd25WYWx1ZS5sZW5ndGggLSAxOyBpbmRleCA+IGN1cnJlbnRMZW5ndGg7IGluZGV4LS0pIHtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duVmFsdWUuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnBvcHVsYXRlRHJvcERvd25Db3VudGVyKGRhdGFPYmosIGkpO1xyXG4gICAgICB0aGlzLm5vdGlmeUNoYW5nZUV2ZW50LmVtaXQoZmFsc2UpO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhT2JqID09PSAnZGVmYXVsdCcpIHsgLy8gZm9yIGRlZmF1bHQgY29uZGl0aW9uXHJcbiAgICAgIGNvbnN0IGN1cnJlbnRMZW5ndGggPSBpO1xyXG4gICAgICB0aGlzLmRyb3Bkb3duVmFsdWVbaV0gPSAnZGVmYXVsdCc7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gdGhpcy5kcm9wZG93blZhbHVlLmxlbmd0aCAtIDE7IGluZGV4ID4gY3VycmVudExlbmd0aDsgaW5kZXgtLSkge1xyXG4gICAgICAgIHRoaXMuZHJvcGRvd25WYWx1ZS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gdGhpcy5kcm9wRG93bkNvdW50ZXIubGVuZ3RoIC0gMTsgaW5kZXggPiBjdXJyZW50TGVuZ3RoOyBpbmRleC0tKSB7XHJcbiAgICAgICAgdGhpcy5kcm9wRG93bkNvdW50ZXIuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm5vdGlmeUNoYW5nZUV2ZW50LmVtaXQoZmFsc2UpO1xyXG4gICAgfSBlbHNlIHsgLy8gZm9yIGZpbmFsIGVsZW1lbnQgd2l0aCBubyBjaGlsZCBlbGVtZW50XHJcbiAgICAgIHRoaXMuZHJvcGRvd25WYWx1ZVtpXSA9IGRhdGFPYmo7XHJcbiAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5kcm9wRG93bkNvdW50ZXIgPSBbXTtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duVmFsdWUgPSBbXTtcclxuICAgICAgICB0aGlzLmRyb3BEb3duQ291bnRlclswXSA9IE9iamVjdC5hc3NpZ24oW10sIHRoaXMucm9vdERhdGEpO1xyXG4gICAgICAgIHRoaXMuZHJvcGRvd25WYWx1ZVswXSA9IGRhdGFPYmo7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5kcm9wRG93bkNvdW50ZXIgPSB0aGlzLmRyb3BEb3duQ291bnRlci5zbGljZSgwLCBpICsgMSk7XHJcbiAgICAgICAgdGhpcy5kcm9wZG93blZhbHVlID0gdGhpcy5kcm9wZG93blZhbHVlLnNsaWNlKDAsIGkgKyAxKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmZpbmFsU2VsZWN0ZWRFbGVtZW50ID0ge307XHJcbiAgICAgIHRoaXMuZmluYWxTZWxlY3RlZEVsZW1lbnQgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhT2JqKTtcclxuICAgICAgdGhpcy5ub3RpZnlGaW5hbERyb3BEb3duVmFsdWUuZW1pdCh0aGlzLmZpbmFsU2VsZWN0ZWRFbGVtZW50KTtcclxuICAgICAgdGhpcy5ub3RpZnlEcm9wRG93blZhbHVlLmVtaXQodGhpcy5kcm9wZG93blZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGxlZCBieSBkcm9wZG93biBpZiBjaGlsZCBlbGVtZW50IGlzIHByZXNlbnRcclxuICAgKi9cclxuXHJcbiAgcG9wdWxhdGVEcm9wRG93bkNvdW50ZXIoZGF0YU9iaiwgaSkge1xyXG4gICAgdGhpcy5kcm9wZG93blZhbHVlW2ldID0gZGF0YU9iajtcclxuICAgIHRoaXMuZHJvcERvd25Db3VudGVyWzBdID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5yb290RGF0YSk7XHJcbiAgICBmb3IgKGxldCBqID0gMTsgaiA8IHRoaXMuZHJvcGRvd25WYWx1ZS5sZW5ndGggKyAxOyBqKyspIHtcclxuICAgICAgdGhpcy5kcm9wRG93bkNvdW50ZXJbal0gPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLmRyb3Bkb3duVmFsdWVbaiAtIDFdLmNoaWxkRGF0YSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmRyb3Bkb3duVmFsdWVbaSArIDFdID0gJ2RlZmF1bHQnO1xyXG4gIH1cclxuXHJcbn1cclxuIl19