import * as Vue from "vue";
import Component from "vue-class-component";
import * as common from "./common";
import { srcVueTemplateHtml } from "./vue-variables";

@Component({
    template: srcVueTemplateHtml,
    props: ["data", "value", "disabled", "minCountForSearch", "placeholder"],
})
class Select2 extends Vue {
    data: common.Select2Data;
    value?: string;
    disabled?: boolean;
    minCountForSearch?: number;
    placeholder?: string;

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

    beforeMount() {
        const label = common.getLabelByValue(this.data, this.value);
        if (label !== null) {
            this.optionLabel = label;
        }
        this.innerValue = this.value;
        this.hoveringValue = this.value;
        this.isSearchboxHidden = common.isSearchboxHiddex(this.data, this.minCountForSearch);
        this.searchStyle = common.getSearchStyle(this.isSearchboxHidden);
    }

    mounted() {
        this.searchInputElement = this.$refs.searchInput as HTMLElement;
        this.resultsElement = this.$refs.results as HTMLElement;
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
            this.$emit("update", option.value);
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
            Vue.nextTick(() => {
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
            });
            this.$emit("open");
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
            this.$emit("update", this.hoveringValue);

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

Vue.component("select2", Select2);
