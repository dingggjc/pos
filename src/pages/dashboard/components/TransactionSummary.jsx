import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import TransactionModal from '@/components/modal/TransactionModal';

const labelMap = {
    selectedCarType: 'Car Type',
    selectedPackage: 'Selected Services',
    selectedAddOns: 'Selected Add Ons',
    subTotal: 'Subtotal',
    selectedDiscount: 'Discount',
    totalAmount: 'Total Amount',
};

const TransactionSummary = ({
    selectedCarType,
    selectedPackage,
    selectedAddOns,
    selectedDiscount,
    subTotal,
    totalAmount = 0,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const summary = {
        selectedCarType: selectedCarType || 'None',
        selectedPackage: selectedPackage ? selectedPackage.label : 'None',
        selectedAddOns:
            selectedAddOns.length > 0
                ? selectedAddOns.map((addOn) => addOn.label).join(', ')
                : 'None',

        subTotal: subTotal !== undefined ? `₱${subTotal.toFixed(2)}` : '₱0.00',
        selectedDiscount: selectedDiscount ? selectedDiscount.label : 'None',
        totalAmount: `₱${totalAmount?.toFixed(2) || '0.00'}`,
    };

    return (
        <div className='space-y-2'>
            <div className='text-base font-bold'>Transaction Summary</div>
            <Table>
                <TableBody>
                    {Object.entries(summary).map(([key, value]) => (
                        <TableRow key={key}>
                            <TableCell className='font-medium w-1/3 whitespace-nowrap'>
                                {labelMap[key]}
                            </TableCell>
                            <TableCell className='text-xs text-gray-500 font-normal w-2/3 break-words'>
                                {value}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className='flex justify-end'>
                <Button onClick={() => setIsModalOpen(true)}>
                    Proceed to Payment
                </Button>
            </div>

            <TransactionModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                summaryData={summary}
            />
        </div>
    );
};

export default TransactionSummary;
