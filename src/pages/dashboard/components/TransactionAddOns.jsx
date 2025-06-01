import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const addOns = [
    {
        label: 'Wax Coating',
        value: 'wax',
    },
    {
        label: 'Tire Shine',
        value: 'tire-shine',
    },
    {
        label: 'Interior Cleaning',
        value: 'interior-cleaning',
    },
];

const TransactionAddOns = ({ selectedAddOns = [], onSelectAddOns }) => {
    const toggleAddOn = (value) => {
        if (selectedAddOns.includes(value)) {
            onSelectAddOns(selectedAddOns.filter((item) => item !== value));
        } else {
            onSelectAddOns([...selectedAddOns, value]);
        }
    };
    return (
        <div className='space-y-2'>
            <div className='text-base font-bold'>Select Add Ons</div>
            <div className='flex flex-col gap-4 '>
                {addOns.map((addOn) => (
                    <div
                        key={addOn.value}
                        className='flex items-center space-x-2'
                    >
                        <Checkbox
                            id={addOn.value}
                            checked={selectedAddOns.includes(addOn.value)}
                            onCheckedChange={() => toggleAddOn(addOn.value)}
                        />
                        <Label htmlFor={addOn.value}>{addOn.label}</Label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionAddOns;
