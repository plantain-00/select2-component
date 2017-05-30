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
}

Vue.component("select2", Select2);
