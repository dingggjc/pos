import { Button } from '@/components/ui/button';

const HeroPage = ({
    heading = 'Streamline your Carwash Operation',
    description = 'Powerful POS System designed to optimize your carwash business',

    buttons = {
        primary: {
            text: 'Get Started',
            url: 'https://www.shadcnblocks.com',
        },
    },

    image = {
        src: 'https://logowik.com/content/uploads/images/car-wash6885.logowik.com.webp',
        alt: 'Hero section demo image showing interface components',
    },
}) => {
    return (
        <section className='py-10'>
            <div className='container'>
                <div className='grid items-center gap-8 lg:grid-cols-2'>
                    <div className='flex flex-col items-center text-center lg:items-start lg:text-left'>
                        <h1 className='my-6 text-4xl font-bold text-pretty lg:text-6xl'>
                            {heading}
                        </h1>
                        <p className='mb-8 max-w-xl text-muted-foreground lg:text-xl'>
                            {description}
                        </p>
                        <div className='flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start'>
                            {buttons.primary && (
                                <Button asChild className='w-full sm:w-auto'>
                                    <a href={buttons.primary.url}>
                                        {buttons.primary.text}
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                    <img
                        src={image.src}
                        alt={image.alt}
                        className='max-h-96 w-full rounded-md object-cover'
                    />
                </div>
            </div>
        </section>
    );
};

export { HeroPage };
