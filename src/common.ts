export type Select2Group = {
    label: string;
    options: Select2Option[];
};

export type Select2Option = {
    value: Select2Value;
    label: string;
    disabled?: boolean;
    // tslint:disable-next-line:ban-types
    component?: string | Function;
};

export type Select2Value = string | number;

export type Select2UpdateValue = Select2Value | Select2Value[];

export type Select2Data = (Select2Group | Select2Option)[];

export const timeout = 200;

export const height = 28;

export var unicodePatterns = [
    { s: /aa|ꜳ/gi, p: '(aa|ꜳ)' },
    { s: /ae|æ|ǽ|ǣ/gi, p: '(ae|æ|ǽ|ǣ)' },
    { s: /ao|ꜵ/gi, p: '(ao|[ꜵ])' },
    { s: /au|ꜷ/gi, p: '(au|ꜷ)' },
    { s: /av|ꜹꜻ/gi, p: '(av|ꜹ|ꜻ)' },
    { s: /ay|ꜽ/gi, p: '(ay|ꜽ)' },
    { s: /dz|ǳ|ǆ/gi, p: '(dz|ǳ|ǆ)' },
    { s: /hv|ƕ/gi, p: '(hv|ƕ)' },
    { s: /lj|ǉ/gi, p: '(lj|ǉ)' },
    { s: /nj|ǌ/gi, p: '(nj|ǌ)' },
    { s: /oo|ꝏ/gi, p: '(oo|ꝏ)' },
    { s: /oi|ƣ/gi, p: '(oi|ƣ)' },
    { s: /ou|ȣ/gi, p: '(ou|ȣ)' },
    { s: /oe|œ/gi, p: '(oe|œ)' },
    { s: /tz|ꜩ/gi, p: '(tz|ꜩ)' },
    { s: /vy|ꝡ/gi, p: '(vy|ꝡ)' },
    { s: /a|ⓐ|ａ|ẚ|à|á|â|ầ|ấ|ẫ|ẩ|ã|ā|ă|ằ|ắ|ẵ|ẳ|ȧ|ǡ|ä|ǟ|ả|å|ǻ|ǎ|ȁ|ȃ|ạ|ậ|ặ|ḁ|ą|ⱥ|ɐ/gi, p: '[aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ]' },
    { s: /b|ⓑ|ｂ|ḃ|ḅ|ḇ|ƀ|ƃ|ɓ/gi, p: '[bⓑｂḃḅḇƀƃɓ]' },
    { s: /c|ⓒ|ｃ|ć|ĉ|ċ|č|ç|ḉ|ƈ|ȼ|ꜿ|ↄ/gi, p: '[cⓒｃćĉċčçḉƈȼꜿↄ]' },
    { s: /d|ⓓ|ｄ|ḋ|ď|ḍ|ḑ|ḓ|ḏ|đ|ƌ|ɖ|ɗ|ꝺ/gi, p: '[dⓓｄḋďḍḑḓḏđƌɖɗꝺ]' },
    { s: /e|ⓔ|ｅ|è|é|ê|ề|ế|ễ|ể|ẽ|ē|ḕ|ḗ|ĕ|ė|ë|ẻ|ě|ȅ|ȇ|ẹ|ệ|ȩ|ḝ|ę|ḙ|ḛ|ɇ|ɛ|ǝ/gi, p: '[eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ]' },
    { s: /f|ⓕ|ｆ|ḟ|ƒ|ꝼ/gi, p: '[fⓕｆḟƒꝼ]' },
    { s: /g|ⓖ|ｇ|ǵ|ĝ|ḡ|ğ|ġ|ǧ|ģ|ǥ|ɠ|ꞡ|ᵹ|ꝿ/gi, p: '[gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ]' },
    { s: /h|ⓗ|ｈ|ĥ|ḣ|ḧ|ȟ|ḥ|ḩ|ḫ|ẖ|ħ|ⱨ|ⱶ|ɥ/gi, p: '[hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ]' },
    { s: /i|ⓘ|ｉ|ì|í|î|ĩ|ī|ĭ|İ|ï|ḯ|ỉ|ǐ|ȉ|ȋ|ị|į|ḭ|ɨ|ı/gi, p: '[iⓘｉìíîĩīĭİïḯỉǐȉȋịįḭɨı]' },
    { s: /j|ⓙ|ｊ|ĵ|ǰ|ɉ/gi, p: '[jⓙｊĵǰɉ]' },
    { s: /k|ⓚ|ｋ|ḱ|ǩ|ḳ|ķ|ḵ|ƙ|ⱪ|ꝁ|ꝃ|ꝅ|ꞣ/gi, p: '[kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ]' },
    { s: /l|ⓛ|ｌ|ŀ|ĺ|ľ|ḷ|ḹ|ļ|ḽ|ḻ|ſ|ł|ƚ|ɫ|ⱡ|ꝉ|ꞁ|ꝇ|Ꝇ/gi, p: '[lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇꝆ]' },
    { s: /m|ⓜ|ｍ|ḿ|ṁ|ṃ|ɱ|ɯ/gi, p: '[mⓜｍḿṁṃɱɯ]' },
    { s: /n|ⓝ|ｎ|ǹ|ń|ñ|ṅ|ň|ṇ|ņ|ṋ|ṉ|ƞ|ɲ|ŉ|ꞑ|ꞥ/gi, p: '[nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ]' },
    { s: /o|ⓞ|ｏ|ò|ó|ô|ồ|ố|ỗ|ổ|õ|ṍ|ȭ|ṏ|ō|ṑ|ṓ|ŏ|ȯ|ȱ|ö|ȫ|ỏ|ő|ǒ|ȍ|ȏ|ơ|ờ|ớ|ỡ|ở|ợ|ọ|ộ|ǫ|ǭ|ø|ǿ|ɔ|Ɵ|ꝋ|ꝍ|ɵ/gi, p: '[oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔƟꝋꝍɵ]' },
    { s: /p|ⓟ|ｐ|ṕ|ṗ|ƥ|ᵽ|ꝑ|ꝓ|ꝕ/gi, p: '[pⓟｐṕṗƥᵽꝑꝓꝕ]' },
    { s: /q|ⓠ|ｑ|ɋ|ꝗ|ꝙ/gi, p: '[qⓠｑɋꝗꝙ]' },
    { s: /r|ⓡ|ｒ|ŕ|ṙ|ř|ȑ|ȓ|ṛ|ṝ|ŗ|ṟ|ɍ|ɽ|ꝛ|ꞧ|ꞃ/gi, p: '[rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ]' },
    { s: /s|ⓢ|ｓ|ß|ẞ|ś|ṥ|ŝ|ṡ|š|ṧ|ṣ|ṩ|ș|ş|ȿ|ꞩ|ꞅ|ẛ/gi, p: '[sⓢｓßẞśṥŝṡšṧṣṩșşȿꞩꞅẛ]' },
    { s: /t|ⓣ|ｔ|ṫ|ẗ|ť|ṭ|ț|ţ|ṱ|ṯ|ŧ|ƭ|ʈ|ⱦ|ꞇ/gi, p: '[tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ]' },
    { s: /u|ⓤ|ｕ|ù|ú|û|ũ|ṹ|ū|ṻ|ŭ|ü|ǜ|ǘ|ǖ|ǚ|ủ|ů|ű|ǔ|ȕ|ȗ|ư|ừ|ứ|ữ|ử|ự|ụ|ṳ|ų|ṷ|ṵ|ʉ/gi, p: '[uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ]' },
    { s: /v|ⓥ|ｖ|ṽ|ṿ|ʋ|ꝟ|ʌ/gi, p: '[vⓥｖṽṿʋꝟʌ]' },
    { s: /w|ⓦ|ｗ|ẁ|ẃ|ŵ|ẇ|ẅ|ẘ|ẉ|ⱳ/gi, p: '[wⓦｗẁẃŵẇẅẘẉⱳ]' },
    { s: /x|ⓧ|ｘ|ẋ|ẍ/gi, p: '[xⓧｘẋẍ]' },
    { s: /y|ⓨ|ｙ|ỳ|ý|ŷ|ỹ|ȳ|ẏ|ÿ|ỷ|ẙ|ỵ|ƴ|ɏ|ỿ/gi, p: '[yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ]' },
    { s: /z|ⓩ|ｚ|ź|ẑ|ż|ž|ẓ|ẕ|ƶ|ȥ|ɀ|ⱬ|ꝣ/gi, p: '[zⓩｚźẑżžẓẕƶȥɀⱬꝣ]' }
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

export function getOptionsByValue(data: Select2Data, value: Select2UpdateValue | null | undefined, multiple: boolean | null | undefined) {
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

export function getLastScrollTopIndex(hoveringValue: Select2Value | null | undefined, results: HTMLElement, filteredData: Select2Data, lastScrollTopIndex: number) {
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

function containSearchText(label: string, searchText: string | null): boolean {
    return searchText ? label.match(new RegExp(formatToUnicodePattern(searchText), 'i')) !== null : true;
}

export function protectPattern(str: string): string {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

export function formatToUnicodePattern(str: string): string {
    str = protectPattern(str);
    for (let unicodePattern of unicodePatterns) {
        str = str.replace(unicodePattern.s, unicodePattern.p);
    }
    return str;
}

export function getFilteredData(data: Select2Data, searchText: string | null) {
    if (searchText) {
        const result: Select2Data = [];
        for (const groupOrOption of data) {
            const options = (groupOrOption as Select2Group).options;
            if (options) {
                if (options.some(group => containSearchText(group.label, searchText))) {
                    const filteredOptions = options.filter(group => containSearchText(group.label, searchText));
                    result.push({
                        label: groupOrOption.label,
                        options: filteredOptions,
                    });
                }
            } else if (containSearchText(groupOrOption.label, searchText)) {
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
        ? "select2-results__option select2-results__option--highlighted"
        : "select2-results__option";
}

export function getDropdownStyle(isOpen: boolean) {
    return isOpen
        ? "select2-container select2-container--default select2-container-dropdown select2-container--open"
        : "select2-container select2-container--default select2-container-dropdown";
}

export function getContainerStyle(disabled: boolean | undefined, isOpen: boolean) {
    return `select2 select2-container select2-container--default ${disabled ? "select2-container--disabled" : ""} ${isOpen ? "select2-container--open" : ""} select2-container--below select2-container--focus`;
}

export function getSelectionStyle(multiple: boolean | undefined) {
    return `select2-selection select2-selection--${multiple ? "multiple" : "single"}`;
}

const defaultMinCountForSearch = 6;

export function isSearchboxHiddex(data: Select2Data, minCountForSearch?: number) {
    if (typeof minCountForSearch !== "number") {
        minCountForSearch = defaultMinCountForSearch;
    }
    const optionCount = getOptionsCount(data);
    return optionCount < minCountForSearch;
}

export function getSearchStyle(isHidden: boolean) {
    return isHidden
        ? "select2-search select2-search--dropdown select2-search--hide"
        : "select2-search select2-search--dropdown";
}

export function isSelected(options: Select2Option | Select2Option[] | null, option: Select2Option, multiple: boolean | null | undefined) {
    if (multiple) {
        return options && (options as Select2Option[]).some(op => op.value === option.value) ? "true" : "false";
    } else {
        return options && option.value === (options as Select2Option).value ? "true" : "false";
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
