import * as Vue from "vue";
import Component from "vue-class-component";
import "../../dist/vue";
import { data1, data2, data3, data5 } from "../common";

@Component({
    template: `
    <div style="width: 500px;">
        <a href="https://github.com/plantain-00/select2-component/tree/master/demo/vue/index.ts" target="_blank">the source code of the demo</a>
        <h3>options in group({{value1}})</h3>
        <select2 :data="data1"
            :value="value1"
            @update="update1(arguments[0])">
        </select2>
        <h3>options ({{value2}})</h3>
        <select2 :data="data2"
            :value="value2"
            @update="update2(arguments[0])">
        </select2>
        <h3>less options ({{value3}})</h3>
        <select2 :data="data3"
            :value="value3"
            @update="update3(arguments[0])">
        </select2>
        <h3>disabled ({{value4}})</h3>
        <select2 :data="data4"
            :value="value4"
            :disabled="true">
        </select2>
        <h3>hide search box ({{value5}})</h3>
        <select2 :data="data5"
            :value="value5"
            :min-count-for-search="Infinity"
            @update="update5(arguments[0])">
        </select2>
        <h3>placeholder ({{value6}})</h3>
        <select2 :data="data6"
            placeholder="select an item"
            @update="update6(arguments[0])">
        </select2>
        <h3>open event ({{value7}})</h3>
        <select2 :data="data7"
            @open="open7()"
            @update="update7(arguments[0])">
        </select2>
    </div>
    `,
})
class App extends Vue {
    data1 = data1;
    data2 = data2;
    data3 = data3;
    data4 = JSON.parse(JSON.stringify(data3));
    data5 = data5;
    data6 = JSON.parse(JSON.stringify(data3));
    data7 = [];

    value1 = "CA";
    value2 = "CA";
    value3 = "foo";
    value4 = "bar";
    value5 = "foo3";
    value6 = "";
    value7 = "";

    update1(value: string) {
        this.value1 = value;
    }
    update2(value: string) {
        this.value2 = value;
    }
    update3(value: string) {
        this.value3 = value;
    }
    update5(value: string) {
        this.value5 = value;
    }
    update6(value: string) {
        this.value6 = value;
    }
    open7() {
        setTimeout(() => {
            this.data7 = JSON.parse(JSON.stringify(data3));
        }, 1000);
    }
    update7(value: string) {
        this.value7 = value;
    }
}

// tslint:disable-next-line:no-unused-expression
new App({ el: "#container" });
