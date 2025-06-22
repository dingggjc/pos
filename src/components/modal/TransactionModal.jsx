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
import { ScrollArea } from '@/components/ui/scroll-area';

const TransactionModal = ({ open, onOpenChange, summaryData }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='sm:max-w-[425px] md:max-w-[600px]'>
                <DialogHeader>
                    <DialogTitle className='text-xl'>
                        Transaction Summary
                    </DialogTitle>
                    <DialogDescription className='text-base'>
                        Review your transaction details
                    </DialogDescription>
                </DialogHeader>

                <div className='space-y-4'>
                    <div className='flex items-center justify-between p-4 rounded-lg bg-muted/50'>
                        <span className='text-sm font-medium'>
                            Total Amount
                        </span>
                        <span className='text-lg font-semibold'>
                            {summaryData?.totalAmount || 'N/A'}
                        </span>
                    </div>

                    <ScrollArea className='h-[300px] rounded-md'>
                        <div className='space-y-3 pr-3'>
                            {summaryData &&
                                Object.entries(summaryData).map(
                                    ([key, value]) => (
                                        <div key={key} className='space-y-2'>
                                            <div className='flex justify-between items-start'>
                                                <Label className='text-sm font-medium capitalize'>
                                                    {key.replace(
                                                        /([A-Z])/g,
                                                        ' $1'
                                                    )}
                                                </Label>
                                                <p className='text-sm text-muted-foreground text-right break-words max-w-[60%]'>
                                                    {value}
                                                </p>
                                            </div>
                                            <Separator />
                                        </div>
                                    )
                                )}
                        </div>
                    </ScrollArea>
                </div>

                <DialogFooter className='gap-2 sm:gap-2'>
                    <DialogClose asChild>
                        <Button variant='outline'>Cancel</Button>
                    </DialogClose>
                    <Button type='submit'>Proceed</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default TransactionModal;
