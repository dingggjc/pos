import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const packages = [
    {
        label: 'Basic Wash',
        description: 'Exterior Wash, Towel Dry',
        value: 'Basic Wash',
        price: '$10.00',
    },
    {
        label: 'Delux Wash',
        description: 'Exterior Wash, Towel Dry, Interior Vacuum',
        value: 'Delux Wash',
        price: '$20.00',
    },
    {
        label: 'Premium Wash',
        description: 'Full Exterior & Interior Cleaning, Wax, Tire Shine',
        value: 'Premium Wash',
        price: '$30.00',
    },
];

const TransactionPackageSelection = ({ onSelectPackage }) => {
    return (
        <div className='space-y-2'>
            <div className='text-base font-bold'>Select A Package</div>
            <RadioGroup defaultValue='basic' onValueChange={onSelectPackage}>
                {packages.map((pkg) => (
                    <Label
                        key={pkg.value}
                        htmlFor={pkg.value}
                        className='flex items-center justify-between w-full border p-4 rounded-md cursor-pointer'
                    >
                        <div className='flex items-start space-x-2'>
                            <RadioGroupItem value={pkg.value} id={pkg.value} />
                            <div className='flex flex-col space-y-1'>
                                <div className='font-medium'>{pkg.label}</div>
                                <div className='text-xs text-gray-400'>
                                    {pkg.description}
                                </div>
                            </div>
                        </div>
                        <div className='font-semibold text-black text-sm'>
                            {pkg.price}
                        </div>
                    </Label>
                ))}
            </RadioGroup>
        </div>
    );
};

export default TransactionPackageSelection;
