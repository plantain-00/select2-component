import * as React from "react";
import * as ReactDOM from "react-dom";
import * as common from "./common";

export class Select2 extends React.PureComponent<{
    data: common.Select2Data;
    value: string;
    disabled?: boolean;
    update?: (value: string) => void;
}, {}> {
    value: string;

    hoveringValue: string | null = null;
    optionLabel = "";
    isOpen = false;
    focusoutTimer?: NodeJS.Timer;
    searchText = "";
    lastScrollTopIndex = 0;
    containerStyle: string;

    searchInputElement: HTMLElement;
    resultsElement: HTMLElement;

    get dropdownStyle() {
        return common.getDropdownStyle(this.isOpen);
    }

    get filteredData() {
        const result = common.getFilteredData(this.props.data, this.searchText);

        if (common.valueIsNotInFilteredData(result, this.hoveringValue)) {
            this.hoveringValue = common.getFirstOption(result);
            this.setState({ hoveringValue: this.hoveringValue });

            if (this.resultsElement) {
                const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, result, this.lastScrollTopIndex);
                if (lastScrollTopIndex !== null) {
                    this.lastScrollTopIndex = lastScrollTopIndex;
                    this.setState({ lastScrollTopIndex: this.lastScrollTopIndex });
                }
            }
        }
        return result;
    }

    componentWillMount() {
        const label = common.getLabelByValue(this.props.data, this.props.value);
        if (label !== null) {
            this.optionLabel = label;
            this.setState({ optionLabel: this.optionLabel });
        }
        this.hoveringValue = this.props.value;
        this.value = this.props.value;
        this.setState({ hoveringValue: this.hoveringValue, value: this.value });
        this.containerStyle = common.getContainerStyle(this.props.disabled);
    }

    componentDidMount() {
        this.searchInputElement = ReactDOM.findDOMNode(this).childNodes[1].childNodes[0].childNodes[0].childNodes[0] as HTMLElement;
        this.resultsElement = ReactDOM.findDOMNode(this).childNodes[1].childNodes[0].childNodes[1].childNodes[0] as HTMLElement;
    }

    getOptionStyle(value: string) {
        return common.getOptionStyle(value, this.hoveringValue);
    }
    mouseenter(option: common.Select2Option) {
        if (!option.disabled) {
            this.hoveringValue = option.value;
            this.setState({ hoveringValue: this.hoveringValue });
        }
    }
    click(option: common.Select2Option) {
        if (!option.disabled) {
            this.value = option.value;
            this.optionLabel = option.label;
            if (this.props.update) {
                this.props.update(option.value);
            }
            this.isOpen = false;
            this.setState({
                value: this.value,
                optionLabel: this.optionLabel,
                isOpen: this.isOpen,
            });
        }
        if (this.focusoutTimer) {
            clearTimeout(this.focusoutTimer);
        }
    }
    toggleOpenAndClose() {
        if (this.props.disabled) {
            return;
        }
        this.isOpen = !this.isOpen;
        this.setState({ isOpen: this.isOpen });
        if (this.isOpen) {
            this.searchText = "";
            this.setState({ searchText: this.searchText }, () => {
                if (this.searchInputElement) {
                    this.searchInputElement.focus();
                }

                if (this.resultsElement) {
                    const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.props.data, this.lastScrollTopIndex);
                    if (lastScrollTopIndex !== null) {
                        this.lastScrollTopIndex = lastScrollTopIndex;
                    }
                }
            });
        }
        if (this.focusoutTimer) {
            clearTimeout(this.focusoutTimer);
        }
    }
    focusout() {
        this.focusoutTimer = setTimeout(() => {
            this.isOpen = false;
            this.setState({ isOpen: this.isOpen });
            this.focusoutTimer = undefined;
        }, common.timeout);
    }
    moveUp() {
        this.hoveringValue = common.getPreviousOption(this.filteredData, this.hoveringValue);
        this.setState({ hoveringValue: this.hoveringValue });

        if (this.resultsElement) {
            const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.filteredData, this.lastScrollTopIndex);
            if (lastScrollTopIndex !== null) {
                this.lastScrollTopIndex = lastScrollTopIndex;
                this.setState({ lastScrollTopIndex: this.lastScrollTopIndex });
            }
        }
    }
    moveDown() {
        this.hoveringValue = common.getNextOption(this.filteredData, this.hoveringValue);
        this.setState({ hoveringValue: this.hoveringValue });

        if (this.resultsElement) {
            const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.filteredData, this.lastScrollTopIndex);
            if (lastScrollTopIndex !== null) {
                this.lastScrollTopIndex = lastScrollTopIndex;
                this.setState({ lastScrollTopIndex: this.lastScrollTopIndex });
            }
        }
    }
    selectByEnter() {
        if (this.hoveringValue) {
            this.value = this.hoveringValue;
            this.setState({ value: this.value });
            if (this.props.update) {
                this.props.update(this.hoveringValue);
            }

            const label = common.getLabelByValue(this.props.data, this.value);
            if (label !== null) {
                this.optionLabel = label;
                this.setState({ optionLabel: this.optionLabel });
            }

            this.isOpen = false;
            this.setState({ isOpen: this.isOpen });
        }
    }

    keyUp(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.keyCode === 40) {
            this.moveDown();
        } else if (e.keyCode === 38) {
            this.moveUp();
        } else if (e.keyCode === 13) {
            this.selectByEnter();
        }
    }

    onChange = (e: React.FormEvent<{ value: string }>) => {
        this.searchText = e.currentTarget.value;
        this.setState({ searchText: this.searchText });
    }

    render() {
        const results = this.filteredData.map(groupOrOption => {
            const options = (groupOrOption as common.Select2Group).options;
            if (options) {
                const optionsElements = options.map(option => {
                    return (
                        <li className={this.getOptionStyle(option.value)}
                            role="treeitem"
                            aria-selected={option.value === this.value ? "true" : "false"}
                            aria-disabled={option.disabled ? "true" : "false"}
                            onMouseEnter={() => this.mouseenter(option)}
                            onClick={() => this.click(option)}>
                            {option.label}
                        </li>
                    );
                });
                return (
                    <li className="select2-results__option" role="group">
                        <strong className="select2-results__group">{groupOrOption.label}</strong>
                        <ul className="select2-results__options select2-results__options--nested">
                            {optionsElements}
                        </ul>
                    </li>
                );
            } else {
                const option = groupOrOption as common.Select2Option;
                return (
                    <li className={this.getOptionStyle(option.value)}
                        role="treeitem"
                        aria-selected={option.value === this.value ? "true" : "false"}
                        aria-disabled={option.disabled ? "true" : "false"}
                        onMouseEnter={() => this.mouseenter(option)}
                        onClick={() => this.click(option)}>
                        {groupOrOption.label}
                    </li>
                );
            }
        });
        return (
            <div className={this.containerStyle}>
                <div className="selection"
                    onClick={() => this.toggleOpenAndClose()}>
                    <div className="select2-selection select2-selection--single" role="combobox">
                        <span className="select2-selection__rendered" title={this.optionLabel}>{this.optionLabel}</span>
                        <span className="select2-selection__arrow" role="presentation">
                            <b role="presentation"></b>
                        </span>
                    </div>
                </div>
                <div className={this.dropdownStyle}
                    onBlur={() => this.focusout()}>
                    <div className="select2-dropdown select2-dropdown--below">
                        <div className="select2-search select2-search--dropdown">
                            <input value={this.searchText}
                                onChange={this.onChange}
                                onKeyUp={e => this.keyUp(e)}
                                className="select2-search__field"
                                type="search"
                                role="textbox" />
                        </div>
                        <div className="select2-results">
                            <ul className="select2-results__options" role="tree">
                                {results}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
