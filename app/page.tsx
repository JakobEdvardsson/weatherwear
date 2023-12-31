import WeatherInfo from "@/components/weather-info/weather-info";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SpotifyPlaylist from "@/components/spotify/spotify-playlist";

export default function Home() {
    const cookieStore = cookies();
    const latitude = cookieStore.get("latitude");
    const longitude = cookieStore.get("longitude");
    //TODO: set latitude and longitude from saved location on frontend instead of passing savedLocation id?
    // const savedLocation = cookieStore.get("saved_location");

    if (!(latitude && longitude)) {
        redirect("/setup");
    }

    const latitudeValue = Number(latitude.value);
    const longitudeValue = Number(longitude.value);

    // TODO fix h-[40vh] with a better solution
    // TODO customize weatherKeyword to use keyword from outfit endpoint.
    return (
        <>
            <div className={"flex h-[40vh] w-full p-2"}>
                <div className={"m-2 w-full rounded-[12px] bg-red-500 dark:bg-slate-700"}>
                    <Suspense fallback={<p className={"mb-5 animate-pulse text-center text-xl"}>Loading weather...</p>}>
                        <WeatherInfo latitude={latitudeValue} longitude={longitudeValue} />
                    </Suspense>
                </div>
            </div>

            <div className={"w-full p-4"}>
                <SpotifyPlaylist weatherKeyword={"sunny"} />
            </div>
        </>
    );
}
