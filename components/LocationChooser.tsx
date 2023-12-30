"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LocationChooser() {
    const router = useRouter();

    function getLocation() {
        navigator.geolocation.getCurrentPosition(
            (location) => {
                const date = new Date();
                const value = location.coords;

                // Set it expire in 7 days
                date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

                // Set it
                document.cookie = "latitude=" + value.latitude + "; expires=" + date.toUTCString() + "; path=/";
                document.cookie = "longitude=" + value.longitude + "; expires=" + date.toUTCString() + "; path=/";
                router.replace("/");
            },
            (error) => {},
        );
    }

    const handleCurrLocationClick = () => {
        getLocation();
    };

    //TODO: Implement saved location by fetching from DB
    const handleSavedLocationClick = () => {
        console.log("not implemented yet");
    };

    return (
        <div>
            <Button
                className={
                    "rounded-3xl border-2 border-gray-500 bg-blue-100 text-lg text-black duration-500 ease-in-out hover:border-green-500 hover:bg-white"
                }
                type={"button"}
                onClick={handleCurrLocationClick}
            >
                Use current location
            </Button>
            <Button
                className={
                    "rounded-3xl border-2 border-gray-500 bg-blue-100 text-lg text-black duration-500 ease-in-out hover:border-green-500 hover:bg-white"
                }
                type={"button"}
                onClick={handleSavedLocationClick}
            >
                Use saved location
            </Button>
        </div>
    );
}