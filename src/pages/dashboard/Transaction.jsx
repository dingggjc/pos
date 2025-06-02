import { useState, useMemo } from 'react';
import TransactionCartTypeSelection from './components/TransactionCartTypeSelection';
import TransactionPackageSelection from './components/TransactionPackageSelection';
import TransactionAddOns from './components/TransactionAddOns';
import TransactionSummary from './components/TransactionSummary';
import TransactionDiscounts from './components/TransactionDiscounts';

const Transaction = () => {
    const [selectedCarType, setSelectedCarType] = useState('');
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    const [selectedDiscount, setSelectedDiscount] = useState(null);

    const packagePrice = selectedPackage?.packagePrice || 0;
    const addOnsPrice = selectedAddOns.reduce(
        (sum, addOn) => sum + (addOn.addOnPrice || 0),
        0
    );

    const subTotal = packagePrice + addOnsPrice;
    const discountAmount = useMemo(() => {
        if (!selectedDiscount) return 0;

        if (
            typeof selectedDiscount.discountAmount === 'number' &&
            !selectedDiscount.value.includes('flat') &&
            !selectedDiscount.value.includes('midweek') &&
            selectedDiscount.discountAmount > 0
        ) {
            return (subTotal * selectedDiscount.discountAmount) / 100;
        }

        if (
            typeof selectedDiscount.discountAmount === 'number' &&
            (selectedDiscount.value.includes('flat') ||
                selectedDiscount.value.includes('midweek'))
        ) {
            return selectedDiscount.discountAmount;
        }
        return 0;
    }, [selectedDiscount, subTotal]);

    const totalAmount = subTotal - discountAmount;

    return (
        <div className='globalContainer'>
            <div className='p-4 space-y-8 mb-10'>
                <TransactionCartTypeSelection onSelect={setSelectedCarType} />
                <TransactionPackageSelection
                    onSelectPackage={setSelectedPackage}
                />
                <TransactionAddOns
                    selectedAddOns={selectedAddOns}
                    onSelectAddOns={setSelectedAddOns}
                />
                <TransactionDiscounts onSelectDiscount={setSelectedDiscount} />
                <TransactionSummary
                    selectedCarType={selectedCarType}
                    selectedPackage={selectedPackage}
                    selectedAddOns={selectedAddOns}
                    selectedDiscount={selectedDiscount}
                    subTotal={subTotal}
                    discountAmount={discountAmount}
                    totalAmount={totalAmount}
                />
            </div>
        </div>
    );
};

export default Transaction;
