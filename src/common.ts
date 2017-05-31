export type Select2Group = {
    label: string;
    options: Select2Option[];
};

export type Select2Option = {
    value: string;
    label: string;
};

export type Select2Data = (Select2Group | Select2Option)[];
