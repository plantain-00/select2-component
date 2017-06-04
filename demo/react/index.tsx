import * as React from "react";
import * as ReactDOM from "react-dom";
import { Select2 } from "../../dist/react";
import { data1, data2, data3, data5 } from "../common";

class Main extends React.Component<{}, {}> {
    data1 = data1;
    data2 = data2;
    data3 = data3;
    data4 = JSON.parse(JSON.stringify(data3));
    data5 = data5;

    value1 = "CA";
    value2 = "CA";
    value3 = "foo";
    value4 = "bar";
    value5 = "foo3";

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
    }

    render() {
        return (
            <div style={{ width: "500px" }}>
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
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("container"));
