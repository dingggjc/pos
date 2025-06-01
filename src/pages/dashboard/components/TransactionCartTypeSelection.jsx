import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from '@/components/ui/select';

const carTypes = [
    { label: 'Sedan', value: 'Sedan' },
    { label: 'SUV', value: 'SUV' },
    { label: 'Truck', value: 'Truck' },
];

const TransactionCartTypeSelection = ({ onSelect }) => {
    return (
        <div className='space-y-2'>
            <div className='text-2xl font-bold mb-6'>New Transaction</div>

            <div className='text-base font-bold'>Select a Car Type</div>
            <Select onValueChange={onSelect}>
                <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Select Car Type' />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Car Types</SelectLabel>
                        {carTypes.map((car) => (
                            <SelectItem key={car.value} value={car.value}>
                                {car.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default TransactionCartTypeSelection;
