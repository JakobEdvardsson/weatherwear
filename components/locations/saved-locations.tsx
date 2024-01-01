"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/swr-fetcher";
import { Locations, SavedLocation } from "@/frontend-types/locations";
import { Button } from "@/components/ui/button";

export default function SavedLocations() {
    //const router = useRouter();

    const { data, error, isLoading } = useSWR<Locations>(`api/locations`, fetcher);

    const handleLocationClick = (location: SavedLocation) => {
        const date = new Date();
        // Set it expire in 7 days
        date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

        document.cookie = `latitude=${
            location.latitude
        }; expires=${date.toUTCString()}; path=/; SameSite=Strict; Secure=true`;
        document.cookie = `longitude=${
            location.longitude
        }; expires=${date.toUTCString()}; path=/; SameSite=Strict; Secure=true`;

        //router.push("/"); using vanilla redirect to avoid stale location data
        window.location.href = "/";
    };

    return (
        <>
            <ul>
                {data
                    ? data.favorite_locations.map((value, index, array) => (
                          <Button
                              key={value.latitude + value.longitude}
                              className={
                                  "rounded-3xl border-2 border-gray-500 bg-blue-100 text-lg text-black duration-500 ease-in-out hover:border-green-500 hover:bg-white"
                              }
                              onClick={() => handleLocationClick(value)}
                          >
                              {value.location_name}
                          </Button>
                      ))
                    : null}
            </ul>
        </>
    );
}