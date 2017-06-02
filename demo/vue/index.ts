import * as Vue from "vue";
import Component from "vue-class-component";
import "../../dist/vue";
import { data1, data2, data3 } from "../common";

@Component({
    template: `
    <div style="width: 500px;">
        <select2 :data="data1"
            :value="value1"
            @select="select1(arguments[0])">
        </select2>
        selected value: {{value1}}
        <hr/>
        <select2 :data="data2"
            :value="value2"
            @select="select2(arguments[0])">
        </select2>
        selected value: {{value2}}
        <hr/>
        <select2 :data="data3"
            :value="value3"
            @select="select3(arguments[0])">
        </select2>
        selected value: {{value3}}
    </div>
    `,
})
class App extends Vue {
    data1 = data1;
    data2 = data2;
    data3 = data3;

    value1 = "CA";
    value2 = "CA";
    value3 = "foo";

    select1(value: string) {
        this.value1 = value;
    }
    select2(value: string) {
        this.value2 = value;
    }
    select3(value: string) {
        this.value3 = value;
    }
}

// tslint:disable-next-line:no-unused-expression
new App({ el: "#container" });
