import type { PageLoad } from './$types';
import type { ClassSection } from '$lib/data_types.ts';
import { gunzipSync, strFromU8 } from 'fflate';

export const load: PageLoad = async function(event) {
    const classtimes: ClassSection[] = JSON.parse(
        strFromU8(
            gunzipSync(new Uint8Array(await (await event.fetch('/classes.json.gz')).arrayBuffer()))
        )
    );

    const semester: string = event.params.semester.substring(0, 3);
    const year = +event.params.year;
    return { classtimes, semester, year };
}
