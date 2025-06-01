import TransactionCartTypeSelection from './components/TransactionCartTypeSelection';
import TransactionPackageSelection from './components/TransactionPackageSelection';
import TransactionAddOns from './components/TransactionAddOns';
import TransactionSummary from './components/TransactionSummary';
import { useState } from 'react';
const Transaction = () => {
    const [selectedCarType, setSelectedCarType] = useState('');
    const [selectedPackage, setSelectedPackage] = useState('');
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    return (
        <div className='globalContainer'>
            <div className='p-4 space-y-8'>
                <TransactionCartTypeSelection onSelect={setSelectedCarType} />
                <TransactionPackageSelection
                    onSelectPackage={setSelectedPackage}
                />
                <TransactionAddOns
                    selectedAddOns={selectedAddOns}
                    onSelectAddOns={setSelectedAddOns}
                />
                <TransactionSummary
                    selectedCarType={selectedCarType}
                    selectedPackage={selectedPackage}
                    selectedAddOns={selectedAddOns}
                />
            </div>
        </div>
    );
};
export default Transaction;
