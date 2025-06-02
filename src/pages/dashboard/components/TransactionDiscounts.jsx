import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const discounts = [
    {
        label: '10% Off Any Service',
        value: '10',
        description: 'Enjoy 10% off on your total car wash service.',
        discountAmount: 10,
    },
    {
        label: '15% Off Premium Package',
        value: '15-premium',
        description: 'Save 15% when you choose our Premium Package.',
        discountAmount: 15,
    },
    {
        label: '₱100 Off Full Detailing',
        value: 'flat-100-detailing',
        description: 'Get ₱100 off any full detailing service.',
        discountAmount: 100,
    },

    {
        label: '20% Off for Returning Customers',
        value: 'returning-20',
        description: 'Loyal customers get 20% off on their next visit.',
        discountAmount: 20,
    },
    {
        label: 'Rainy Day Discount - 25% Off',
        value: 'rainy-25',
        description: 'Come in during rainy days and get 25% off your wash.',
        discountAmount: 25,
    },
    {
        label: 'Midweek Deal - ₱50 Off',
        value: 'midweek-50',
        description: 'Enjoy ₱50 off every Tuesday and Wednesday.',
        discountAmount: 50,
    },
    {
        label: 'Senior Citizen Discount - 20%',
        value: 'senior-20',
        description:
            'Senior citizens get 20% off all services (with valid ID).',
        discountAmount: 20,
    },
];

const TransactionDiscounts = ({ onSelectDiscount }) => {
    const handleValueChange = (selectedValue) => {
        const selectedDisc = discounts.find(
            (disc) => disc.value === selectedValue
        );
        onSelectDiscount(selectedDisc || null);
    };

    return (
        <div className='space-y-4'>
            <div className='text-base font-bold'>Choose Promo/Discounts</div>
            <RadioGroup
                className='flex flex-row space-x-4 overflow-x-auto pb-2 w-full max-w-screen-lg mx-auto'
                onValueChange={handleValueChange}
            >
                {discounts.map((disc) => (
                    <Label
                        key={disc.value}
                        htmlFor={disc.value}
                        className='flex items-start space-x-3 border p-4 rounded-md cursor-pointer min-w-[250px] max-w-[300px] flex-1'
                    >
                        <RadioGroupItem
                            value={disc.value}
                            id={disc.value}
                            className='mt-1'
                        />
                        <div className='flex flex-col space-y-1'>
                            <div className='font-medium'>{disc.label}</div>
                            <div className='text-xs text-gray-400'>
                                {disc.description}
                            </div>
                        </div>
                    </Label>
                ))}
            </RadioGroup>
        </div>
    );
};

export default TransactionDiscounts;
