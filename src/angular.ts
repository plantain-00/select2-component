import {
    Component, Input, Output, EventEmitter, ElementRef, ViewChild, Optional, Self, ChangeDetectorRef, ViewEncapsulation,
    Attribute
} from "@angular/core";
import {
    FormGroupDirective, NgControl, NgForm, ControlValueAccessor
} from '@angular/forms';

import { Subject } from 'rxjs';

import * as common from "./common";
export * from "./common";

let nextUniqueId = 0;

@Component({
    selector: 'select2',
    styleUrls: ['./angulat.scss'],
    templateUrl: './select2.html',
    encapsulation: ViewEncapsulation.None,
    host: {
        '[id]': 'id',
        '[attr.aria-invalid]': '_isErrorState()'
    }
})
export class Select2 implements ControlValueAccessor {

    /** data of options & optiongrps */
    @Input() data: common.Select2Data;
    /** minimal data of show the search field */
    @Input() minCountForSearch?: number;
    @Input() placeholder?: string;
    @Input() customSearchEnabled?: boolean;
    @Input() multiple?: boolean;

    /** use the material style */
    @Input() material?: string;

    @Output() update = new EventEmitter();
    @Output() open = new EventEmitter();
    @Output() search = new EventEmitter();

    hoveringValue: common.Select2Value | null | undefined = null;
    option: common.Select2Option | common.Select2Option[] | null = null;
    isOpen = false;
    focusoutTimer?: any;
    innerSearchText = "";
    lastScrollTopIndex = 0;
    isSearchboxHidden: boolean;
    searchStyle: string;

    searchInputElement: HTMLElement;
    resultsElement: HTMLElement;

    @ViewChild("searchInput") searchInput: ElementRef;
    @ViewChild("results") results: ElementRef;

    _stateChanges = new Subject<void>();

    /** Whether the element is focused or not. */
    focused = false;

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
                const lastScrollTopIndex = common.getLastScrollTopIndex(
                    this.hoveringValue,
                    this.resultsElement,
                    result,
                    this.lastScrollTopIndex
                );
                if (lastScrollTopIndex !== null) {
                    this.lastScrollTopIndex = lastScrollTopIndex;
                }
            }
        }
        return result;
    }

    get containerStyle() {
        return common.getContainerStyle(this.disabled, this.isOpen)
            + (this.material === '' || this.material === 'true' ? ' material' : '');
    }

    get selectionStyle() {
        return common.getSelectionStyle(this.multiple);
    }

    /** Unique id of the element. */
    @Input()
    get id() { return this._id; }
    set id(value: string) { console.log(value); this._id = value || this._uid; }

    /** Whether the element is required. */
    @Input()
    get required() { return this._required; }
    set required(value: any) { this._required = this._coerceBooleanProperty(value); }

    /** Whether the element is disabled. */
    @Input()
    get disabled() { return false; /*this._ngControl ? this._ngControl.disabled : this._disabled;*/ }
    set disabled(value: any) { this._disabled = this._coerceBooleanProperty(value); }

    /** Whether the element is readonly. */
    @Input()
    get readonly() { return this._readonly; }
    set readonly(value: any) { this._readonly = this._coerceBooleanProperty(value); }

    /** The input element's value. */
    @Input()
    get value() { return this._value; }
    set value(value: common.Select2UpdateValue) {
        this.writeValue(value);
        this._value = value;
    }

    /** Tab index for the select2 element. */
    @Input()
    get tabIndex(): number { return this.disabled ? -1 : this._tabIndex; }
    set tabIndex(value: number) {
        if (typeof value !== 'undefined') {
            this._tabIndex = value;
        }
    }

    /** View -> model callback called when select has been touched */
    _onTouched = () => { };

    /** View -> model callback called when value changes */
    _onChange: (value: any) => void = () => { };

    /** Tab index for the element. */
    private _tabIndex: number;

    private _disabled = false;
    private _required = false;
    private _readonly = false;
    private _id: string;
    private _uid = `select2-${nextUniqueId++}`;
    private _value: common.Select2UpdateValue;
    private _previousNativeValue = this._value;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        @Optional() private _parentForm: NgForm,
        @Optional() private _parentFormGroup: FormGroupDirective,
        @Self() @Optional() public _control: NgControl,
        @Attribute('tabindex') tabIndex: string
    ) {

        this.id = this.id;
        this._tabIndex = parseInt(tabIndex) || 0;

        if (this._control) {
            this._control.valueAccessor = this;
        }

    }

    ngOnInit() {
        const option = common.getOptionsByValue(
            this.data,
            this._control ? this._control.value : this.value,
            this.multiple
        );
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

    ngDoCheck() {
        this._dirtyCheckNativeValue();
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
        this.focused = true;
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
                const lastScrollTopIndex = common.getLastScrollTopIndex(
                    this.hoveringValue,
                    this.resultsElement,
                    this.data,
                    this.lastScrollTopIndex
                );
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

    focusin() {
        this.focused = true;
    }

    focusout(field: string) {
        if ((this.focused && !this.isOpen) || field == 'searchInput') {
            this.focusoutTimer = setTimeout(() => {
                this.isOpen = false;
                this.focusoutTimer = undefined;
                this.focused = false;
                this._onTouched();
           	this._changeDetectorRef.markForCheck();
            }, common.timeout);
        }
    }

    moveUp() {
        this.hoveringValue = common.getPreviousOption(this.filteredData, this.hoveringValue);

        if (this.resultsElement) {
            const lastScrollTopIndex = common.getLastScrollTopIndex(
                this.hoveringValue,
                this.resultsElement,
                this.filteredData,
                this.lastScrollTopIndex
            );
            if (lastScrollTopIndex !== null) {
                this.lastScrollTopIndex = lastScrollTopIndex;
            }
        }
    }

    moveDown() {
        this.hoveringValue = common.getNextOption(this.filteredData, this.hoveringValue);

        if (this.resultsElement) {
            const lastScrollTopIndex = common.getLastScrollTopIndex(
                this.hoveringValue,
                this.resultsElement,
                this.filteredData,
                this.lastScrollTopIndex
            );
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

        let value = this.multiple
            ? (this.option as common.Select2Option[]).map(op => op.value)
            : (this.option as common.Select2Option).value

        if (this._control) {
            this._control.reset(value);
            this._onChange(value);
        }
        this.update.emit(value);
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
        } else if (e.keyCode === 9 && this.isOpen) {
            this.toggleOpenAndClose();
            this.focused = false;
        }
    }

    openKey(e: KeyboardEvent) {
        if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 13) {
            this.toggleOpenAndClose();
            e.preventDefault();
        } else if (e.keyCode === 9) {
            this.focused = false;
            this._onTouched();
        }
    }

    searchUpdate(e: Event) {
        this.searchText = (<HTMLInputElement>e.target).value;
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

    /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
    writeValue(value: any) {
        this._setSelectionByValue(value);
    }

    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the value changes.
     */
    registerOnChange(fn: (value: any) => void): void {
        this._onChange = fn;
    }

    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the component has been touched.
     */
    registerOnTouched(fn: () => {}): void {
        this._onTouched = fn;
    }

    /**
     * Sets whether the component should be disabled.
     * Implemented as part of ControlValueAccessor.
     * @param isDisabled
     */
    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    _isErrorState(): boolean {
        const isInvalid = this._control && this._control.invalid;
        const isTouched = this._control && this._control.touched;
        const isSubmitted = (this._parentFormGroup && this._parentFormGroup.submitted) ||
            (this._parentForm && this._parentForm.submitted);

        return !!(isInvalid && (isTouched || isSubmitted));
    }

    /**
   * Sets the selected option based on a value. If no option can be
   * found with the designated value, the select trigger is cleared.
   */
    private _setSelectionByValue(value: any | any[], isUserInput = false): void {
        const isArray = Array.isArray(value);

        if (this.multiple && value && !isArray) {
            throw 'Non array value.';
        }

        this._changeDetectorRef.markForCheck();
    }


    /** Does some manual dirty checking on the native input `value` property. */
    private _dirtyCheckNativeValue() {
        const newValue = this.value;

        if (this._previousNativeValue !== newValue) {
            this._previousNativeValue = newValue;
            this._stateChanges.next();
        }
    }

    private _coerceBooleanProperty(value: any): boolean {
        return value != null && `${value}` !== 'false';
    }
}
