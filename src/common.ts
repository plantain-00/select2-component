export type Select2Group = {
    label: string;
    options: Select2Option[];
};

export type Select2Option = {
    value: string;
    label: string;
    disabled?: boolean;
};

export type Select2Data = (Select2Group | Select2Option)[];

export const timeout = 200;

export const height = 28;

function getScrollUpIndex(data: Select2Data, value: string) {
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

export function getLabelByValue(data: Select2Data, value: string) {
    for (const groupOrOption of data) {
        const options = (groupOrOption as Select2Group).options;
        if (options) {
            for (const option of options) {
                if (option.value === value) {
                    return option.label;
                }
            }
        } else {
            if ((groupOrOption as Select2Option).value === value) {
                return groupOrOption.label;
            }
        }
    }
    return null;
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

export function valueIsNotInFilteredData(filteredData: Select2Data, value: string | null) {
    if (value === null) {
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

export function getPreviousOption(filteredData: Select2Data, hoveringValue: string | null) {
    let findIt = hoveringValue === null;
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
export function getNextOption(filteredData: Select2Data, hoveringValue: string | null) {
    let findIt = hoveringValue === null;
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

export function getLastScrollTopIndex(hoveringValue: string | null, results: HTMLElement, filteredData: Select2Data, lastScrollTopIndex: number) {
    if (hoveringValue === null) {
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

function containSearchText(label: string, searchText: string | null) {
    return searchText ? label.toLowerCase().indexOf(searchText.toLowerCase()) > -1 : true;
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

export function getOptionStyle(value: string, hoveringValue: string | null) {
    return value === hoveringValue
        ? "select2-results__option select2-results__option--highlighted"
        : "select2-results__option";
}

export function getDropdownStyle(isOpen: boolean) {
    return isOpen
        ? "select2-container select2-container--default select2-container-dropdown select2-container--open"
        : "select2-container select2-container--default select2-container-dropdown";
}

export function getContainerStyle(disabled?: boolean | undefined) {
    return disabled
        ? "select2 select2-container select2-container--default select2-container--disabled select2-container--below select2-container--focus"
        : "select2 select2-container select2-container--default select2-container--below select2-container--focus";
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
