import * as React from "react";
import * as ReactDOM from "react-dom";
import { Select2 } from "../../dist/react";
import { data1, data2, data3 } from "../common";

class Main extends React.Component<{}, {}> {
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

    render() {
        return (
            <div style={{ width: "500px" }}>
                <Select2 data={this.data1}
                    value={this.value1}
                    update={value => this.update1(value)}>
                </Select2>
                selected value: {this.value1}
                <hr />
                <Select2 data={this.data2}
                    value={this.value2}
                    update={value => this.update2(value)}>
                </Select2>
                selected value: {this.value2}
                <hr />
                <Select2 data={this.data3}
                    value={this.value3}
                    update={value => this.update3(value)}>
                </Select2>
                selected value: {this.value3}
                <hr />
                <Select2 data={this.data4}
                    value={this.value4}
                    disabled={true}>
                </Select2>
                selected value: {this.value4}
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("container"));
