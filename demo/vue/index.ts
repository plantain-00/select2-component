import * as Vue from "vue";
import Component from "vue-class-component";
import "../../dist/vue";
import { data1, data2 } from "../common";

@Component({
    template: `
    <div>
        <select2 :data="data1"
            value="AK">
        </select2>
        <select2 :data="data2"
            value="AK">
        </select2>
    </div>
    `,
})
class App extends Vue {
    data1 = data1;
    data2 = data2;
}

/* tslint:disable:no-unused-expression */
new App({ el: "#container" });
/* tslint:enable:no-unused-expression */
