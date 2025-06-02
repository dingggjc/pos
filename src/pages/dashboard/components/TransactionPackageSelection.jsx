import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const packages = [
    {
        label: 'Basic Wash',
        description: 'Exterior Wash, Towel Dry',
        value: 'Basic Wash',
        packagePrice: '10.00',
    },
    {
        label: 'Delux Wash',
        description: 'Exterior Wash, Towel Dry, Interior Vacuum',
        value: 'Delux Wash',
        packagePrice: '20.00',
    },
    {
        label: 'Premium Wash',
        description: 'Full Exterior & Interior Cleaning, Wax, Tire Shine',
        value: 'Premium Wash',
        packagePrice: '30.00',
    },
];

const TransactionPackageSelection = ({ onSelectPackage }) => {
    const handleSelect = (selectedValue) => {
        const selectedPkg = packages.find((pkg) => pkg.value === selectedValue);
        if (selectedPkg) {
            onSelectPackage({
                ...selectedPkg,
                packagePrice: parseFloat(selectedPkg.packagePrice),
            });
        }
    };

    return (
        <div className='space-y-2'>
            <div className='text-base font-bold'>Select A Package</div>
            <RadioGroup defaultValue='' onValueChange={handleSelect}>
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
                            ₱{pkg.packagePrice}
                        </div>
                    </Label>
                ))}
            </RadioGroup>
        </div>
    );
};

export default TransactionPackageSelection;
