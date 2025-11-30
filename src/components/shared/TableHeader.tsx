import { TableField } from "@/types/TableField";

export default function TableHeader<T>({ fields }: { fields: TableField<T>[] }) {
    return (
        <thead className='bg-theme-headings/80 text-brand-400 sticky top-0 z-10'>
            <tr>
                {fields.map(({ key, placeholder }) => (
                    <th key={String(key)} className='px-4 py-3'>{placeholder}</th>
                ))}
                <th className='px-4 py-3 text-center'>Actions</th>
            </tr>
        </thead>
    );
}