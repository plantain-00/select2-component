import * as React from "react";
import * as ReactDOM from "react-dom";
import * as common from "./common";
export * from "./common";

/**
 * @public
 */
export class Select2 extends React.PureComponent<{
    data: common.Select2Data;
    value?: common.Select2UpdateValue;
    disabled?: boolean;
    minCountForSearch?: number;
    placeholder?: string;
    customSearchEnabled?: boolean;
    multiple?: boolean;
    update?: (value: common.Select2UpdateValue) => void;
    open?: () => void;
    search?: (text: string) => void;
}, {}> {
    private hoveringValue: common.Select2Value | null | undefined = null;
    private option: common.Select2Option | common.Select2Option[] | null = null;
    private isOpen = false;
    private focusoutTimer?: NodeJS.Timer;
    private innerSearchText = "";
    private lastScrollTopIndex = 0;
    private isSearchboxHidden: boolean;
    private searchStyle: string;

    private searchInputElement: HTMLElement;
    private resultsElement: HTMLElement;

    private get searchText() {
        return this.innerSearchText;
    }
    private set searchText(text: string) {
        if (this.props.customSearchEnabled && this.props.search) {
            this.props.search(text);
        }
        this.innerSearchText = text;
    }

    private get dropdownStyle() {
        return common.getDropdownStyle(this.isOpen);
    }

    private get filteredData() {
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

    private get containerStyle() {
        return common.getContainerStyle(this.props.disabled, this.isOpen);
    }

    private get selectionStyle() {
        return common.getSelectionStyle(this.props.multiple);
    }

    componentWillMount() {
        const option = common.getOptionsByValue(this.props.data, this.props.value, this.props.multiple);
        if (option !== null) {
            this.option = option;
            this.setState({ option: this.option });
        }
        if (!Array.isArray(option)) {
            this.hoveringValue = this.props.value as string | undefined;
        }
        this.setState({ hoveringValue: this.hoveringValue });
        this.isSearchboxHidden = this.props.customSearchEnabled
            ? false
            : common.isSearchboxHiddex(this.props.data, this.props.minCountForSearch);
        this.searchStyle = common.getSearchStyle(this.isSearchboxHidden);
    }

    componentDidMount() {
        this.searchInputElement = ReactDOM.findDOMNode(this as any).childNodes[1].childNodes[0].childNodes[0].childNodes[0] as HTMLElement;
        this.resultsElement = ReactDOM.findDOMNode(this as any).childNodes[1].childNodes[0].childNodes[1].childNodes[0] as HTMLElement;
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
        let selection: JSX.Element | JSX.Element[];
        if (this.props.multiple) {
            const items = (this.option as common.Select2Option[]).map(op => (
                <li className="select2-selection__choice" title={op.label}>
                    <span onClick={e => this.removeSelection(e, op)} className="select2-selection__choice__remove" role="presentation">×</span>
                    {op.label}
                </li >
            ));
            selection = (
                <ul className="select2-selection__rendered">
                    {items}
                </ul>
            );
        } else {
            const option = this.option as common.Select2Option;
            const label = option
                ? (option.component ? React.createElement(option.component as React.ComponentClass<{ option: common.Select2Option }>, { option }) : option.label)
                : <span className="select2-selection__placeholder">{this.props.placeholder}</span>;
            selection = [
                <span className="select2-selection__rendered" title={option ? option.label : ""}>{label}</span>,
                <span className="select2-selection__arrow" role="presentation">
                    <b role="presentation"></b>
                </span>,
            ];
        }
        return (
            <div className={this.containerStyle}>
                <div className="selection"
                    onClick={() => this.toggleOpenAndClose()}>
                    <div className={this.selectionStyle} role="combobox">
                        {selection}
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

    private getOptionStyle(value: common.Select2Value) {
        return common.getOptionStyle(value, this.hoveringValue);
    }
    private mouseenter(option: common.Select2Option) {
        if (!option.disabled) {
            this.hoveringValue = option.value;
            this.setState({ hoveringValue: this.hoveringValue });
        }
    }
    private click(option: common.Select2Option) {
        if (!option.disabled) {
            this.select(option);
        }
        if (this.focusoutTimer) {
            clearTimeout(this.focusoutTimer);
        }
    }
    private toggleOpenAndClose() {
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
    private focusout() {
        this.focusoutTimer = setTimeout(() => {
            this.isOpen = false;
            this.setState({ isOpen: this.isOpen });
            this.focusoutTimer = undefined;
        }, common.timeout);
    }
    private moveUp() {
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
    private moveDown() {
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
    private selectByEnter() {
        if (this.hoveringValue) {
            const option = common.getOptionByValue(this.props.data, this.hoveringValue);
            this.select(option);
        }
    }
    private select(option: common.Select2Option | null) {
        if (option !== null) {
            if (this.props.multiple) {
                const options = this.option as common.Select2Option[];
                let index = -1;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].value === option.value) {
                        index = i;
                        break;
                    }
                }
                if (index === -1) {
                    options.push(option);
                } else {
                    options.splice(index, 1);
                }
                this.setState({
                    option: this.option,
                });
            } else {
                this.option = option;
                this.isOpen = false;
                this.setState({
                    option: this.option,
                    isOpen: this.isOpen,
                });
            }
        }

        if (this.props.update) {
            this.props.update(this.props.multiple ? (this.option as common.Select2Option[]).map(op => op.value) : (this.option as common.Select2Option).value);
        }
    }

    private keyDown(e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLUListElement>) {
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

    private onChange = (e: React.FormEvent<{ value: string }>) => {
        this.searchText = e.currentTarget.value;
        this.setState({ searchText: this.searchText });
    }

    private isSelected(option: common.Select2Option) {
        return common.isSelected(this.option, option, this.props.multiple);
    }
    private isDisabled(option: common.Select2Option) {
        return option.disabled ? "true" : "false";
    }

    private removeSelection(e: React.MouseEvent<HTMLSpanElement>, option: common.Select2Option) {
        common.removeSelection(this.option, option);
        if (this.props.update) {
            this.props.update((this.option as common.Select2Option[]).map(op => op.value));
        }

        e.preventDefault();
        e.stopPropagation();

        if (this.isOpen) {
            this.setState({ option: this.option }, () => {
                if (!this.isSearchboxHidden) {
                    if (this.searchInputElement) {
                        this.searchInputElement.focus();
                    }
                } else {
                    if (this.resultsElement) {
                        this.resultsElement.focus();
                    }
                }
            });
        }

        if (this.focusoutTimer) {
            clearTimeout(this.focusoutTimer);
        }
    }
}
