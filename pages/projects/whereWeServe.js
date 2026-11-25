import HomeLayout from '../../components/Index/HomeLayout';
import React, { useState, useEffect } from 'react';
import Image from "next/image";

export default function WhereWeServe() {
    const [groups, setGroups] = useState({})
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            const userAgent = window.navigator.userAgent;
            setIsMobile(/iPhone|iPad|iPod|Android/i.test(userAgent));
        };

        checkIsMobile();

        window.addEventListener("resize", checkIsMobile);

        return () => {
            window.removeEventListener("resize", checkIsMobile);
        };
    }, []);

    useEffect(() => {
        fetch(`https://api.joshuaproject.net/v1/countries.json?api_key=5378a7708ebc&ids=ag+%7C+ba+%7C+eg+%7C+iz+%7C+jo+%7C+ku+%7C+le+%7C+ly+%7C+mr+%7C+mo+%7C+mu+%7C+qa+%7C+sa+%7C+su+%7C+sy+%7C+ts+%7C+ae+%7C+ym+&primary_languages=arb`)
            .then(res => res.json())
            .then(groups => {
                setGroups(groups);
            })
    }, []);

    const title1 = 'Where We Serve'
    const title2 = 'Lighthouse Arab World was born in the hearts and minds of a small group of people in North Africa who believed, and continue to believe that it is possible to break down walls of hate towards Christ and Christians. The countries that comprise the Middle East and North Africa are some of the least reached in the world, and for people groups that are categorized as reached, the church is very small and often underground. Through our social media content, streaming mobile applications and over the air television shows, Lighthouse intends to touch each and every person in this region.'
    const title3 = 'Statistics of Note for the Middle East and North Africa: '
    const title4 = 'Total Population: 407,817,000'
    const title5 = 'Of the total, 5.5% are Christian and 1.5% Evangelical'
    const title6 = 'Of the 572 people groups, 389 are unreached'
    const title7 = 'In North Africa, the dominant and historic Arab and Berber people groups are less than 0.1% Christian and even less so Evangelical'

    const dotSpace = "• "

    return (
        <HomeLayout>
            <div className='min-h-screen bg-white bg-cover bg-no-repeat flex items-center justify-center'>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-300 to-transparent"></div>
                    <div className={`${isMobile ? "flex-col" : ""} w-5/6 justify-center flex pt-32 `}>
                        <div className={`${isMobile ? "" : "w-1/2 "} pt-12 z-20 relative`}>
                            <p className={`z-20 text-black text-6xl font-bold pb-8`}>{title1}</p>
                            <p className={`z-20 text-black text-xl pb-2`}>{title2}</p>
                            <p className={`z-20 text-black py-1 flex text-xl`}><span className='pl-2'>{title3}</span></p>
                            <p className={`z-20 text-black py-1 flex text-xl`}>{dotSpace}<span className='pl-2'>{title4}</span></p>
                            <p className={`z-20 text-black py-1 flex text-xl`}>{dotSpace}<span className='pl-2'>{title5}</span></p>
                            <p className={`z-20 text-black py-1 flex text-xl`}>{dotSpace}<span className='pl-2'>{title6}</span></p>
                            <p className={`z-20 text-black py-1 flex text-xl pb-8`}>{dotSpace}<span className='pl-2'>{title7}</span></p>
                        </div>
                    <div>
                        {isMobile ? <></>:<div className="pt-14 pb-12 px-6">
                        <div className="relative">
                            <Image alt="Map of the Middle East and North Africa" src="/images/MENA.png" width="500" height="500" className="z-20" />
                        </div>
                        </div>}
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}
