import { Skeleton } from '@/components/ui/skeleton';

const RouteLoader = () => {
    return (
        <div className='space-y-4 p-4'>
            <Skeleton className='h-8 w-1/3' />
            <Skeleton className='h-6 w-full' />
            <Skeleton className='h-6 w-5/6' />
            <Skeleton className='h-6 w-2/3' />
            <Skeleton className='h-64 w-full rounded-xl' />
        </div>
    );
};

export default RouteLoader;
