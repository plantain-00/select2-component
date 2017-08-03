import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, ChangeDetectorRef } from "@angular/core";
import * as common from "./common";
export * from "./common";
import { angularTemplateHtml } from "./angular-variables";

@Component({
    selector: "select2",
    template: angularTemplateHtml,
})
export class Select2Component {
    @Input()
    data: common.Select2Data;
    @Input()
    value?: common.Select2UpdateValue;
    @Input()
    disabled?: boolean;
    @Input()
    minCountForSearch?: number;
    @Input()
    placeholder?: string;
    @Input()
    customSearchEnabled?: boolean;
    @Input()
    multiple?: boolean;
    @Output()
    update = new EventEmitter();
    @Output()
    open = new EventEmitter();
    @Output()
    search = new EventEmitter();

    hoveringValue: common.Select2Value | null | undefined = null;
    option: common.Select2Option | common.Select2Option[] | null = null;
    isOpen = false;
    focusoutTimer?: NodeJS.Timer;
    innerSearchText = "";
    lastScrollTopIndex = 0;
    isSearchboxHidden: boolean;
    searchStyle: string;

    searchInputElement: HTMLElement;
    resultsElement: HTMLElement;

    @ViewChild("searchInput")
    searchInput: ElementRef;
    @ViewChild("results")
    results: ElementRef;

    constructor(private cdr: ChangeDetectorRef) { }

    get searchText() {
        return this.innerSearchText;
    }
    set searchText(text: string) {
        if (this.customSearchEnabled) {
            this.search.emit(text);
        }
        this.innerSearchText = text;
    }

    get dropdownStyle() {
        return common.getDropdownStyle(this.isOpen);
    }

    get filteredData() {
        const result = this.customSearchEnabled
            ? this.data
            : common.getFilteredData(this.data, this.searchText);

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

    get selectionStyle() {
        return common.getSelectionStyle(this.multiple);
    }

    ngOnInit() {
        const option = common.getOptionsByValue(this.data, this.value, this.multiple);
        if (option !== null) {
            this.option = option;
        }
        if (!Array.isArray(option)) {
            this.hoveringValue = this.value as string | undefined;
        }
        this.isSearchboxHidden = this.customSearchEnabled
            ? false
            : common.isSearchboxHiddex(this.data, this.minCountForSearch);
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
            this.select(option);
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
            this.innerSearchText = "";
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
            this.cdr.markForCheck();
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
            const option = common.getOptionByValue(this.data, this.hoveringValue);
            this.select(option);
        }
    }
    select(option: common.Select2Option | null) {
        if (option !== null) {
            if (this.multiple) {
                const options = this.option as common.Select2Option[];
                let index = -1;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].value === option.value) {
                        index = i;
                        break;
                    }
                }
                if (index === -1) {
                    options.push(option);
                } else {
                    options.splice(index, 1);
                }
            } else {
                this.option = option;
                this.isOpen = false;
            }
        }

        this.update.emit(this.multiple ? (this.option as common.Select2Option[]).map(op => op.value) : (this.option as common.Select2Option).value);
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
    isSelected(option: common.Select2Option) {
        return common.isSelected(this.option, option, this.multiple);
    }
    isDisabled(option: common.Select2Option) {
        return option.disabled ? "true" : "false";
    }

    removeSelection(e: MouseEvent, option: common.Select2Option) {
        common.removeSelection(this.option, option);
        this.update.emit((this.option as common.Select2Option[]).map(op => op.value));

        e.preventDefault();
        e.stopPropagation();

        if (this.isOpen) {
            if (!this.isSearchboxHidden) {
                if (this.searchInputElement) {
                    this.searchInputElement.focus();
                }
            } else {
                if (this.resultsElement) {
                    this.resultsElement.focus();
                }
            }
        }

        if (this.focusoutTimer) {
            clearTimeout(this.focusoutTimer);
        }
    }
}
