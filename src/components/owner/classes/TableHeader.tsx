import { GymClass } from "@/types/classes/GymClass";

export default function TableHeader({ fields }: { fields: { key: keyof GymClass; placeholder: string }[] }) {
    return (
        <thead className='bg-surface-section text-brand-400 sticky top-0 z-10'>
            <tr>
                {fields.map(({ key, placeholder }) => (
                    <th key={key} className='px-4 py-3'>{placeholder}</th>
                ))}
                <th className='px-4 py-3 text-center'>Actions</th>
            </tr>
        </thead>
    );
}