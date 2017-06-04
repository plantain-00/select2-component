import * as Vue from "vue";
import Component from "vue-class-component";
import "../../dist/vue";
import { data1, data2, data3 } from "../common";

@Component({
    template: `
    <div style="width: 500px;">
        <select2 :data="data1"
            :value="value1"
            @update="update1(arguments[0])">
        </select2>
        selected value: {{value1}}
        <hr/>
        <select2 :data="data2"
            :value="value2"
            @update="update2(arguments[0])">
        </select2>
        selected value: {{value2}}
        <hr/>
        <select2 :data="data3"
            :value="value3"
            @update="update3(arguments[0])">
        </select2>
        selected value: {{value3}}
        <hr/>
        <select2 :data="data4"
            :value="value4"
            :disabled="true">
        </select2>
        selected value: {{value4}}
    </div>
    `,
})
class App extends Vue {
    data1 = data1;
    data2 = data2;
    data3 = data3;
    data4 = JSON.parse(JSON.stringify(data3));

    value1 = "CA";
    value2 = "CA";
    value3 = "foo";
    value4 = "bar";

    update1(value: string) {
        this.value1 = value;
    }
    update2(value: string) {
        this.value2 = value;
    }
    update3(value: string) {
        this.value3 = value;
    }
}

// tslint:disable-next-line:no-unused-expression
new App({ el: "#container" });
