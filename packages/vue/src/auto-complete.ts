import { defineComponent, PropType, nextTick } from 'vue'
import * as common from 'select2-component'
export * from 'select2-component'
import { autoCompleteTemplateHtml } from './variables'

/**
 * @public
 */
export const AutoComplete = defineComponent({
  render: autoCompleteTemplateHtml,
  props: {
    data: {
      type: Array as PropType<common.Select2Data>,
      required: true,
    },
    value: Object as PropType<common.Select2UpdateValue>,
  },
  data: () => {
    return {
      option: null as common.Select2Option | common.Select2Option[] | null,
      hoveringValue: null as common.Select2Value | null | undefined,
      isOpen: false,
      focusoutTimer: undefined as NodeJS.Timer | undefined,
      lastScrollTopIndex: 0,
      searchInputElement: undefined as HTMLElement | undefined,
      resultsElement: undefined as HTMLElement | undefined,
    }
  },
  computed: {
    dropdownStyle(): string {
      return common.getDropdownStyle(this.isOpen && this.data.length > 0)
    },
    filteredData(): common.Select2Data {
      const result = this.data

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
      return common.getContainerStyle(false, this.isOpen && this.data.length > 0)
    }
  },
  beforeMount() {
    const option = common.getOptionsByValue(this.data, this.value, false)
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
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        nextTick(() => {
          this.focusSearchboxOrResultsElement()

          if (this.resultsElement) {
            const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.data, this.lastScrollTopIndex)
            if (lastScrollTopIndex !== null) {
              this.lastScrollTopIndex = lastScrollTopIndex
            }
          }
        })
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
        this.option = option
        this.isOpen = false
      }

      this.$emit('select', (this.option as common.Select2Option).value)
      this.$emit('update', (this.option as common.Select2Option).value)
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
    onChange(e: { target: { value: string } }) {
      this.$emit('search', e.target.value)
      this.$emit('update', e.target.value)
    },
    isSelected(option: common.Select2Option) {
      return common.isSelected(this.option, option, false)
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
      if (this.searchInputElement) {
        this.searchInputElement.focus()
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
  }
})
