import { useEffect } from 'react';
import MainTitle from '../Elements/Texts/MainTitle';
import LabeledInput from '../Elements/LabeledInput/Index';
import ButtonFile from '../Elements/Button/ButtonFile';

const Home = () => {
    useEffect(() => {
        document.title = "DataMinim - Data Analytic";
    }, []);

    return (
        <>
            <div className="w-full flex justify-center items-center">
                <div className='flex flex-col w-4/5 h-screen items-center justify-center gap-4'>
                    <div className='flex flex-col w-full items-center gap-2'>
                        <MainTitle text="Easy and Fast CSV Data Processing" className="text-center text-3xl font-bold text-primary-0" />
                        <MainTitle text="Dive into data and discover what you can do in a flash!" className="text-center text-base font-normal text-primary-0" />
                    </div>
                    <ButtonFile accept=".csv" name="data" text="Input CSV" />
                </div>
            </div>
        </>
    )
}

export default Home