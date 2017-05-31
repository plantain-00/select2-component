import * as Vue from "vue";
import Component from "vue-class-component";
import * as common from "./common";
import { srcVueTemplateHtml } from "./vue-variables";

@Component({
    template: srcVueTemplateHtml,
    props: ["data", "value"],
})
class Select2 extends Vue {
    data: common.Select2Data[];
    value: string;

    hoveringValue: string | null = null;
    optionLabel = "";
    isOpen = false;

    get dropdownStyle() {
        return this.isOpen
            ? "select2-container select2-container--default select2-container--open"
            : "select2-container select2-container--default";
    }

    beforeMount() {
        for (const group of this.data) {
            for (const option of group.options) {
                if (option.value === this.value) {
                    this.optionLabel = option.label;
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
    }
    toggleOpenAndClose() {
        this.isOpen = !this.isOpen;
    }
}

Vue.component("select2", Select2);
