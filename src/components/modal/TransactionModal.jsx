import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

const TransactionModal = ({ open, onOpenChange, summaryData }) => {
    return (
        <div className=''>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Transaction Details</DialogTitle>
                        <DialogDescription>
                            Total: {summaryData?.totalAmount || 'N/A'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className='grid gap-4 mt-4 px-4 sm:px-0'>
                        {summaryData &&
                            Object.entries(summaryData).map(([key, value]) => (
                                <div key={key} className='grid gap-1'>
                                    <Label className='capitalize'>
                                        {key.replace(/([A-Z])/g, ' $1')}
                                    </Label>
                                    <p className='text-gray-700 break-words'>
                                        {value}
                                    </p>
                                </div>
                            ))}
                    </div>

                    <DialogFooter className='mt-6'>
                        <DialogClose asChild>
                            <Button variant='outline'>Cancel</Button>
                        </DialogClose>
                        <Button onClick={() => onOpenChange(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TransactionModal;
