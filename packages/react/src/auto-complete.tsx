import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as common from 'select2-component'
export * from 'select2-component'

/**
 * @public
 */
export class AutoComplete extends React.PureComponent<{
  data: common.Select2Data;
  value: string;
  update?: (value: common.Select2UpdateValue) => void;
  search?: (text: string) => void;
  select?: (text: common.Select2UpdateValue) => void;
  keydown?: (e: React.KeyboardEvent) => void;
  keyup?: (e: React.KeyboardEvent) => void;
  keypress?: (e: React.KeyboardEvent) => void;
}, {}> {
  private hoveringValue?: common.Select2Value | null = null
  private option: common.Select2Option | common.Select2Option[] | null = null
  private isOpen = false
  private focusoutTimer?: NodeJS.Timer
  private lastScrollTopIndex = 0

  private searchInputElement!: HTMLElement
  private resultsElement!: HTMLElement

  private get dropdownStyle() {
    return common.getDropdownStyle(this.isOpen && this.props.data.length > 0)
  }

  private get containerStyle() {
    return common.getContainerStyle(false, this.isOpen && this.props.data.length > 0)
  }

  UNSAFE_componentWillMount() {
    const option = common.getOptionsByValue(this.props.data, this.props.value, false)
    if (option !== null) {
      this.option = option
      this.setState({ option: this.option })
    }
    if (!Array.isArray(option)) {
      this.hoveringValue = this.props.value as string | undefined
    }
    this.setState({ hoveringValue: this.hoveringValue })
  }

  componentDidMount() {
    const theElement = ReactDOM.findDOMNode(this as any) as HTMLElement
    this.searchInputElement = theElement.childNodes[0].childNodes[0].childNodes[0].childNodes[0] as HTMLElement
    this.resultsElement = theElement.childNodes[1].childNodes[0].childNodes[0].childNodes[0] as HTMLElement
  }

  render() {
    const results = this.renderResult()
    return (
      <div className={this.containerStyle}>
        <div className='selection'>
          <div className='select2-search select2-search--dropdown'>
            <input value={this.props.value}
              onChange={this.onChange}
              onKeyDown={e => this.keyDown(e)}
              onKeyUp={e => this.keyUp(e)}
              onKeyPress={e => this.keyPress(e)}
              onBlur={() => this.focusout()}
              onClick={() => this.toggleOpenAndClose()}
              className='select2-search__field'
              type='search'
              role='textbox'
              autoComplete='off'
              autoCorrect='off'
              autoCapitalize='off'
              spellCheck={false} />
          </div>
        </div>
        <div className={this.dropdownStyle}>
          <div className='select2-dropdown'>
            <div className='select2-results'>
              <ul className='select2-results__options'
                role='tree'
                tabIndex={-1}
                onKeyDown={e => this.keyDown(e)}
              >
                {results}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
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
            <li className={this.getOptionStyle(option.value)}
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
          <li className={this.getOptionStyle(option.value)}
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
    const result = this.props.data

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
  private getOptionStyle(value: common.Select2Value) {
    return common.getOptionStyle(value, this.hoveringValue)
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
    this.isOpen = !this.isOpen
    this.setState({ isOpen: this.isOpen })
    if (this.isOpen) {
      this.focusSearchboxOrResultsElement()

      if (this.resultsElement) {
        const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.props.data, this.lastScrollTopIndex)
        if (lastScrollTopIndex !== null) {
          this.lastScrollTopIndex = lastScrollTopIndex
        }
      }
    }
    if (this.focusoutTimer) {
      clearTimeout(this.focusoutTimer)
    }
  }
  private focusout() {
    this.focusoutTimer = setTimeout(() => {
      this.isOpen = false
      this.setState({ isOpen: this.isOpen })
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
      this.option = option
      this.isOpen = false
      this.setState({
        option: this.option,
        isOpen: this.isOpen
      })
    }

    if (this.props.select) {
      this.props.select((this.option as common.Select2Option).value)
    } 
    if (this.props.update) {
      this.props.update((this.option as common.Select2Option).value)
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
    if (this.props.search) {
      this.props.search(e.currentTarget.value)
    }
    if (this.props.update) {
      this.props.update(e.currentTarget.value)
    }
  }

  private isSelected(option: common.Select2Option) {
    return common.isSelected(this.option, option, false)
  }
  private isDisabled(option: common.Select2Option) {
    return option.disabled ? 'true' : 'false'
  }

  private focusSearchboxOrResultsElement() {
    if (this.searchInputElement) {
      this.searchInputElement.focus()
    }
  }
}
