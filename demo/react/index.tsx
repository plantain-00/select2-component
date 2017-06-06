import * as React from "react";
import * as ReactDOM from "react-dom";
import { Select2 } from "../../dist/react";
import { data1, data2, data3, data5 } from "../common";
import * as common from "../../dist/common";

class Main extends React.Component<{}, {}> {
    data1 = data1;
    data2 = data2;
    data3 = data3;
    data4 = JSON.parse(JSON.stringify(data3));
    data5 = data5;
    data6 = JSON.parse(JSON.stringify(data3));
    data7: common.Select2Option[] = [];

    value1 = "CA";
    value2 = "CA";
    value3 = "foo";
    value4 = "bar";
    value5 = "foo3";
    value6 = "";
    value7 = "";

    update1(value: string) {
        this.value1 = value;
        this.setState({ value1: this.value1 });
    }
    update2(value: string) {
        this.value2 = value;
        this.setState({ value2: this.value2 });
    }
    update3(value: string) {
        this.value3 = value;
        this.setState({ value3: this.value3 });
    }
    update5(value: string) {
        this.value5 = value;
        this.setState({ value5: this.value5 });
    }
    update6(value: string) {
        this.value6 = value;
        this.setState({ value6: this.value6 });
    }
    open7() {
        this.data7 = JSON.parse(JSON.stringify(data2));
        this.setState({ data7: this.data7 });
    }
    update7(value: string) {
        this.value7 = value;
        this.setState({ value7: this.value7 });
    }
    search7(text: string) {
        this.data7 = text
            ? (JSON.parse(JSON.stringify(data2)) as common.Select2Option[]).filter(option => option.label.toLowerCase().indexOf(text.toLowerCase()) > -1)
            : JSON.parse(JSON.stringify(data2));
        this.setState({ data7: this.data7 });
    }

    render() {
        return (
            <div style={{ width: "500px" }}>
                <a href="https://github.com/plantain-00/select2-component/tree/master/demo/react/index.tsx" target="_blank">the source code of the demo</a>
                <h3>options in group({this.value1})</h3>
                <Select2 data={this.data1}
                    value={this.value1}
                    update={value => this.update1(value)}>
                </Select2>
                <h3>options ({this.value2})</h3>
                <Select2 data={this.data2}
                    value={this.value2}
                    update={value => this.update2(value)}>
                </Select2>
                <h3>less options ({this.value3})</h3>
                <Select2 data={this.data3}
                    value={this.value3}
                    update={value => this.update3(value)}>
                </Select2>
                <h3>disabled ({this.value4})</h3>
                <Select2 data={this.data4}
                    value={this.value4}
                    disabled={true}>
                </Select2>
                <h3>hide search box ({this.value5})</h3>
                <Select2 data={this.data5}
                    value={this.value5}
                    minCountForSearch={Infinity}
                    update={value => this.update5(value)}>
                </Select2>
                <h3>placeholder ({this.value6})</h3>
                <Select2 data={this.data6}
                    placeholder="select an item"
                    update={value => this.update6(value)}>
                </Select2>
                <h3>open and search event ({this.value7})</h3>
                <Select2 data={this.data7}
                    customSearchEnabled={true}
                    open={() => this.open7()}
                    search={text => this.search7(text)}
                    update={value => this.update7(value)}>
                </Select2>
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("container"));
