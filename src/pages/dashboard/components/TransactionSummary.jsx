import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

const labelMap = {
    selectedCarType: 'Car Type',
    selectedPackage: 'Selected Services',
    selectedAddOns: 'Selected Add Ons',
    subTotal: 'Subtotal',
    discount: 'Discount',
    totalAmount: 'Total Amount',
};

const addOns = [
    { label: 'Wax Coating', value: 'wax' },
    { label: 'Tire Shine', value: 'tire-shine' },
    { label: 'Interior Cleaning', value: 'interior-cleaning' },
];

const TransactionSummary = ({
    selectedCarType,
    selectedPackage,
    selectedAddOns,
}) => {
    const summary = {
        selectedCarType: selectedCarType || 'None',
        selectedPackage: selectedPackage || 'None',
        selectedAddOns:
            selectedAddOns.length > 0
                ? selectedAddOns
                      .map(
                          (value) =>
                              addOns.find((a) => a.value === value)?.label ||
                              value
                      )
                      .join(', ')
                : 'None',
        subTotal: '$250.00',
        discount: '$50',
        totalAmount: '$200.00',
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
        </div>
    );
};

export default TransactionSummary;
