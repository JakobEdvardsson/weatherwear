import { Suspense } from "react";
import ReadonlySavedLocations from "@/components/locations/readonly-saved-locations";
import { auth } from "@/auth-config";
import { redirect } from "next/navigation";
import NewLocationPicker from "@/components/locations/new-location-picker";
import MusicGenreSelector from "@/components/music-genre-selector";

export async function generateMetadata() {
    const session = await auth();
    return session ? { title: `${session.user.name}'s profile | WeatherWear` } : {};
}

export default async function Page() {
    const session = await auth();
    if (!session) {
        redirect("/setup");
    }

    return (
        <div
            className={
                "m-auto my-9 flex w-5/6 flex-col justify-center rounded-md bg-blue-100 drop-shadow-md dark:bg-slate-800 dark:shadow-blue-900"
            }
        >
            <div>
                <Suspense fallback={<p className={"animate-pulse text-center text-2xl"}>Loading profile...</p>}>
                    <h1 className={"my-5 text-center text-2xl dark:text-slate-400"}>
                        {session.user.name}&apos;s profile
                    </h1>
                </Suspense>
            </div>

            <div className={"my-5 flex justify-center"}>
                <MusicGenreSelector />
            </div>

            <div>{/* TODO: Create new component that allows editing/deletion of location */}</div>

            <h2 className={"mt-5 text-center text-xl dark:text-slate-400"}>Saved locations</h2>

            <div className={"mb-8 mt-3 flex justify-center"}>
                <NewLocationPicker />
            </div>

            <div className={"mb-8 mt-3 flex justify-center"}>
                <ReadonlySavedLocations />
            </div>
        </div>
    );
}
