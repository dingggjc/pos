import { Footer } from '@/components/layout/footer';
import { HeroPage } from './components/HeroPage';
import { Navbar } from '@/components/layout/navbar';

const LandingPage = () => {
    return (
        <div className='bg-white px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20'>
            <Navbar />
            <HeroPage />
            <Footer />
        </div>
    );
};

export default LandingPage;
