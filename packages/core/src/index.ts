export interface Select2Group {
  label: string;
  options: Select2Option[];
  classes?: string;
}

export interface Select2Option {
  value: Select2Value;
  label: string;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  component?: string | Function;
  classes?: string;
}

export type Select2Value = string | number | boolean

export type Select2UpdateValue = Select2Value | Select2Value[]

export type Select2Data = (Select2Group | Select2Option)[]

export const timeout = 200

const unicodePatterns: { l: string, s: RegExp }[] = [
  { l: 'a', s: /[ⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ]/gi },
  { l: 'aa', s: /ꜳ/gi },
  { l: 'ae', s: /[æǽǣ]/gi },
  { l: 'ao', s: /ꜵ/gi },
  { l: 'au', s: /ꜷ/gi },
  { l: 'av', s: /[ꜹꜻ]/gi },
  { l: 'ay', s: /ꜽ/gi },
  { l: 'b', s: /[ⓑｂḃḅḇƀƃɓ]/gi },
  { l: 'c', s: /[ⓒｃćĉċčçḉƈȼꜿↄ]/gi },
  { l: 'd', s: /[ⓓｄḋďḍḑḓḏđƌɖɗꝺ]/gi },
  { l: 'dz', s: /[ǳǆ]/gi },
  { l: 'e', s: /[ⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ]/gi },
  { l: 'f', s: /[ⓕｆḟƒꝼ]/gi },
  { l: 'g', s: /[ⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ]/gi },
  { l: 'h', s: /[ⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ]/gi },
  { l: 'hv', s: /ƕ/gi },
  { l: 'i', s: /[ⓘｉìíîĩīĭİïḯỉǐȉȋịįḭɨı]/gi },
  { l: 'j', s: /[ⓙｊĵǰɉ]/gi },
  { l: 'k', s: /[ⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ]/gi },
  { l: 'l', s: /[ⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇꝆ]/gi },
  { l: 'lj', s: /ǉ/gi },
  { l: 'm', s: /[ⓜｍḿṁṃɱɯ]/gi },
  { l: 'n', s: /[ⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ]/gi },
  { l: 'nj', s: /ǌ/gi },
  { l: 'o', s: /[ⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔƟꝋꝍɵ]/gi },
  { l: 'oi', s: /ƣ/gi },
  { l: 'oe', s: /œ/gi },
  { l: 'oo', s: /ꝏ/gi },
  { l: 'ou', s: /ȣ/gi },
  { l: 'p', s: /[ⓟｐṕṗƥᵽꝑꝓꝕ]/gi },
  { l: 'q', s: /[ⓠｑɋꝗꝙ]/gi },
  { l: 'r', s: /[ⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ]/gi },
  { l: 's', s: /[ⓢｓßẞśṥŝṡšṧṣṩșşȿꞩꞅẛ]/gi },
  { l: 't', s: /[ⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ]/gi },
  { l: 'tz', s: /ꜩ/gi },
  { l: 'u', s: /[ⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ]/gi },
  { l: 'v', s: /[ⓥｖṽṿʋꝟʌ]/gi },
  { l: 'vy', s: /ꝡ/gi },
  { l: 'w', s: /[ⓦｗẁẃŵẇẅẘẉⱳ]/gi },
  { l: 'x', s: /[ⓧｘẋẍ]/gi },
  { l: 'y', s: /[ⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ]/gi },
  { l: 'z', s: /[ⓩｚźẑżžẓẕƶȥɀⱬꝣ]/gi }
]

function getScrollUpIndex(data: Select2Data, value: Select2Value) {
  let index = 0
  for (const groupOrOption of data) {
    const options = (groupOrOption as Select2Group).options
    if (options) {
      index++
      const valueIndex = options.findIndex(op => op.value === value)
      if (valueIndex !== -1) {
        return index + valueIndex
      } else {
        index += options.length
      }
    } else {
      if ((groupOrOption as Select2Option).value === value) {
        return index
      } else {
        index++
      }
    }
  }
  return 0
}

export function getOptionByValue(data: Select2Data, value: Select2Value | null | undefined) {
  for (const groupOrOption of data) {
    const options = (groupOrOption as Select2Group).options
    if (options) {
      for (const option of options) {
        if (option.value === value) {
          return option
        }
      }
    } else {
      if ((groupOrOption as Select2Option).value === value) {
        return groupOrOption as Select2Option
      }
    }
  }
  return null
}

export function getOptionsByValue(
  data: Select2Data,
  value: Select2UpdateValue | null | undefined,
  multiple: boolean | null | undefined
) {
  if (multiple) {
    const values: Select2Value[] = Array.isArray(value) ? value : []
    const result: Select2Option[] = []
    for (const v of values) {
      const option = getOptionByValue(data, v)
      if (option) {
        result.push(option)
      }
    }
    return result
  }
  return getOptionByValue(data, value as Select2Value | null | undefined)
}

export function getFirstAvailableOption(data: Select2Data) {
  for (const groupOrOption of data) {
    const options = (groupOrOption as Select2Group).options
    if (options) {
      for (const option of options) {
        if (!option.disabled) {
          return option.value
        }
      }
    } else {
      const option = groupOrOption as Select2Option
      if (!option.disabled) {
        return option.value
      }
    }
  }
  return null
}

function getOptionsCount(data: Select2Data) {
  let count = 0
  for (const groupOrOption of data) {
    const options = (groupOrOption as Select2Group).options
    if (options) {
      count += options.length
    } else {
      count++
    }
  }
  return count
}

export function valueIsNotInFilteredData(filteredData: Select2Data, value: Select2Value | null | undefined) {
  if (isNullOrUndefined(value)) {
    return true
  }
  for (const groupOrOption of filteredData) {
    const options = (groupOrOption as Select2Group).options
    if (options) {
      for (const option of options) {
        if (option.value === value) {
          return false
        }
      }
    } else {
      if ((groupOrOption as Select2Option).value === value) {
        return false
      }
    }
  }
  return true
}

export function getPreviousOption(filteredData: Select2Data, hoveringValue: Select2Value | null | undefined) {
  let findIt = isNullOrUndefined(hoveringValue)
  for (let i = filteredData.length - 1; i >= 0; i--) {
    const groupOrOption = filteredData[i]
    const options = (groupOrOption as Select2Group).options
    if (options) {
      for (let j = options.length - 1; j >= 0; j--) {
        const option = options[j]
        if (findIt && !option.disabled) {
          return option.value
        }
        findIt = option.value === hoveringValue
      }
    } else {
      const option = groupOrOption as Select2Option
      if (findIt && !option.disabled) {
        return option.value
      }
      findIt = option.value === hoveringValue
    }
  }
  return findIt ? hoveringValue : null
}
export function getNextOption(filteredData: Select2Data, hoveringValue: Select2Value | null | undefined) {
  let findIt = isNullOrUndefined(hoveringValue)
  for (const groupOrOption of filteredData) {
    const options = (groupOrOption as Select2Group).options
    if (options) {
      for (const option of options) {
        if (findIt) {
          if (!option.disabled) {
            return option.value
          }
        } else {
          findIt = option.value === hoveringValue
        }
      }
    } else {
      const option = groupOrOption as Select2Option
      if (findIt) {
        if (!option.disabled) {
          return option.value
        }
      } else {
        findIt = option.value === hoveringValue
      }
    }
  }
  return findIt ? hoveringValue : null
}

function isNullOrUndefined<T>(value: T): value is (T extends null | undefined ? T : never) {
  return value === null || value === undefined
}

export function getLastScrollTopIndex(
  hoveringValue: Select2Value | null | undefined,
  results: HTMLElement,
  filteredData: Select2Data,
  lastScrollTopIndex: number
) {
  if (isNullOrUndefined(hoveringValue)) {
    results.scrollTop = 0
    return 0
  } else {
    const scrollTop = getScrollUpIndex(filteredData, hoveringValue)
    if (scrollTop - lastScrollTopIndex > 5) {
      lastScrollTopIndex += scrollTop - lastScrollTopIndex - 5
      const item = results.querySelectorAll('li').item(scrollTop)
      if (item) {
        results.scrollTop = item.offsetTop - results.offsetHeight
      }
      return lastScrollTopIndex
    }
    if (lastScrollTopIndex - scrollTop > 0) {
      lastScrollTopIndex -= lastScrollTopIndex - scrollTop
      const item = results.querySelectorAll('li').item(lastScrollTopIndex - 1)
      if (item) {
        results.scrollTop = item.offsetTop
      }
      return lastScrollTopIndex
    }
    return null
  }
}

function containSearchText(label: string, searchText: string | null, editPattern: ((str: string) => string) | undefined): boolean {
  return searchText
    ? formatSansUnicode(label).match(new RegExp(formatPattern(searchText, editPattern), 'i')) !== null
    : true
}

function protectPattern(str: string): string {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
}

function formatSansUnicode(str: string): string {
  for (const unicodePattern of unicodePatterns) {
    str = str.replace(unicodePattern.s, unicodePattern.l)
  }
  return str
}

function formatPattern(str: string, editPattern: ((str: string) => string) | undefined): string {
  str = formatSansUnicode(protectPattern(str))

  if (editPattern && typeof editPattern === 'function') {
    str = editPattern(str)
  }
  return str
}

export function getFilteredData(data: Select2Data, searchText: string | null, editPattern?: (str: string) => string) {
  if (searchText) {
    const result: Select2Data = []
    for (const groupOrOption of data) {
      const options = (groupOrOption as Select2Group).options
      if (options) {
        if (options.some(group => containSearchText(group.label, searchText, editPattern))) {
          const filteredOptions = options.filter(
            group => containSearchText(group.label, searchText, editPattern)
          )
          result.push({
            label: groupOrOption.label,
            options: filteredOptions
          })
        }
      } else if (containSearchText(groupOrOption.label, searchText, editPattern)) {
        result.push(groupOrOption)
      }
    }
    return result
  } else {
    return data
  }
}

export function getOptionStyle(option: Select2Option, hoveringValue: Select2Value | null | undefined) {
  const extraClasses = option.classes ? ' ' + option.classes : ''
  return option.value === hoveringValue
    ? 'select2-results__option select2-results__option--highlighted' + extraClasses
    : 'select2-results__option' + extraClasses
}

export function getDropdownStyle(isOpen: boolean) {
  return isOpen
    ? 'select2-container select2-container--default select2-container-dropdown select2-container--open'
    : 'select2-container select2-container--default select2-container-dropdown'
}

export function getContainerStyle(disabled: boolean | undefined = undefined, isOpen: boolean) {
  return `select2 select2-container select2-container--default ${disabled ? 'select2-container--disabled' : ''} `
    + `${isOpen ? 'select2-container--open select2-container--focus' : ''} select2-container--below`
}

export function getSelectionStyle(multiple: boolean | undefined = undefined) {
  return `select2-selection select2-selection--${multiple ? 'multiple' : 'single'}`
}

const defaultMinCountForSearch = 6

export function isSearchboxHiddex(data: Select2Data, minCountForSearch?: number) {
  if (typeof minCountForSearch !== 'number') {
    minCountForSearch = defaultMinCountForSearch
  }
  const optionCount = getOptionsCount(data)
  return optionCount < minCountForSearch
}

export function getSearchStyle(isHidden: boolean) {
  return isHidden
    ? 'select2-search select2-search--dropdown select2-search--hide'
    : 'select2-search select2-search--dropdown'
}

export function isSelected(
  options: Select2Option | Select2Option[] | null,
  option: Select2Option,
  multiple: boolean | null | undefined
) {
  if (multiple) {
    return options && (options as Select2Option[]).some(op => op.value === option.value) ? 'true' : 'false'
  } else {
    return options && option.value === (options as Select2Option).value ? 'true' : 'false'
  }
}

export function removeSelection(options: Select2Option | Select2Option[] | null, option: Select2Option) {
  for (let i = 0; i < (options as Select2Option[]).length; i++) {
    if ((options as Select2Option[])[i].value === option.value) {
      (options as Select2Option[]).splice(i, 1)
      return
    }
  }
}
