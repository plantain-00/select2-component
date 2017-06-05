import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from "@angular/core";
import * as common from "./common";
import { srcAngularTemplateHtml } from "./angular-variables";

@Component({
    selector: "select2",
    template: srcAngularTemplateHtml,
})
export class Select2Component {
    @Input()
    data: common.Select2Data;
    @Input()
    value?: string;
    @Input()
    disabled?: boolean;
    @Input()
    minCountForSearch?: number;
    @Input()
    placeholder?: string;
    @Output()
    update = new EventEmitter();
    @Output()
    open = new EventEmitter();

    innerValue: string | null | undefined = "";
    hoveringValue: string | null | undefined = null;
    optionLabel = "";
    isOpen = false;
    focusoutTimer?: NodeJS.Timer;
    searchText = "";
    lastScrollTopIndex = 0;
    isSearchboxHidden: boolean;
    searchStyle: string;

    searchInputElement: HTMLElement;
    resultsElement: HTMLElement;

    @ViewChild("searchInput")
    searchInput: ElementRef;
    @ViewChild("results")
    results: ElementRef;

    get dropdownStyle() {
        return common.getDropdownStyle(this.isOpen);
    }

    get filteredData() {
        const result = common.getFilteredData(this.data, this.searchText);

        if (common.valueIsNotInFilteredData(result, this.hoveringValue)) {
            this.hoveringValue = common.getFirstAvailableOption(result);

            if (this.resultsElement) {
                const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, result, this.lastScrollTopIndex);
                if (lastScrollTopIndex !== null) {
                    this.lastScrollTopIndex = lastScrollTopIndex;
                }
            }
        }
        return result;
    }

    get containerStyle() {
        return common.getContainerStyle(this.disabled, this.isOpen);
    }

    ngOnInit() {
        const label = common.getLabelByValue(this.data, this.value);
        if (label !== null) {
            this.optionLabel = label;
        }
        this.innerValue = this.value;
        this.hoveringValue = this.value;
        this.isSearchboxHidden = common.isSearchboxHiddex(this.data, this.minCountForSearch);
        this.searchStyle = common.getSearchStyle(this.isSearchboxHidden);
    }

    ngAfterViewInit() {
        this.searchInputElement = this.searchInput.nativeElement as HTMLElement;
        this.resultsElement = this.results.nativeElement as HTMLElement;
    }

    getOptionStyle(value: string) {
        return common.getOptionStyle(value, this.hoveringValue);
    }
    mouseenter(option: common.Select2Option) {
        if (!option.disabled) {
            this.hoveringValue = option.value;
        }
    }
    click(option: common.Select2Option) {
        if (!option.disabled) {
            this.innerValue = option.value;
            this.optionLabel = option.label;
            this.update.emit(option.value);
            this.isOpen = false;
        }
        if (this.focusoutTimer) {
            clearTimeout(this.focusoutTimer);
        }
    }
    toggleOpenAndClose() {
        if (this.disabled) {
            return;
        }
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.searchText = "";
            if (!this.isSearchboxHidden) {
                if (this.searchInputElement) {
                    this.searchInputElement.focus();
                }
            } else {
                if (this.resultsElement) {
                    this.resultsElement.focus();
                }
            }

            if (this.resultsElement) {
                const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.data, this.lastScrollTopIndex);
                if (lastScrollTopIndex !== null) {
                    this.lastScrollTopIndex = lastScrollTopIndex;
                }
            }

            this.open.emit();
        }
        if (this.focusoutTimer) {
            clearTimeout(this.focusoutTimer);
        }
    }
    focusout() {
        this.focusoutTimer = setTimeout(() => {
            this.isOpen = false;
            this.focusoutTimer = undefined;
        }, common.timeout);
    }
    moveUp() {
        this.hoveringValue = common.getPreviousOption(this.filteredData, this.hoveringValue);

        if (this.resultsElement) {
            const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.filteredData, this.lastScrollTopIndex);
            if (lastScrollTopIndex !== null) {
                this.lastScrollTopIndex = lastScrollTopIndex;
            }
        }
    }
    moveDown() {
        this.hoveringValue = common.getNextOption(this.filteredData, this.hoveringValue);

        if (this.resultsElement) {
            const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.filteredData, this.lastScrollTopIndex);
            if (lastScrollTopIndex !== null) {
                this.lastScrollTopIndex = lastScrollTopIndex;
            }
        }
    }
    selectByEnter() {
        if (this.hoveringValue) {
            this.innerValue = this.hoveringValue;
            this.update.emit(this.hoveringValue);

            const label = common.getLabelByValue(this.data, this.innerValue);
            if (label !== null) {
                this.optionLabel = label;
            }

            this.isOpen = false;
        }
    }

    keyDown(e: KeyboardEvent) {
        if (e.keyCode === 40) {
            this.moveDown();
            e.preventDefault();
        } else if (e.keyCode === 38) {
            this.moveUp();
            e.preventDefault();
        } else if (e.keyCode === 13) {
            this.selectByEnter();
            e.preventDefault();
        }
    }
}
