import * as React from "react";
import * as ReactDOM from "react-dom";
import { Select2, Select2Option, Select2Data, Select2Group, Select2UpdateValue } from "../../dist/react";
import { data1, data2, data3, data5 } from "../common";

const CustomOption: React.StatelessComponent<{ option: Select2Option }> = props => <span>{props.option.label}<span style={{ float: "right", color: "red" }}>{props.option.value}</span></span>;
const data8: Select2Data = JSON.parse(JSON.stringify(data1));

for (const groupOrOption of data8) {
    const options = (groupOrOption as Select2Group).options;
    if (options) {
        for (const option of options) {
            option.component = CustomOption;
        }
    } else {
        (options as Select2Option).component = CustomOption;
    }
}

class Main extends React.Component<{}, {}> {
    private data1 = data1;
    private data2 = data2;
    private data3 = data3;
    private data4: Select2Data = JSON.parse(JSON.stringify(data3));
    private data5 = data5;
    private data6: Select2Data = JSON.parse(JSON.stringify(data3));
    private data7: Select2Option[] = [];
    private data8 = data8;
    private data9: Select2Data = JSON.parse(JSON.stringify(data1));

    private value1 = "CA";
    private value2 = "CA";
    private value3 = "foo";
    private value4 = "bar";
    private value5 = "foo3";
    private value6 = "";
    private value7 = "";
    private value8 = "CA";
    private value9: string[] = [];

    render() {
        return (
            <div style={{ width: "500px" }}>
                <a href="https://github.com/plantain-00/select2-component/tree/master/demo/react/index.tsx" target="_blank">the source code of the demo</a>
                <h3>options in group ({this.value1})</h3>
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
                <h3>custom component ({this.value8})</h3>
                <Select2 data={this.data8}
                    value={this.value8}
                    update={value => this.update8(value)}>
                </Select2>
                <h3>multiple ({this.value9})</h3>
                <Select2 data={this.data9}
                    value={this.value9}
                    multiple={true}
                    update={value => this.update9(value)}>
                </Select2>
            </div>
        );
    }

    private update1(value: Select2UpdateValue) {
        this.value1 = value as string;
        this.setState({ value1: this.value1 });
    }
    private update2(value: Select2UpdateValue) {
        this.value2 = value as string;
        this.setState({ value2: this.value2 });
    }
    private update3(value: Select2UpdateValue) {
        this.value3 = value as string;
        this.setState({ value3: this.value3 });
    }
    private update5(value: Select2UpdateValue) {
        this.value5 = value as string;
        this.setState({ value5: this.value5 });
    }
    private update6(value: Select2UpdateValue) {
        this.value6 = value as string;
        this.setState({ value6: this.value6 });
    }
    private open7() {
        this.data7 = JSON.parse(JSON.stringify(data2));
        this.setState({ data7: this.data7 });
    }
    private update7(value: Select2UpdateValue) {
        this.value7 = value as string;
        this.setState({ value7: this.value7 });
    }
    private search7(text: string) {
        this.data7 = text
            ? (JSON.parse(JSON.stringify(data2)) as Select2Option[]).filter(option => option.label.toLowerCase().indexOf(text.toLowerCase()) > -1)
            : JSON.parse(JSON.stringify(data2));
        this.setState({ data7: this.data7 });
    }
    private update8(value: Select2UpdateValue) {
        this.value8 = value as string;
        this.setState({ value8: this.value8 });
    }
    private update9(value: Select2UpdateValue) {
        this.value9 = value as string[];
        this.setState({ value9: this.value9 });
    }
}

ReactDOM.render(<Main />, document.getElementById("container"));
