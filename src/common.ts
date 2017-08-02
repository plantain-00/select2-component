export type Select2Group = {
    label: string;
    options: Select2Option[];
    classes?: string;
};

export type Select2Option = {
    value: Select2Value;
    label: string;
    disabled?: boolean;
    // tslint:disable-next-line:ban-types
    component?: string | Function;
    classes?: string;
};

export type Select2Value = string | number;

export type Select2UpdateValue = Select2Value | Select2Value[];

export type Select2Data = (Select2Group | Select2Option)[];

export const timeout = 200;

export const height = 28;

export let unicodePatterns: { s: RegExp, l: string }[] = [
    { l: 'a', s: /ⓐ|ａ|ẚ|à|á|â|ầ|ấ|ẫ|ẩ|ã|ā|ă|ằ|ắ|ẵ|ẳ|ȧ|ǡ|ä|ǟ|ả|å|ǻ|ǎ|ȁ|ȃ|ạ|ậ|ặ|ḁ|ą|ⱥ|ɐ/gi },
    { l: 'aa', s: /ꜳ/gi },
    { l: 'ae', s: /æ|ǽ|ǣ/gi },
    { l: 'ao', s: /ꜵ/gi },
    { l: 'au', s: /ꜷ/gi },
    { l: 'av', s: /ꜹꜻ/gi },
    { l: 'ay', s: /ꜽ/gi },
    { l: 'b', s: /ⓑ|ｂ|ḃ|ḅ|ḇ|ƀ|ƃ|ɓ/gi },
    { l: 'c', s: /ⓒ|ｃ|ć|ĉ|ċ|č|ç|ḉ|ƈ|ȼ|ꜿ|ↄ/gi },
    { l: 'd', s: /ⓓ|ｄ|ḋ|ď|ḍ|ḑ|ḓ|ḏ|đ|ƌ|ɖ|ɗ|ꝺ/gi },
    { l: 'dz', s: /ǳ|ǆ/gi },
    { l: 'e', s: /ⓔ|ｅ|è|é|ê|ề|ế|ễ|ể|ẽ|ē|ḕ|ḗ|ĕ|ė|ë|ẻ|ě|ȅ|ȇ|ẹ|ệ|ȩ|ḝ|ę|ḙ|ḛ|ɇ|ɛ|ǝ/gi },
    { l: 'f', s: /ⓕ|ｆ|ḟ|ƒ|ꝼ/gi },
    { l: 'g', s: /ⓖ|ｇ|ǵ|ĝ|ḡ|ğ|ġ|ǧ|ģ|ǥ|ɠ|ꞡ|ᵹ|ꝿ/gi },
    { l: 'h', s: /ⓗ|ｈ|ĥ|ḣ|ḧ|ȟ|ḥ|ḩ|ḫ|ẖ|ħ|ⱨ|ⱶ|ɥ/gi },
    { l: 'hv', s: /ƕ/gi },
    { l: 'i', s: /ⓘ|ｉ|ì|í|î|ĩ|ī|ĭ|İ|ï|ḯ|ỉ|ǐ|ȉ|ȋ|ị|į|ḭ|ɨ|ı/gi },
    { l: 'j', s: /ⓙ|ｊ|ĵ|ǰ|ɉ/gi },
    { l: 'k', s: /ⓚ|ｋ|ḱ|ǩ|ḳ|ķ|ḵ|ƙ|ⱪ|ꝁ|ꝃ|ꝅ|ꞣ/gi },
    { l: 'l', s: /ⓛ|ｌ|ŀ|ĺ|ľ|ḷ|ḹ|ļ|ḽ|ḻ|ſ|ł|ƚ|ɫ|ⱡ|ꝉ|ꞁ|ꝇ|Ꝇ/gi },
    { l: 'lj', s: /ǉ/gi },
    { l: 'm', s: /ⓜ|ｍ|ḿ|ṁ|ṃ|ɱ|ɯ/gi },
    { l: 'n', s: /ⓝ|ｎ|ǹ|ń|ñ|ṅ|ň|ṇ|ņ|ṋ|ṉ|ƞ|ɲ|ŉ|ꞑ|ꞥ/gi },
    { l: 'nj', s: /ǌ/gi },
    { l: 'o', s: /ⓞ|ｏ|ò|ó|ô|ồ|ố|ỗ|ổ|õ|ṍ|ȭ|ṏ|ō|ṑ|ṓ|ŏ|ȯ|ȱ|ö|ȫ|ỏ|ő|ǒ|ȍ|ȏ|ơ|ờ|ớ|ỡ|ở|ợ|ọ|ộ|ǫ|ǭ|ø|ǿ|ɔ|Ɵ|ꝋ|ꝍ|ɵ/gi },
    { l: 'oi', s: /ƣ/gi },
    { l: 'oe', s: /œ/gi },
    { l: 'oo', s: /ꝏ/gi },
    { l: 'ou', s: /ȣ/gi },
    { l: 'p', s: /ⓟ|ｐ|ṕ|ṗ|ƥ|ᵽ|ꝑ|ꝓ|ꝕ/gi },
    { l: 'q', s: /ⓠ|ｑ|ɋ|ꝗ|ꝙ/gi },
    { l: 'r', s: /ⓡ|ｒ|ŕ|ṙ|ř|ȑ|ȓ|ṛ|ṝ|ŗ|ṟ|ɍ|ɽ|ꝛ|ꞧ|ꞃ/gi },
    { l: 's', s: /ⓢ|ｓ|ß|ẞ|ś|ṥ|ŝ|ṡ|š|ṧ|ṣ|ṩ|ș|ş|ȿ|ꞩ|ꞅ|ẛ/gi },
    { l: 't', s: /ⓣ|ｔ|ṫ|ẗ|ť|ṭ|ț|ţ|ṱ|ṯ|ŧ|ƭ|ʈ|ⱦ|ꞇ/gi },
    { l: 'tz', s: /ꜩ/gi },
    { l: 'u', s: /ⓤ|ｕ|ù|ú|û|ũ|ṹ|ū|ṻ|ŭ|ü|ǜ|ǘ|ǖ|ǚ|ủ|ů|ű|ǔ|ȕ|ȗ|ư|ừ|ứ|ữ|ử|ự|ụ|ṳ|ų|ṷ|ṵ|ʉ/gi },
    { l: 'v', s: /ⓥ|ｖ|ṽ|ṿ|ʋ|ꝟ|ʌ/gi },
    { l: 'vy', s: /ꝡ/gi },
    { l: 'w', s: /ⓦ|ｗ|ẁ|ẃ|ŵ|ẇ|ẅ|ẘ|ẉ|ⱳ/gi },
    { l: 'x', s: /ⓧ|ｘ|ẋ|ẍ/gi },
    { l: 'y', s: /ⓨ|ｙ|ỳ|ý|ŷ|ỹ|ȳ|ẏ|ÿ|ỷ|ẙ|ỵ|ƴ|ɏ|ỿ/gi },
    { l: 'z', s: /ⓩ|ｚ|ź|ẑ|ż|ž|ẓ|ẕ|ƶ|ȥ|ɀ|ⱬ|ꝣ/gi }
];

function getScrollUpIndex(data: Select2Data, value: Select2Value) {
    let index = 0;
    for (const groupOrOption of data) {
        const options = (groupOrOption as Select2Group).options;
        if (options) {
            index++;
            for (const option of options) {
                if (option.value === value) {
                    return index;
                } else {
                    index++;
                }
            }
        } else {
            if ((groupOrOption as Select2Option).value === value) {
                return index;
            } else {
                index++;
            }
        }
    }
    return 0;
}

export function getOptionByValue(data: Select2Data, value: Select2Value | null | undefined) {
    for (const groupOrOption of data) {
        const options = (groupOrOption as Select2Group).options;
        if (options) {
            for (const option of options) {
                if (option.value === value) {
                    return option;
                }
            }
        } else {
            if ((groupOrOption as Select2Option).value === value) {
                return groupOrOption as Select2Option;
            }
        }
    }
    return null;
}

export function getOptionsByValue(
    data: Select2Data,
    value: Select2UpdateValue | null | undefined,
    multiple: boolean | null | undefined
) {
    if (multiple) {
        const values: Select2Value[] = Array.isArray(value) ? value : [];
        const result: Select2Option[] = [];
        for (const v of values) {
            const option = getOptionByValue(data, v);
            if (option) {
                result.push(option);
            }
        }
        return result;
    }
    return getOptionByValue(data, value as Select2Value | null | undefined);
}

export function getFirstAvailableOption(data: Select2Data) {
    for (const groupOrOption of data) {
        const options = (groupOrOption as Select2Group).options;
        if (options) {
            for (const option of options) {
                if (!option.disabled) {
                    return option.value;
                }
            }
        } else {
            const option = groupOrOption as Select2Option;
            if (!option.disabled) {
                return option.value;
            }
        }
    }
    return null;
}

function getOptionsCount(data: Select2Data) {
    let count = 0;
    for (const groupOrOption of data) {
        const options = (groupOrOption as Select2Group).options;
        if (options) {
            count += options.length;
        } else {
            count++;
        }
    }
    return count;
}

export function valueIsNotInFilteredData(filteredData: Select2Data, value: Select2Value | null | undefined) {
    if (value === null || value === undefined) {
        return true;
    }
    for (const groupOrOption of filteredData) {
        const options = (groupOrOption as Select2Group).options;
        if (options) {
            for (const option of options) {
                if (option.value === value) {
                    return false;
                }
            }
        } else {
            if ((groupOrOption as Select2Option).value === value) {
                return false;
            }
        }
    }
    return true;
}

export function getPreviousOption(filteredData: Select2Data, hoveringValue: Select2Value | null | undefined) {
    let findIt = hoveringValue === null || hoveringValue === undefined;
    for (let i = filteredData.length - 1; i >= 0; i--) {
        const groupOrOption = filteredData[i];
        const options = (groupOrOption as Select2Group).options;
        if (options) {
            for (let j = options.length - 1; j >= 0; j--) {
                const option = options[j];
                if (findIt) {
                    if (!option.disabled) {
                        return option.value;
                    }
                }
                findIt = option.value === hoveringValue;
            }
        } else {
            const option = groupOrOption as Select2Option;
            if (findIt) {
                if (!option.disabled) {
                    return option.value;
                }
            }
            findIt = option.value === hoveringValue;
        }
    }
    return findIt ? hoveringValue : null;
}
export function getNextOption(filteredData: Select2Data, hoveringValue: Select2Value | null | undefined) {
    let findIt = hoveringValue === null || hoveringValue === undefined;
    for (const groupOrOption of filteredData) {
        const options = (groupOrOption as Select2Group).options;
        if (options) {
            for (const option of options) {
                if (findIt) {
                    if (!option.disabled) {
                        return option.value;
                    }
                } else {
                    findIt = option.value === hoveringValue;
                }
            }
        } else {
            const option = groupOrOption as Select2Option;
            if (findIt) {
                if (!option.disabled) {
                    return option.value;
                }
            } else {
                findIt = option.value === hoveringValue;
            }
        }
    }
    return findIt ? hoveringValue : null;
}

export function getLastScrollTopIndex(
    hoveringValue: Select2Value | null | undefined,
    results: HTMLElement,
    filteredData: Select2Data,
    lastScrollTopIndex: number
) {
    if (hoveringValue === null || hoveringValue === undefined) {
        results.scrollTop = 0;
        return 0;
    } else {
        const scrollTop = getScrollUpIndex(filteredData, hoveringValue);
        if (scrollTop - lastScrollTopIndex > 6) {
            lastScrollTopIndex += scrollTop - lastScrollTopIndex - 6;
            results.scrollTop = lastScrollTopIndex * height;
            return lastScrollTopIndex;
        }
        if (lastScrollTopIndex - scrollTop > 0) {
            lastScrollTopIndex -= lastScrollTopIndex - scrollTop;
            results.scrollTop = lastScrollTopIndex * height;
            return lastScrollTopIndex;
        }
        return null;
    }
}

function containSearchText(label: string, searchText: string | null, editPattern: Function): boolean {
    return searchText
        ? formatSansUnicode(label).match(new RegExp(formatPattern(searchText, editPattern), 'i')) !== null
        : true;
}

export function protectPattern(str: string): string {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

export function formatSansUnicode(str: string): string {
    for (let unicodePattern of unicodePatterns) {
        str = str.replace(unicodePattern.s, unicodePattern.l);
    }
    return str;
}

export function formatPattern(str: string, editPattern: Function): string {
    str = formatSansUnicode(protectPattern(str));

    if (editPattern && typeof editPattern === 'function') {
        str = editPattern(str);
    }
    return str;
}

export function getFilteredData(data: Select2Data, searchText: string | null, editPattern?: Function) {
    if (searchText) {
        const result: Select2Data = [];
        for (const groupOrOption of data) {
            const options = (groupOrOption as Select2Group).options;
            if (options) {
                if (options.some(group => containSearchText(group.label, searchText, editPattern))) {
                    const filteredOptions = options.filter(
                        group => containSearchText(group.label, searchText, editPattern)
                    );
                    result.push({
                        label: groupOrOption.label,
                        options: filteredOptions,
                    });
                }
            } else if (containSearchText(groupOrOption.label, searchText, editPattern)) {
                result.push(groupOrOption);
            }
        }
        return result;
    } else {
        return data;
    }
}

export function getOptionStyle(value: Select2Value, hoveringValue: Select2Value | null | undefined) {
    return value === hoveringValue
        ? 'select2-results__option select2-results__option--highlighted'
        : 'select2-results__option';
}

export function getDropdownStyle(isOpen: boolean) {
    return isOpen
        ? 'select2-container select2-container--default select2-container-dropdown select2-container--open'
        : 'select2-container select2-container--default select2-container-dropdown';
}

export function getContainerStyle(disabled: boolean | undefined, isOpen: boolean) {
    return `select2 select2-container select2-container--default ${disabled ? 'select2-container--disabled' : ''} `
        + `${isOpen ? 'select2-container--open' : ''} select2-container--below select2-container--focus`;
}

export function getSelectionStyle(multiple: boolean | undefined) {
    return `select2-selection select2-selection--${multiple ? 'multiple' : 'single'}`;
}

const defaultMinCountForSearch = 6;

export function isSearchboxHiddex(data: Select2Data, minCountForSearch?: number) {
    if (typeof minCountForSearch !== 'number') {
        minCountForSearch = defaultMinCountForSearch;
    }
    const optionCount = getOptionsCount(data);
    return optionCount < minCountForSearch;
}

export function getSearchStyle(isHidden: boolean) {
    return isHidden
        ? 'select2-search select2-search--dropdown select2-search--hide'
        : 'select2-search select2-search--dropdown';
}

export function isSelected(
    options: Select2Option | Select2Option[] | null,
    option: Select2Option,
    multiple: boolean | null | undefined
) {
    if (multiple) {
        return options && (options as Select2Option[]).some(op => op.value === option.value) ? 'true' : 'false';
    } else {
        return options && option.value === (options as Select2Option).value ? 'true' : 'false';
    }
}

export function removeSelection(options: Select2Option | Select2Option[] | null, option: Select2Option) {
    for (let i = 0; i < (options as Select2Option[]).length; i++) {
        if ((options as Select2Option[])[i].value === option.value) {
            (options as Select2Option[]).splice(i, 1);
            return;
        }
    }
}
