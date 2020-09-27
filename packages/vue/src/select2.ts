import { defineComponent, PropType, nextTick } from 'vue'
import * as common from 'select2-component'
export * from 'select2-component'
import { select2TemplateHtml } from './variables'

/**
 * @public
 */
export const Select2 = defineComponent({
  render: select2TemplateHtml,
  props: {
    data: {
      type: Array as PropType<common.Select2Data>,
      required: true,
    },
    value: Object as PropType<common.Select2UpdateValue>,
    disabled: Boolean,
    minCountForSearch: Number,
    placeholder: String,
    customSearchEnabled: Boolean,
    multiple: Boolean,
    minimumInputLength: Number,
    maximumInputLength: Number,
    keepSearchText: Boolean,
  },
  data: () => {
    return {
      option: null as common.Select2Option | common.Select2Option[] | null,
      hoveringValue: null as common.Select2Value | null | undefined,
      isOpen: false,
      focusoutTimer: undefined as NodeJS.Timer | undefined,
      innerSearchText: '',
      lastScrollTopIndex: 0,
      searchInputElement: undefined as HTMLElement | undefined,
      resultsElement: undefined as HTMLElement | undefined,
    }
  },
  computed: {
    searchText: {
      get(): string {
        return this.innerSearchText
      },
      set(text: string) {
        if (this.customSearchEnabled) {
          this.$emit('search', text)
        }
        this.innerSearchText = text
      },
    },
    dropdownStyle(): string {
      return common.getDropdownStyle(this.isOpen)
    },
    filteredData(): common.Select2Data {
      const result = this.customSearchEnabled
        || (this.minimumInputLength && this.minimumInputLength > this.searchText.length)
        ? this.data
        : common.getFilteredData(this.data, this.searchText)

      if (common.valueIsNotInFilteredData(result, this.hoveringValue)) {
        this.hoveringValue = common.getFirstAvailableOption(result)

        if (this.resultsElement) {
          const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, result, this.lastScrollTopIndex)
          if (lastScrollTopIndex !== null) {
            this.lastScrollTopIndex = lastScrollTopIndex
          }
        }
      }
      return result
    },
    containerStyle(): string {
      return common.getContainerStyle(this.disabled, this.isOpen)
    },
    selectionStyle(): string {
      return common.getSelectionStyle(this.multiple)
    },
    isSearchboxHidden(): boolean {
      return this.customSearchEnabled
        ? false
        : common.isSearchboxHiddex(this.data, this.minCountForSearch)
    },
    searchStyle(): string {
      return common.getSearchStyle(this.isSearchboxHidden)
    },
  },
  beforeMount() {
    const option = common.getOptionsByValue(this.data, this.value, this.multiple)
    if (option !== null) {
      this.option = option
    }
    if (!Array.isArray(option)) {
      this.hoveringValue = this.value as string | undefined
    }
  },
  mounted() {
    this.searchInputElement = this.$refs.searchInput as HTMLElement
    this.resultsElement = this.$refs.results as HTMLElement

    this.$watch('value', () => {
      const option = common.getOptionsByValue(this.data, this.value, this.multiple)
      this.option = option
      if (!Array.isArray(option)) {
        this.hoveringValue = this.value as string | undefined
      }
    })
  },
  beforeDestroy() {
    this.cancelFocusoutTimer()
  },
  methods: {
    getOptionStyle(option: common.Select2Option) {
      return common.getOptionStyle(option, this.hoveringValue)
    },
    mouseenter(option: common.Select2Option) {
      if (!option.disabled) {
        this.hoveringValue = option.value
      }
    },
    click(option: common.Select2Option) {
      if (!option.disabled) {
        this.select(option)
      }
      if (this.focusoutTimer) {
        clearTimeout(this.focusoutTimer)
      }
    },
    toggleOpenAndClose() {
      if (this.disabled) {
        return
      }
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        if (!this.keepSearchText) {
          this.innerSearchText = ''
        }
        nextTick(() => {
          this.focusSearchboxOrResultsElement()
  
          if (this.resultsElement) {
            const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.data, this.lastScrollTopIndex)
            if (lastScrollTopIndex !== null) {
              this.lastScrollTopIndex = lastScrollTopIndex
            }
          }
        })
        this.$emit('open')
      }
      if (this.focusoutTimer) {
        clearTimeout(this.focusoutTimer)
      }
    },
    focusout() {
      this.focusoutTimer = setTimeout(() => {
        this.isOpen = false
        this.focusoutTimer = undefined
      }, common.timeout)
    },
    select(option: common.Select2Option | null) {
      if (option !== null) {
        if (this.multiple) {
          const options = this.option as common.Select2Option[]
          const index = options.findIndex(op => op.value === option.value)
          if (index === -1) {
            options.push(option)
          } else {
            options.splice(index, 1)
          }
        } else {
          this.option = option
          this.isOpen = false
        }
      }
  
      this.$emit('update', this.multiple ? (this.option as common.Select2Option[]).map(op => op.value) : (this.option as common.Select2Option).value)
    },
    keyDown(e: KeyboardEvent) {
      this.$emit('keydown', e)
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
    },
    keyUp(e: KeyboardEvent) {
      this.$emit('keyup', e)
    },
    keyPress(e: KeyboardEvent) {
      this.$emit('keypress', e)
    },
    isSelected(option: common.Select2Option) {
      return common.isSelected(this.option, option, this.multiple)
    },
    isDisabled(option: common.Select2Option) {
      return option.disabled ? 'true' : 'false'
    },
    removeSelection(e: MouseEvent, option: common.Select2Option) {
      common.removeSelection(this.option, option)
      this.$emit('update', (this.option as common.Select2Option[]).map(op => op.value))
  
      e.preventDefault()
      e.stopPropagation()
  
      if (this.isOpen) {
        nextTick(() => {
          this.focusSearchboxOrResultsElement()
        })
      }
  
      if (this.focusoutTimer) {
        clearTimeout(this.focusoutTimer)
      }
    },
     focusSearchboxOrResultsElement() {
      if (!this.isSearchboxHidden) {
        if (this.searchInputElement) {
          this.searchInputElement.focus()
        }
      } else {
        if (this.resultsElement) {
          this.resultsElement.focus()
        }
      }
    },
     moveUp() {
      this.hoveringValue = common.getPreviousOption(this.filteredData, this.hoveringValue)
  
      if (this.resultsElement) {
        const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.filteredData, this.lastScrollTopIndex)
        if (lastScrollTopIndex !== null) {
          this.lastScrollTopIndex = lastScrollTopIndex
        }
      }
    },
     moveDown() {
      this.hoveringValue = common.getNextOption(this.filteredData, this.hoveringValue)
  
      if (this.resultsElement) {
        const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.filteredData, this.lastScrollTopIndex)
        if (lastScrollTopIndex !== null) {
          this.lastScrollTopIndex = lastScrollTopIndex
        }
      }
    },
     selectByEnter() {
      if (this.hoveringValue) {
        const option = common.getOptionByValue(this.data, this.hoveringValue)
        this.select(option)
      }
    },
    cancelFocusoutTimer() {
      if (this.focusoutTimer) {
        clearTimeout(this.focusoutTimer)
      }
    },
  }
})
