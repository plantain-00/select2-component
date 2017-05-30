import * as Vue from "vue";
import Component from "vue-class-component";
import "../../dist/vue";
import { data } from "../common";

@Component({
    template: `
    <select2 :data="data"
        value="AK">
    </select2>
    `,
})
class App extends Vue {
    data = data;
}

/* tslint:disable:no-unused-expression */
new App({ el: "#container" });
/* tslint:enable:no-unused-expression */
