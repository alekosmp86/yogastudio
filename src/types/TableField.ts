export interface TableField<T> {
    key: keyof T;
    placeholder: string;
    required?: boolean;
    style?: string;
    mobileLabel?: string;
}