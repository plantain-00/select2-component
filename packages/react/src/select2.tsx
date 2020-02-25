import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as common from 'select2-component'
export * from 'select2-component'

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
  keydown?: (e: React.KeyboardEvent) => void;
  keyup?: (e: React.KeyboardEvent) => void;
  keypress?: (e: React.KeyboardEvent) => void;
  minimumInputLength?: number;
  maximumInputLength?: number;
  keepSearchText?: boolean;
}, {}> {
  private hoveringValue?: common.Select2Value | null = null
  private option: common.Select2Option | common.Select2Option[] | null = null
  private isOpen = false
  private focusoutTimer?: NodeJS.Timer
  private innerSearchText = ''
  private lastScrollTopIndex = 0
  private mounted?: boolean
  private value = this.props.value

  private searchInputElement!: HTMLElement
  private resultsElement!: HTMLElement

  private get searchText() {
    return this.innerSearchText
  }
  private set searchText(text: string) {
    if (this.props.customSearchEnabled && this.props.search) {
      this.props.search(text)
    }
    this.innerSearchText = text
  }

  private get dropdownStyle() {
    return common.getDropdownStyle(this.isOpen)
  }

  private get containerStyle() {
    return common.getContainerStyle(this.props.disabled, this.isOpen)
  }

  private get selectionStyle() {
    return common.getSelectionStyle(this.props.multiple)
  }

  private get isSearchboxHidden() {
    return this.props.customSearchEnabled
      ? false
      : common.isSearchboxHiddex(this.props.data, this.props.minCountForSearch)
  }

  private get searchStyle() {
    return common.getSearchStyle(this.isSearchboxHidden)
  }

  UNSAFE_componentWillReceiveProps(nextProps: { value?: common.Select2UpdateValue; }) {
    if (nextProps.value !== this.value) {
      this.value = nextProps.value
      this.setState({ value: nextProps.value }, () => {
        this.updateOptionAndHoveringValue()
      })
    }
  }

  private updateOptionAndHoveringValue() {
    const option = common.getOptionsByValue(this.props.data, this.value, this.props.multiple)
    if (option !== null) {
      this.option = option
      this.setState({ option: this.option })
    }
    if (!Array.isArray(option)) {
      this.hoveringValue = this.value as string | undefined
    }
    this.setState({ hoveringValue: this.hoveringValue })
  }

  UNSAFE_componentWillMount() {
    this.updateOptionAndHoveringValue()
  }

  componentDidMount() {
    const theElement = ReactDOM.findDOMNode(this as any) as HTMLElement
    this.searchInputElement = theElement.childNodes[1].childNodes[0].childNodes[0].childNodes[0] as HTMLElement
    this.resultsElement = theElement.childNodes[1].childNodes[0].childNodes[1].childNodes[0] as HTMLElement
    this.mounted = true
    this.value = this.props.value
  }

  componentWillUnmount() {
    this.mounted = false
    this.cancelFocusoutTimer()
  }

  render() {
    const results = this.renderResult()
    const selection = this.renderSelection()
    return (
      <div className={this.containerStyle}>
        <div className='selection'
          onClick={() => this.toggleOpenAndClose()}>
          <div className={this.selectionStyle} role='combobox'>
            {selection}
          </div>
        </div>
        <div className={this.dropdownStyle}>
          <div className='select2-dropdown select2-dropdown--below'>
            <div className={this.searchStyle}>
              <input value={this.searchText}
                onChange={this.onChange}
                onKeyDown={e => this.keyDown(e)}
                onKeyUp={e => this.keyUp(e)}
                onKeyPress={e => this.keyPress(e)}
                onBlur={() => this.focusout()}
                className='select2-search__field'
                type='search'
                role='textbox'
                autoComplete='off'
                autoCorrect='off'
                autoCapitalize='off'
                maxLength={this.props.maximumInputLength}
                spellCheck={false} />
            </div>
            <div className='select2-results'>
              <ul className='select2-results__options'
                role='tree'
                tabIndex={-1}
                onKeyDown={e => this.keyDown(e)}
                onFocus={() => this.cancelFocusoutTimer()}
                onBlur={() => this.focusout()}>
                {results}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  private renderSelection() {
    if (this.props.multiple) {
      const items = (this.option as common.Select2Option[]).map((op, i) => (
        <li className='select2-selection__choice' title={op.label} key={i}>
          <span onClick={e => this.removeSelection(e, op)} className='select2-selection__choice__remove' role='presentation'>×</span>
          {op.label}
        </li >
      ))
      return (
        <ul className='select2-selection__rendered'>
          {items}
        </ul>
      )
    } else {
      const option = this.option as common.Select2Option
      const label = option
        ? (option.component ? React.createElement(option.component as React.ComponentClass<{ option: common.Select2Option }>, { option }) : option.label)
        : <span className='select2-selection__placeholder'>{this.props.placeholder}</span>
      return [
        <span key='label' className='select2-selection__rendered' title={option ? option.label : ''}>{label}</span>,
        <span key='arrow' className='select2-selection__arrow' role='presentation'>
          <b role='presentation'></b>
        </span>
      ]
    }
  }

  private renderResult() {
    return this.getFilteredData(false).map((groupOrOption, i) => {
      const options = (groupOrOption as common.Select2Group).options
      if (options) {
        const optionsElements = options.map((option, j) => {
          const optionElement = option.component
            ? React.createElement(option.component as React.ComponentClass<{ option: common.Select2Option }>, { option })
            : option.label
          return (
            <li className={this.getOptionStyle(option)}
              key={j}
              role='treeitem'
              aria-selected={this.isSelected(option)}
              aria-disabled={this.isDisabled(option)}
              onMouseEnter={() => this.mouseenter(option)}
              onClick={() => this.click(option)}>
              {optionElement}
            </li>
          )
        })
        return (
          <li className='select2-results__option' role='group' key={i}>
            <strong className='select2-results__group'>{groupOrOption.label}</strong>
            <ul className='select2-results__options select2-results__options--nested'>
              {optionsElements}
            </ul>
          </li>
        )
      } else {
        const option = groupOrOption as common.Select2Option
        const optionElement = option.component
          ? React.createElement(option.component as React.ComponentClass<{ option: common.Select2Option }>, { option })
          : option.label
        return (
          <li className={this.getOptionStyle(option)}
            key={i}
            role='treeitem'
            aria-selected={this.isSelected(option)}
            aria-disabled={this.isDisabled(option)}
            onMouseEnter={() => this.mouseenter(option)}
            onClick={() => this.click(option)}>
            {optionElement}
          </li>
        )
      }
    })
  }

  private getFilteredData(canSetState: boolean) {
    const result = this.props.customSearchEnabled
      || (this.props.minimumInputLength && this.props.minimumInputLength > this.searchText.length)
      ? this.props.data
      : common.getFilteredData(this.props.data, this.searchText)

    if (common.valueIsNotInFilteredData(result, this.hoveringValue)) {
      this.hoveringValue = common.getFirstAvailableOption(result)
      if (canSetState) {
        this.setState({ hoveringValue: this.hoveringValue })
      }

      if (this.resultsElement) {
        const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, result, this.lastScrollTopIndex)
        if (lastScrollTopIndex !== null) {
          this.lastScrollTopIndex = lastScrollTopIndex
          if (canSetState) {
            this.setState({ lastScrollTopIndex: this.lastScrollTopIndex })
          }
        }
      }
    }
    return result
  }
  private getOptionStyle(option: common.Select2Option) {
    return common.getOptionStyle(option, this.hoveringValue)
  }
  private mouseenter(option: common.Select2Option) {
    if (!option.disabled) {
      this.hoveringValue = option.value
      this.setState({ hoveringValue: this.hoveringValue })
    }
  }
  private click(option: common.Select2Option) {
    if (!option.disabled) {
      this.select(option)
    }
    if (this.focusoutTimer) {
      clearTimeout(this.focusoutTimer)
    }
  }
  private toggleOpenAndClose() {
    if (this.props.disabled) {
      return
    }
    this.isOpen = !this.isOpen
    this.setState({ isOpen: this.isOpen })
    if (this.isOpen) {
      if (!this.props.keepSearchText) {
        this.innerSearchText = ''
      }
      this.setState({ searchText: this.searchText }, () => {
        this.focusSearchboxOrResultsElement()

        if (this.resultsElement) {
          const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.props.data, this.lastScrollTopIndex)
          if (lastScrollTopIndex !== null) {
            this.lastScrollTopIndex = lastScrollTopIndex
          }
        }
      })
      if (this.props.open) {
        this.props.open()
      }
    }
    if (this.focusoutTimer) {
      clearTimeout(this.focusoutTimer)
    }
  }
  private focusout() {
    this.focusoutTimer = setTimeout(() => {
      this.isOpen = false
      if (this.mounted) {
        this.setState({ isOpen: this.isOpen })
      }
      this.focusoutTimer = undefined
    }, common.timeout)
  }
  private moveUp() {
    this.hoveringValue = common.getPreviousOption(this.getFilteredData(true), this.hoveringValue)
    this.setState({ hoveringValue: this.hoveringValue })

    if (this.resultsElement) {
      const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.getFilteredData(true), this.lastScrollTopIndex)
      if (lastScrollTopIndex !== null) {
        this.lastScrollTopIndex = lastScrollTopIndex
        this.setState({ lastScrollTopIndex: this.lastScrollTopIndex })
      }
    }
  }
  private moveDown() {
    this.hoveringValue = common.getNextOption(this.getFilteredData(true), this.hoveringValue)
    this.setState({ hoveringValue: this.hoveringValue })

    if (this.resultsElement) {
      const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.getFilteredData(true), this.lastScrollTopIndex)
      if (lastScrollTopIndex !== null) {
        this.lastScrollTopIndex = lastScrollTopIndex
        this.setState({ lastScrollTopIndex: this.lastScrollTopIndex })
      }
    }
  }
  private selectByEnter() {
    if (this.hoveringValue) {
      const option = common.getOptionByValue(this.props.data, this.hoveringValue)
      this.select(option)
    }
  }
  private select(option: common.Select2Option | null) {
    if (option !== null) {
      if (this.props.multiple) {
        const options = this.option as common.Select2Option[]
        const index = options.findIndex(op => op.value === option.value)
        if (index === -1) {
          options.push(option)
        } else {
          options.splice(index, 1)
        }
        this.setState({
          option: this.option
        })
      } else {
        this.option = option
        this.isOpen = false
        this.setState({
          option: this.option,
          isOpen: this.isOpen
        })
      }
    }

    if (this.props.update) {
      this.props.update(this.props.multiple ? (this.option as common.Select2Option[]).map(op => op.value) : (this.option as common.Select2Option).value)
    }
  }

  private keyDown(e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLUListElement>) {
    if (this.props.keydown) {
      this.props.keydown(e)
    }
    if (e.keyCode === 40) {
      this.moveDown()
      e.preventDefault()
    } else if (e.keyCode === 38) {
      this.moveUp()
      e.preventDefault()
    } else if (e.keyCode === 13) {
      this.selectByEnter()
      e.preventDefault()
    }
  }

  private keyUp(e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLUListElement>) {
    if (this.props.keyup) {
      this.props.keyup(e)
    }
  }

  private keyPress(e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLUListElement>) {
    if (this.props.keypress) {
      this.props.keypress(e)
    }
  }

  private onChange = (e: React.FormEvent<{ value: string }>) => {
    this.searchText = e.currentTarget.value
    this.setState({ searchText: this.searchText })
  }

  private isSelected(option: common.Select2Option) {
    return common.isSelected(this.option, option, this.props.multiple)
  }
  private isDisabled(option: common.Select2Option) {
    return option.disabled ? 'true' : 'false'
  }
  private focusSearchboxOrResultsElement() {
    if (!this.isSearchboxHidden) {
      if (this.searchInputElement) {
        this.searchInputElement.focus()
      }
    } else {
      if (this.resultsElement) {
        this.resultsElement.focus()
      }
    }
  }

  private removeSelection(e: React.MouseEvent<HTMLSpanElement>, option: common.Select2Option) {
    common.removeSelection(this.option, option)
    if (this.props.update) {
      this.props.update((this.option as common.Select2Option[]).map(op => op.value))
    }

    e.preventDefault()
    e.stopPropagation()

    if (this.isOpen) {
      this.setState({ option: this.option }, () => {
        this.focusSearchboxOrResultsElement()
      })
    }

    if (this.focusoutTimer) {
      clearTimeout(this.focusoutTimer)
    }
  }

  private cancelFocusoutTimer() {
    if (this.focusoutTimer) {
      clearTimeout(this.focusoutTimer)
    }
  }
}
