import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
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
        <div className=' max-w-full overflow-x-hidden  '>
            <div className='space-y-4'>
                <div className='text-base font-bold'>
                    Choose Promo/Discounts
                </div>
                <RadioGroup onValueChange={handleValueChange}>
                    <Carousel className='relative mx-5'>
                        <CarouselContent>
                            {discounts.map((disc) => (
                                <CarouselItem
                                    key={disc.value}
                                    className='basis-auto border ml-6 justify-between h-full p-4 rounded-md cursor-pointer'
                                >
                                    <label
                                        htmlFor={disc.value}
                                        className='flex items-start space-x-3 cursor-pointer w-full'
                                    >
                                        <RadioGroupItem
                                            value={disc.value}
                                            id={disc.value}
                                            className='mt-1'
                                        />
                                        <div className='flex flex-col space-y-1'>
                                            <div className='font-medium'>
                                                {disc.label}
                                            </div>
                                            <div className='text-xs text-gray-400'>
                                                {disc.description}
                                            </div>
                                        </div>
                                    </label>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className='hidden sm:flex z-10 absolute -left-6 top-1/2 -translate-y-1/2' />
                        <CarouselNext className='hidden sm:flex z-10 absolute -right-6 top-1/2 -translate-y-1/2' />
                    </Carousel>
                </RadioGroup>
            </div>
        </div>
    );
};

export default TransactionDiscounts;
