export type Select2Group = {
    label: string;
    options: Select2Option[];
};

export type Select2Option = {
    value: string;
    label: string;
};

export type Select2Data = (Select2Group | Select2Option)[];

export const timeout = 200;

export const height = 28;

export function getScrollUp(data: Select2Data, value: string) {
    let index = 0;
    for (const groupOrOption of data) {
        if ((groupOrOption as Select2Group).options) {
            index++;
            for (const option of (groupOrOption as Select2Group).options) {
                if (option.value === value) {
                    return index * height;
                } else {
                    index++;
                }
            }
        } else {
            if ((groupOrOption as Select2Option).value === value) {
                return index * height;
            } else {
                index++;
            }
        }
    }
    return 0;
}
