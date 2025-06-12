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
import { Separator } from '@/components/ui/separator';

const TransactionModal = ({ open, onOpenChange, summaryData }) => {
    return (
        <div className='mx-8'>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Transaction Summary</DialogTitle>
                        <DialogDescription>
                            Total: {summaryData?.totalAmount || 'N/A'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className='grid gap-4 mt-4 px-4 sm:px-0  p-4  h-[300px] overflow-auto'>
                        {summaryData &&
                            Object.entries(summaryData).map(([key, value]) => (
                                <div
                                    key={key}
                                    className='grid gap-1  p-4 border  rounded-sm shadow-sm'
                                >
                                    <Label className='capitalize'>
                                        {key.replace(/([A-Z])/g, ' $1')}
                                    </Label>
                                    <Separator />
                                    <p className=' text-gray-500 break-words'>
                                        {value}
                                    </p>
                                </div>
                            ))}
                    </div>

                    <DialogFooter className='mt-6 gap-2'>
                        <DialogClose asChild>
                            <Button variant='outline'>Cancel</Button>
                        </DialogClose>
                        {/* <Button onClick={() => onOpenChange(false)}> */}
                        <Button>Proceed</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TransactionModal;
