import { useEffect, useState } from "react"

export const useIsMobile = (breakpoints = 768) => {
    const [isMobile, setisMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const isMobileScreen = window.innerWidth <= breakpoints;
            setisMobile(isMobileScreen);
        }
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => {
            window.removeEventListener("resize", checkMobile);
        }
    },[breakpoints]);
    return isMobile;
}