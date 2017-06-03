import * as Vue from "vue";
import Component from "vue-class-component";
import * as common from "./common";
import { srcVueTemplateHtml } from "./vue-variables";

@Component({
    template: srcVueTemplateHtml,
    props: ["data", "value"],
})
class Select2 extends Vue {
    data: common.Select2Data;
    value: string;

    hoveringValue: string | null = null;
    optionLabel = "";
    isOpen = false;
    focusoutTimer?: NodeJS.Timer;
    searchText = "";
    lastScrollTopIndex = 0;

    searchInputElement: HTMLElement;
    resultsElement: HTMLElement;

    get dropdownStyle() {
        return common.getDropdownStyle(this.isOpen);
    }

    get filteredData() {
        const result = common.getFilteredData(this.data, this.searchText);

        if (common.valueIsNotInFilteredData(result, this.hoveringValue)) {
            this.hoveringValue = common.getFirstOption(result);

            if (this.resultsElement) {
                const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, result, this.lastScrollTopIndex);
                if (lastScrollTopIndex !== null) {
                    this.lastScrollTopIndex = lastScrollTopIndex;
                }
            }
        }
        return result;
    }

    beforeMount() {
        const label = common.getLabelByValue(this.data, this.value);
        if (label !== null) {
            this.optionLabel = label;
        }
        this.hoveringValue = this.value;
    }

    mounted() {
        this.searchInputElement = this.$refs.searchInput as HTMLElement;
        this.resultsElement = this.$refs.results as HTMLElement;
    }

    getOptionStyle(value: string) {
        return common.getOptionStyle(value, this.hoveringValue);
    }
    mouseenter(value: string) {
        this.hoveringValue = value;
    }
    click(option: common.Select2Option) {
        this.value = option.value;
        this.optionLabel = option.label;
        this.$emit("select", option.value);
        this.isOpen = false;
        if (this.focusoutTimer) {
            clearTimeout(this.focusoutTimer);
        }
    }
    toggleOpenAndClose() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.searchText = "";
            Vue.nextTick(() => {
                if (this.searchInputElement) {
                    this.searchInputElement.focus();
                }

                if (this.resultsElement) {
                    const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.data, this.lastScrollTopIndex);
                    if (lastScrollTopIndex !== null) {
                        this.lastScrollTopIndex = lastScrollTopIndex;
                    }
                }
            });
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
            this.value = this.hoveringValue;
            this.$emit("select", this.hoveringValue);

            const label = common.getLabelByValue(this.data, this.value);
            if (label !== null) {
                this.optionLabel = label;
            }

            this.isOpen = false;
        }
    }

    keyUp(e: KeyboardEvent) {
        if (e.keyCode === 40) {
            this.moveDown();
        } else if (e.keyCode === 38) {
            this.moveUp();
        } else if (e.keyCode === 13) {
            this.selectByEnter();
        }
    }
}

Vue.component("select2", Select2);
