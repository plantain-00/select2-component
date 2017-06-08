import * as React from "react";
import * as ReactDOM from "react-dom";
import * as common from "./common";

export class Select2 extends React.PureComponent<{
    data: common.Select2Data;
    value?: string;
    disabled?: boolean;
    minCountForSearch?: number;
    placeholder?: string;
    customSearchEnabled?: boolean;
    update?: (value: string) => void;
    open?: () => void;
    search?: (text: string) => void;
}, {}> {
    hoveringValue: string | null | undefined = null;
    option: common.Select2Option | null = null;
    isOpen = false;
    focusoutTimer?: NodeJS.Timer;
    innerSearchText = "";
    lastScrollTopIndex = 0;
    isSearchboxHidden: boolean;
    searchStyle: string;

    searchInputElement: HTMLElement;
    resultsElement: HTMLElement;

    get searchText() {
        return this.innerSearchText;
    }
    set searchText(text: string) {
        if (this.props.customSearchEnabled && this.props.search) {
            this.props.search(text);
        }
        this.innerSearchText = text;
    }

    get dropdownStyle() {
        return common.getDropdownStyle(this.isOpen);
    }

    get filteredData() {
        const result = this.props.customSearchEnabled
            ? this.props.data
            : common.getFilteredData(this.props.data, this.searchText);

        if (common.valueIsNotInFilteredData(result, this.hoveringValue)) {
            this.hoveringValue = common.getFirstAvailableOption(result);
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

    get containerStyle() {
        return common.getContainerStyle(this.props.disabled, this.isOpen);
    }

    componentWillMount() {
        const option = common.getOptionByValue(this.props.data, this.props.value);
        if (option !== null) {
            this.option = option;
            this.setState({ option: this.option });
        }
        this.hoveringValue = this.props.value;
        this.setState({ hoveringValue: this.hoveringValue });
        this.isSearchboxHidden = this.props.customSearchEnabled
            ? false
            : common.isSearchboxHiddex(this.props.data, this.props.minCountForSearch);
        this.searchStyle = common.getSearchStyle(this.isSearchboxHidden);
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
            this.option = option;
            if (this.props.update) {
                this.props.update(option.value);
            }
            this.isOpen = false;
            this.setState({
                option: this.option,
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
            this.innerSearchText = "";
            this.setState({ searchText: this.searchText }, () => {
                if (!this.isSearchboxHidden) {
                    if (this.searchInputElement) {
                        this.searchInputElement.focus();
                    }
                } else {
                    if (this.resultsElement) {
                        this.resultsElement.focus();
                    }
                }

                if (this.resultsElement) {
                    const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.props.data, this.lastScrollTopIndex);
                    if (lastScrollTopIndex !== null) {
                        this.lastScrollTopIndex = lastScrollTopIndex;
                    }
                }
            });
            if (this.props.open) {
                this.props.open();
            }
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
            if (this.props.update) {
                this.props.update(this.hoveringValue);
            }

            const option = common.getOptionByValue(this.props.data, this.hoveringValue);
            if (option !== null) {
                this.option = option;
                this.setState({ option: this.option });
            }

            this.isOpen = false;
            this.setState({ isOpen: this.isOpen });
        }
    }

    keyDown(e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLUListElement>) {
        if (e.keyCode === 40) {
            this.moveDown();
            e.preventDefault();
        } else if (e.keyCode === 38) {
            this.moveUp();
            e.preventDefault();
        } else if (e.keyCode === 13) {
            this.selectByEnter();
            e.preventDefault();
        }
    }

    onChange = (e: React.FormEvent<{ value: string }>) => {
        this.searchText = e.currentTarget.value;
        this.setState({ searchText: this.searchText });
    }

    isSelected(option: common.Select2Option) {
        return this.option && option.value === this.option.value ? "true" : "false";
    }
    isDisabled(option: common.Select2Option) {
        return option.disabled ? "true" : "false";
    }

    render() {
        const results = this.filteredData.map(groupOrOption => {
            const options = (groupOrOption as common.Select2Group).options;
            if (options) {
                const optionsElements = options.map(option => {
                    const optionElement = option.component
                        ? React.createElement(option.component as React.ComponentClass<{ option: common.Select2Option }>, { option })
                        : option.label;
                    return (
                        <li className={this.getOptionStyle(option.value)}
                            role="treeitem"
                            aria-selected={this.isSelected(option)}
                            aria-disabled={this.isDisabled(option)}
                            onMouseEnter={() => this.mouseenter(option)}
                            onClick={() => this.click(option)}>
                            {optionElement}
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
                const optionElement = option.component
                    ? React.createElement(option.component as React.ComponentClass<{ option: common.Select2Option }>, { option })
                    : option.label;
                return (
                    <li className={this.getOptionStyle(option.value)}
                        role="treeitem"
                        aria-selected={this.isSelected(option)}
                        aria-disabled={this.isDisabled(option)}
                        onMouseEnter={() => this.mouseenter(option)}
                        onClick={() => this.click(option)}>
                        {optionElement}
                    </li>
                );
            }
        });
        const label = this.option
            ? (this.option.component ? React.createElement(this.option.component as React.ComponentClass<{ option: common.Select2Option }>, { option: this.option }) : this.option.label)
            : <span className="select2-selection__placeholder">{this.props.placeholder}</span>;
        return (
            <div className={this.containerStyle}>
                <div className="selection"
                    onClick={() => this.toggleOpenAndClose()}>
                    <div className="select2-selection select2-selection--single" role="combobox">
                        <span className="select2-selection__rendered" title={this.option ? this.option.label : ""}>{label}</span>
                        <span className="select2-selection__arrow" role="presentation">
                            <b role="presentation"></b>
                        </span>
                    </div>
                </div>
                <div className={this.dropdownStyle}>
                    <div className="select2-dropdown select2-dropdown--below">
                        <div className={this.searchStyle}>
                            <input value={this.searchText}
                                onChange={this.onChange}
                                onKeyDown={e => this.keyDown(e)}
                                onBlur={() => this.focusout()}
                                className="select2-search__field"
                                type="search"
                                role="textbox"
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck={false} />
                        </div>
                        <div className="select2-results">
                            <ul className="select2-results__options"
                                role="tree"
                                tabIndex={-1}
                                onKeyDown={e => this.keyDown(e)}
                                onBlur={() => this.focusout()}>
                                {results}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
