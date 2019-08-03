/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Angular imports
import { Component, Input, Output, EventEmitter } from '@angular/core';
var NgCascadingDropdownLibComponent = /** @class */ (function () {
    /**
     * Class Constructor
     */
    function NgCascadingDropdownLibComponent() {
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
     */
    /**
     * Angular Life Cycle Hook
     * @return {?}
     */
    NgCascadingDropdownLibComponent.prototype.ngOnInit = /**
     * Angular Life Cycle Hook
     * @return {?}
     */
    function () {
        if (this.inputCascadingData) {
            this.dropdownData = this.inputCascadingData;
            this.processParentDropdownData();
        }
    };
    /**
     * Separate Server Dropdown Data into Parent And Child Array
     * and Call Parsing Function
     */
    /**
     * Separate Server Dropdown Data into Parent And Child Array
     * and Call Parsing Function
     * @return {?}
     */
    NgCascadingDropdownLibComponent.prototype.processParentDropdownData = /**
     * Separate Server Dropdown Data into Parent And Child Array
     * and Call Parsing Function
     * @return {?}
     */
    function () {
        this.rootData = this.processParentChildDropdownData(this.dropdownData);
        this.dropDownCounter.push(Object.assign([], this.rootData));
        this.dropdownValue[0] = 'default';
    };
    /**
     * Calls Parsing function and returns Parsed Array(Parent-Child Relationship)
     */
    /**
     * Calls Parsing function and returns Parsed Array(Parent-Child Relationship)
     * @param {?} data
     * @return {?}
     */
    NgCascadingDropdownLibComponent.prototype.processParentChildDropdownData = /**
     * Calls Parsing function and returns Parsed Array(Parent-Child Relationship)
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var tree = this.unflattenJson(data);
        return tree;
    };
    /**
     * Converting Flat JSON to Parent-Child Tree
     */
    /**
     * Converting Flat JSON to Parent-Child Tree
     * @param {?} data
     * @return {?}
     */
    NgCascadingDropdownLibComponent.prototype.unflattenJson = /**
     * Converting Flat JSON to Parent-Child Tree
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var tree = [];
        /** @type {?} */
        var mappedArr = {};
        /** @type {?} */
        var arrElem;
        /** @type {?} */
        var mappedElem;
        for (var i = 0, len = data.length; i < len; i++) {
            arrElem = data[i];
            mappedArr[arrElem.id] = arrElem;
            mappedArr[arrElem.id].childData = [];
        }
        for (var id in mappedArr) {
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
    };
    /**
     * Handle Dropdown change and do conditional Checking
     */
    /**
     * Handle Dropdown change and do conditional Checking
     * @param {?} dataObj
     * @param {?} i
     * @return {?}
     */
    NgCascadingDropdownLibComponent.prototype.onDropdownChange = /**
     * Handle Dropdown change and do conditional Checking
     * @param {?} dataObj
     * @param {?} i
     * @return {?}
     */
    function (dataObj, i) {
        if (dataObj !== 'default' && dataObj.childData.length > 0) { // If child elements are present
            // If child elements are present
            /** @type {?} */
            var currentLength = i;
            this.dropDownCounter = [];
            if (i === 0) {
                this.dropdownValue = [];
            }
            for (var index = this.dropdownValue.length - 1; index > currentLength; index--) {
                this.dropdownValue.splice(index, 1);
            }
            this.populateDropDownCounter(dataObj, i);
            this.notifyChangeEvent.emit(false);
        }
        else if (dataObj === 'default') { // for default condition
            // for default condition
            /** @type {?} */
            var currentLength = i;
            this.dropdownValue[i] = 'default';
            for (var index = this.dropdownValue.length - 1; index > currentLength; index--) {
                this.dropdownValue.splice(index, 1);
            }
            for (var index = this.dropDownCounter.length - 1; index > currentLength; index--) {
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
    };
    /**
     * Called by dropdown if child element is present
     */
    /**
     * Called by dropdown if child element is present
     * @param {?} dataObj
     * @param {?} i
     * @return {?}
     */
    NgCascadingDropdownLibComponent.prototype.populateDropDownCounter = /**
     * Called by dropdown if child element is present
     * @param {?} dataObj
     * @param {?} i
     * @return {?}
     */
    function (dataObj, i) {
        this.dropdownValue[i] = dataObj;
        this.dropDownCounter[0] = Object.assign([], this.rootData);
        for (var j = 1; j < this.dropdownValue.length + 1; j++) {
            this.dropDownCounter[j] = Object.assign([], this.dropdownValue[j - 1].childData);
        }
        this.dropdownValue[i + 1] = 'default';
    };
    NgCascadingDropdownLibComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-cascading-dropdown',
                    template: "<ng-container *ngIf=\"dropDownCounter.length > 0\">\r\n    <div class=\"parent-container\">\r\n        <div *ngFor=\"let dropDownData of dropDownCounter; let i =index;\" [ngClass]=\"showHorizontal ? 'dropdown-container-horizontal' : 'dropdown-container-vertical'\">\r\n            <select [disabled]=\"disableDropdown\" name=\"dropdown\" [ngModel]=\"dropdownValue[i]\" [ngClass]=\"showHorizontal ? 'select-horizontal' : 'select-vertical'\"\r\n                (ngModelChange)=\"onDropdownChange($event, i)\">\r\n                <ng-container *ngIf=\"showDefaultSelection\">\r\n                    <option value=\"default\">\r\n                        {{ defaultSelectionData[i] }}\r\n                    </option>\r\n                </ng-container>\r\n                <option [ngValue]=\"data\" *ngFor=\"let data of dropDownData; let i=index;\">\r\n                    {{ data.grpName }}\r\n                </option>\r\n            </select>\r\n        </div>\r\n    </div>\r\n</ng-container>",
                    styles: [".dropdown-container-horizontal{display:inline-block;margin:1%;width:10%}.dropdown-container-vertical{margin:1%;width:10%}.select-horizontal,.select-vertical{width:90%;height:30px;background-color:#fff!important;border-radius:3px;box-shadow:0 1px 5px #959595}"]
                }] }
    ];
    /** @nocollapse */
    NgCascadingDropdownLibComponent.ctorParameters = function () { return []; };
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
    return NgCascadingDropdownLibComponent;
}());
export { NgCascadingDropdownLibComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2FzY2FkaW5nLWRyb3Bkb3duLWxpYi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1jYXNjYWRpbmctZHJvcGRvd24tbGliLyIsInNvdXJjZXMiOlsibGliL25nLWNhc2NhZGluZy1kcm9wZG93bi1saWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvRTtJQTZDRTs7T0FFRztJQUNIOzs7O1FBdENPLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBRXBCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCx5QkFBb0IsR0FBRyxFQUFFLENBQUM7O1FBWXpCLG9CQUFlLEdBQUcsS0FBSyxDQUFDOztRQUd4Qix5QkFBb0IsR0FBRyxLQUFLLENBQUM7O1FBRzdCLG1CQUFjLEdBQUcsSUFBSSxDQUFDOztRQUdyQiw2QkFBd0IsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDOztRQUc5Qyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDOztRQUd6QyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBS2pDLENBQUM7SUFHakI7O09BRUc7Ozs7O0lBQ0gsa0RBQVE7Ozs7SUFBUjtRQUNFLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBQzVDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBRUgsbUVBQXlCOzs7OztJQUF6QjtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFD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QUF5Qjs7SUFDekIsd0RBQTBCOztJQUMxQix3REFBMEI7O0lBQzFCLDBEQUE0Qjs7Ozs7SUFFNUIsbURBQXNCOzs7OztJQUN0QiwrREFBa0M7Ozs7O0lBTWxDLDZEQUE0Qjs7SUFHNUIsK0RBQThCOztJQUc5QiwwREFBaUM7O0lBR2pDLCtEQUFzQzs7SUFHdEMseURBQStCOztJQUcvQixtRUFBd0Q7O0lBR3hELDhEQUFtRDs7SUFHbkQsNERBQWlEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQW5ndWxhciBpbXBvcnRzXHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmctY2FzY2FkaW5nLWRyb3Bkb3duJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbmctY2FzY2FkaW5nLWRyb3Bkb3duLWxpYi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbmctY2FzY2FkaW5nLWRyb3Bkb3duLWxpYi5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nQ2FzY2FkaW5nRHJvcGRvd25MaWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAvKipcclxuICAgKiBQYWdlIFNwZWNpZmljIFByb3Anc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBkcm9wZG93bkRhdGEgPSBbXTtcclxuICBwdWJsaWMgZHJvcGRvd25WYWx1ZSA9IFtdO1xyXG4gIHB1YmxpYyBjaGlsZFJvb3REYXRhID0gW107XHJcbiAgcHVibGljIGRyb3BEb3duQ291bnRlciA9IFtdO1xyXG5cclxuICBwcml2YXRlIHJvb3REYXRhID0gW107XHJcbiAgcHJpdmF0ZSBmaW5hbFNlbGVjdGVkRWxlbWVudCA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBJbnB1dCBPdXRwdXQgUHJvcCdzXHJcbiAgICovXHJcbiAgLy8gSW5wdXQgRGF0YSBmb3IgY2FzY2FkaW5nIGRyb3Bkb3duXHJcbiAgQElucHV0KCkgaW5wdXRDYXNjYWRpbmdEYXRhO1xyXG5cclxuICAvLyBJbnB1dCBEYXRhIGZvciBkZWZhdWx0IHNlbGVjdGlvbiB0byBiZSBzaG93IHBlciBkcm9wZG93blxyXG4gIEBJbnB1dCgpIGRlZmF1bHRTZWxlY3Rpb25EYXRhO1xyXG5cclxuICAvLyBUb2dnbGUgRHJvcGRvd24gZGlzYWJpbGl0eVxyXG4gIEBJbnB1dCgpIGRpc2FibGVEcm9wZG93biA9IGZhbHNlO1xyXG5cclxuICAvLyBTaG93IERlZmF1bHQgU2VsZWN0aW9uXHJcbiAgQElucHV0KCkgc2hvd0RlZmF1bHRTZWxlY3Rpb24gPSBmYWxzZTtcclxuXHJcbiAgLy8gU2hvdyBIb3Jpem9udGFsIGRyb3Bkb3duIG9yIFZlcnRpY2FsIGRyb3Bkb3duXHJcbiAgQElucHV0KCkgc2hvd0hvcml6b250YWwgPSB0cnVlO1xyXG5cclxuICAvLyBOb3RpZnkgdGhlIGZpbmFsIGRyb3Bkb3duIHZhbHVlIHNlbGVjdGVkXHJcbiAgQE91dHB1dCgpIG5vdGlmeUZpbmFsRHJvcERvd25WYWx1ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLy8gTm90aWZ5IGFsbCB0aGUgU2VsZWN0ZWQgVmFsdWVzIHBlciBkcm9wZG93blxyXG4gIEBPdXRwdXQoKSBub3RpZnlEcm9wRG93blZhbHVlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvLyBOb3RpZnkgaWYgZHJvcGRvd24gdmFsdWUgaXMgY2hhbmdlZFxyXG4gIEBPdXRwdXQoKSBub3RpZnlDaGFuZ2VFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2xhc3MgQ29uc3RydWN0b3JcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQW5ndWxhciBMaWZlIEN5Y2xlIEhvb2tcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLmlucHV0Q2FzY2FkaW5nRGF0YSkge1xyXG4gICAgICB0aGlzLmRyb3Bkb3duRGF0YSA9IHRoaXMuaW5wdXRDYXNjYWRpbmdEYXRhO1xyXG4gICAgICB0aGlzLnByb2Nlc3NQYXJlbnREcm9wZG93bkRhdGEoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlcGFyYXRlIFNlcnZlciBEcm9wZG93biBEYXRhIGludG8gUGFyZW50IEFuZCBDaGlsZCBBcnJheVxyXG4gICAqIGFuZCBDYWxsIFBhcnNpbmcgRnVuY3Rpb25cclxuICAgKi9cclxuXHJcbiAgcHJvY2Vzc1BhcmVudERyb3Bkb3duRGF0YSgpIHtcclxuICAgIHRoaXMucm9vdERhdGEgPSB0aGlzLnByb2Nlc3NQYXJlbnRDaGlsZERyb3Bkb3duRGF0YSh0aGlzLmRyb3Bkb3duRGF0YSk7XHJcbiAgICB0aGlzLmRyb3BEb3duQ291bnRlci5wdXNoKE9iamVjdC5hc3NpZ24oW10sIHRoaXMucm9vdERhdGEpKTtcclxuICAgIHRoaXMuZHJvcGRvd25WYWx1ZVswXSA9ICdkZWZhdWx0JztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGxzIFBhcnNpbmcgZnVuY3Rpb24gYW5kIHJldHVybnMgUGFyc2VkIEFycmF5KFBhcmVudC1DaGlsZCBSZWxhdGlvbnNoaXApXHJcbiAgICovXHJcblxyXG4gIHByb2Nlc3NQYXJlbnRDaGlsZERyb3Bkb3duRGF0YShkYXRhKSB7XHJcbiAgICBjb25zdCB0cmVlID0gdGhpcy51bmZsYXR0ZW5Kc29uKGRhdGEpO1xyXG4gICAgcmV0dXJuIHRyZWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb252ZXJ0aW5nIEZsYXQgSlNPTiB0byBQYXJlbnQtQ2hpbGQgVHJlZVxyXG4gICAqL1xyXG5cclxuICB1bmZsYXR0ZW5Kc29uKGRhdGEpIHtcclxuICAgIGNvbnN0IHRyZWUgPSBbXTtcclxuICAgIGNvbnN0IG1hcHBlZEFyciA9IHt9O1xyXG4gICAgbGV0IGFyckVsZW07XHJcbiAgICBsZXQgbWFwcGVkRWxlbTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gZGF0YS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBhcnJFbGVtID0gZGF0YVtpXTtcclxuICAgICAgbWFwcGVkQXJyW2FyckVsZW0uaWRdID0gYXJyRWxlbTtcclxuICAgICAgbWFwcGVkQXJyW2FyckVsZW0uaWRdLmNoaWxkRGF0YSA9IFtdO1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBpZCBpbiBtYXBwZWRBcnIpIHtcclxuICAgICAgaWYgKG1hcHBlZEFyci5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcclxuICAgICAgICBtYXBwZWRFbGVtID0gbWFwcGVkQXJyW2lkXTtcclxuICAgICAgICBpZiAobWFwcGVkRWxlbS5wYXJlbnRHcm91cElEKSB7XHJcbiAgICAgICAgICBtYXBwZWRBcnJbbWFwcGVkRWxlbS5wYXJlbnRHcm91cElEXS5jaGlsZERhdGEucHVzaChtYXBwZWRFbGVtKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdHJlZS5wdXNoKG1hcHBlZEVsZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRyZWU7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlIERyb3Bkb3duIGNoYW5nZSBhbmQgZG8gY29uZGl0aW9uYWwgQ2hlY2tpbmdcclxuICAgKi9cclxuXHJcbiAgb25Ecm9wZG93bkNoYW5nZShkYXRhT2JqLCBpKSB7XHJcbiAgICBpZiAoZGF0YU9iaiAhPT0gJ2RlZmF1bHQnICYmIGRhdGFPYmouY2hpbGREYXRhLmxlbmd0aCA+IDApIHsgLy8gSWYgY2hpbGQgZWxlbWVudHMgYXJlIHByZXNlbnRcclxuICAgICAgY29uc3QgY3VycmVudExlbmd0aCA9IGk7XHJcbiAgICAgIHRoaXMuZHJvcERvd25Db3VudGVyID0gW107XHJcbiAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5kcm9wZG93blZhbHVlID0gW107XHJcbiAgICAgIH1cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSB0aGlzLmRyb3Bkb3duVmFsdWUubGVuZ3RoIC0gMTsgaW5kZXggPiBjdXJyZW50TGVuZ3RoOyBpbmRleC0tKSB7XHJcbiAgICAgICAgdGhpcy5kcm9wZG93blZhbHVlLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5wb3B1bGF0ZURyb3BEb3duQ291bnRlcihkYXRhT2JqLCBpKTtcclxuICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VFdmVudC5lbWl0KGZhbHNlKTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YU9iaiA9PT0gJ2RlZmF1bHQnKSB7IC8vIGZvciBkZWZhdWx0IGNvbmRpdGlvblxyXG4gICAgICBjb25zdCBjdXJyZW50TGVuZ3RoID0gaTtcclxuICAgICAgdGhpcy5kcm9wZG93blZhbHVlW2ldID0gJ2RlZmF1bHQnO1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IHRoaXMuZHJvcGRvd25WYWx1ZS5sZW5ndGggLSAxOyBpbmRleCA+IGN1cnJlbnRMZW5ndGg7IGluZGV4LS0pIHtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duVmFsdWUuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IHRoaXMuZHJvcERvd25Db3VudGVyLmxlbmd0aCAtIDE7IGluZGV4ID4gY3VycmVudExlbmd0aDsgaW5kZXgtLSkge1xyXG4gICAgICAgIHRoaXMuZHJvcERvd25Db3VudGVyLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VFdmVudC5lbWl0KGZhbHNlKTtcclxuICAgIH0gZWxzZSB7IC8vIGZvciBmaW5hbCBlbGVtZW50IHdpdGggbm8gY2hpbGQgZWxlbWVudFxyXG4gICAgICB0aGlzLmRyb3Bkb3duVmFsdWVbaV0gPSBkYXRhT2JqO1xyXG4gICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMuZHJvcERvd25Db3VudGVyID0gW107XHJcbiAgICAgICAgdGhpcy5kcm9wZG93blZhbHVlID0gW107XHJcbiAgICAgICAgdGhpcy5kcm9wRG93bkNvdW50ZXJbMF0gPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLnJvb3REYXRhKTtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duVmFsdWVbMF0gPSBkYXRhT2JqO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZHJvcERvd25Db3VudGVyID0gdGhpcy5kcm9wRG93bkNvdW50ZXIuc2xpY2UoMCwgaSArIDEpO1xyXG4gICAgICAgIHRoaXMuZHJvcGRvd25WYWx1ZSA9IHRoaXMuZHJvcGRvd25WYWx1ZS5zbGljZSgwLCBpICsgMSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5maW5hbFNlbGVjdGVkRWxlbWVudCA9IHt9O1xyXG4gICAgICB0aGlzLmZpbmFsU2VsZWN0ZWRFbGVtZW50ID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YU9iaik7XHJcbiAgICAgIHRoaXMubm90aWZ5RmluYWxEcm9wRG93blZhbHVlLmVtaXQodGhpcy5maW5hbFNlbGVjdGVkRWxlbWVudCk7XHJcbiAgICAgIHRoaXMubm90aWZ5RHJvcERvd25WYWx1ZS5lbWl0KHRoaXMuZHJvcGRvd25WYWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgYnkgZHJvcGRvd24gaWYgY2hpbGQgZWxlbWVudCBpcyBwcmVzZW50XHJcbiAgICovXHJcblxyXG4gIHBvcHVsYXRlRHJvcERvd25Db3VudGVyKGRhdGFPYmosIGkpIHtcclxuICAgIHRoaXMuZHJvcGRvd25WYWx1ZVtpXSA9IGRhdGFPYmo7XHJcbiAgICB0aGlzLmRyb3BEb3duQ291bnRlclswXSA9IE9iamVjdC5hc3NpZ24oW10sIHRoaXMucm9vdERhdGEpO1xyXG4gICAgZm9yIChsZXQgaiA9IDE7IGogPCB0aGlzLmRyb3Bkb3duVmFsdWUubGVuZ3RoICsgMTsgaisrKSB7XHJcbiAgICAgIHRoaXMuZHJvcERvd25Db3VudGVyW2pdID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5kcm9wZG93blZhbHVlW2ogLSAxXS5jaGlsZERhdGEpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kcm9wZG93blZhbHVlW2kgKyAxXSA9ICdkZWZhdWx0JztcclxuICB9XHJcblxyXG59XHJcbiJdfQ==