import { useEffect, useRef, useState } from "react";
import HomeLayout from '../components/Index/HomeLayout';
import Link from "next/link"
import DonatingSection from "../components/Give/DonatingSection"
import GiftInfo from "../components/Give/GiftInfo"
import Contact from "../components/Contact"

const WIDGET_SRC = "https://s3-us-west-2.amazonaws.com/bloomerang-public-cdn/lighthousearabworld/.widget-js/113664.js";

export default function Give() {
    const [isMobile, setIsMobile] = useState(false);
    const widgetRef = useRef(null);

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

    // Load the Bloomerang widget fresh every time this page mounts
    useEffect(() => {
        const container = widgetRef.current;
        if (!container) return;

        // Bloomerang's script is built to run once per full page load and keeps
        // global state. Clear it so each visit behaves like a new page load.
        const resetBloomerang = () => {
            window.bloomerangLoadStarted = undefined;
            window.Bloomerang = undefined;
            document
                .querySelectorAll('script[src*="Bloomerang-v2.js"]')
                .forEach((s) => s.remove());
        };

        resetBloomerang();

        const script = document.createElement("script");
        script.src = WIDGET_SRC;
        script.type = "text/javascript";
        script.onload = () => console.log("[Give] widget script loaded, jQuery present:", !!window.jQuery);
        script.onerror = () => console.error("[Give] widget script failed to load");
        container.appendChild(script);

        return () => {
            if (script.parentNode) script.parentNode.removeChild(script);
            resetBloomerang();
            container.innerHTML = "";
            const form = document.getElementById("bloomerang-form-113664");
            if (form) form.innerHTML = "";
        };
    }, []);

    const title = "MAKING GOD'S LOVE VISIBLE TO EVERYONE IN THE MIDDLE EAST AND NORTH AFRICA"

    return (
        <HomeLayout>
            
            <div className='h-screen bg-about bg-cover bg-no-repeat '>
                <div className={`${isMobile ? " px-2 text-2xl" : "px-48 text-3xl"} static  pt-36 z-20 text-white `}><h2>{title}</h2></div>
                <div className={`absolute inset-0 ${isMobile ? "" : "bg-gradient-to-b from-transparent to-color"}`}></div>
                <div className="flex-col text-white relative z-20">
                    <div ref={widgetRef} className="flex flex-col justify-center items-center pt-8"></div>
                    { isMobile ? 
                    <div className = "flex flex-col pt-8">
                        {/* <div id='bloomerang-form-113664'></div> */}
                        <div>
                        <GiftInfo />
                        </div>
                        <div className="pb-8">
                        <DonatingSection />
                        </div>
                    </div> : 
                <div className="flex-col">
                    <div className="flex w-full px-12">
                    <div id='bloomerang-form-113664' className='pt-4 absolute left-40 top-0'></div>
                            <div className="w-1/2 pt-4 text-black z-20">
                            <GiftInfo />
                        </div>
                            <div className="w-1/2 pt-28">
                            <DonatingSection />
                        </div>
                    </div>
                    </div>}

                </div>
            </div>
            <div className={`items-center ${isMobile ? "pt-12" : "pt-72 "}`}>
                    <div className={`${isMobile ? "mb-72" : ""} relative bg-rug h-96 bg-no-repeat bg-cover bg-center`}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-color"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-color to-transparent"></div>
                </div>
                <Contact />
            </div>
        </HomeLayout>
    )
}