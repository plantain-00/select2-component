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

    get dropdownStyle() {
        return this.isOpen
            ? "select2-container select2-container--default select2-container--open"
            : "select2-container select2-container--default";
    }

    beforeMount() {
        for (const groupOrOption of this.data) {
            if ((groupOrOption as common.Select2Group).options) {
                for (const option of (groupOrOption as common.Select2Group).options) {
                    if (option.value === this.value) {
                        this.optionLabel = option.label;
                        return;
                    }
                }
            } else {
                if ((groupOrOption as common.Select2Option).value === this.value) {
                    this.optionLabel = groupOrOption.label;
                    return;
                }
            }
        }
    }

    getOptionStyle(value: string) {
        return value === this.hoveringValue
            ? "select2-results__option select2-results__option--highlighted"
            : "select2-results__option";
    }
    mouseenter(value: string) {
        this.hoveringValue = value;
    }
    mouseleave() {
        this.hoveringValue = null;
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
            Vue.nextTick(() => {
                const searchInput = this.$refs.searchInput as HTMLElement;
                if (searchInput) {
                    searchInput.focus();
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
}

Vue.component("select2", Select2);
