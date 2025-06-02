import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const addOns = [
    {
        label: 'Wax Coating',
        value: 'wax',
        addOnPrice: 100,
    },
    {
        label: 'Tire Shine',
        value: 'tire-shine',
        addOnPrice: 50,
    },
    {
        label: 'Interior Cleaning',
        value: 'interior-cleaning',
        addOnPrice: 150,
    },
    {
        label: 'Engine Detailing',
        value: 'engine-detailing',
        addOnPrice: 200,
    },
    {
        label: 'Undercarriage Wash',
        value: 'undercarriage-wash',
        addOnPrice: 120,
    },
    {
        label: 'Headlight Restoration',
        value: 'headlight-restoration',
        addOnPrice: 180,
    },
    {
        label: 'Leather Conditioning',
        value: 'leather-conditioning',
        addOnPrice: 160,
    },
    {
        label: 'Rain Repellent Treatment',
        value: 'rain-repellent',
        addOnPrice: 90,
    },
    {
        label: 'Pet Hair Removal',
        value: 'pet-hair-removal',
        addOnPrice: 130,
    },
    {
        label: 'Ozone Odor Removal',
        value: 'ozone-odor-removal',
        addOnPrice: 250,
    },
];

const TransactionAddOns = ({ selectedAddOns = [], onSelectAddOns }) => {
    const toggleAddOn = (addOn) => {
        if (selectedAddOns.some((item) => item.value === addOn.value)) {
            onSelectAddOns(
                selectedAddOns.filter((item) => item.value !== addOn.value)
            );
        } else {
            onSelectAddOns([...selectedAddOns, addOn]);
        }
    };

    return (
        <div className='space-y-4'>
            <div className='text-base font-bold'>Select Add-Ons</div>
            <div className='flex flex-col gap-3 max-h-60 overflow-y-auto rounded-md border'>
                {addOns.map((addOn) => (
                    <div
                        key={addOn.value}
                        className='flex items-center justify-between p-4 border-b last:border-b-0 cursor-pointer'
                        onClick={() => toggleAddOn(addOn)}
                    >
                        <div className='flex items-center space-x-3'>
                            <Checkbox
                                id={addOn.value}
                                checked={selectedAddOns.some(
                                    (item) => item.value === addOn.value
                                )}
                                onCheckedChange={() => toggleAddOn(addOn)}
                                onClick={(e) => e.stopPropagation()}
                            />

                            <Label
                                htmlFor={addOn.value}
                                className='font-medium'
                            >
                                {addOn.label}
                            </Label>
                        </div>
                        <div className='font-semibold text-sm'>
                            ₱{addOn.addOnPrice}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionAddOns;
