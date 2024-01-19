<script lang="ts">
    const hour_spacing = 50;

    import location_trans from '$lib/translation/locations';

    function translate_location(s: string): string {
        for (const entry in location_trans) {
            s = s.replaceAll(entry, location_trans[entry]);
        }
        return s;
    }

    /**
     * Converts a time into a decimal number of hours; e.g.,
     * time_to_hours(830) = 8.5, since 8:30 is 8.5 hours past midnight.
     */
    function time_to_hours(time: number): number {
        const hours = Math.floor(time / 100);
        const minutes = time % 100;
        return hours + minutes / 60;
    }

    /**
     * Calculates the number of minutes from `start` to `end`; e.g.,
     * time_diff(915, 845) = 30, because there are 30 minutes between
     * 8:45 and 9:15.
     */
    function time_diff_minutes(end: number, start: number): number {
        return (time_to_hours(end) - time_to_hours(start)) * 60;
    }

    import { selections } from '$lib/storage/selections';
    const meetings = $selections.flatMap((s) =>
        s.meetings.map((meeting) => ({
            day: meeting.day,
            start: meeting.start_time,
            length: time_diff_minutes(meeting.end_time, meeting.start_time),
            name: `${s.subject} ${s.course_number}-${s.section_number}`,
            location: translate_location(meeting.location)
        }))
    );

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    let days_and_meetings: {
        name: string;
        meetings: {
            day: number;
            start: number;
            length: number;
            name: string;
            location: string;
        }[];
    }[] = [];
    for (const [index, day_name] of days.entries()) {
        days_and_meetings.push({
            name: day_name,
            meetings: meetings.filter((m) => m.day == index + 1)
        });
    }

    function range(start: number, end: number): number[] {
        return [...Array(end - start).keys()].map((i) => i + start);
    }
</script>

<main class="container" style="--hour-spacing: {hour_spacing}px">
    <h1>My Classes</h1>
    <div class="days">
        {#each days_and_meetings as { name, meetings }}
            <section>
                <h2>{name}</h2>
                {#each meetings as meeting}
                    <div style="height: 0px">
                        <article style="--start: {meeting.start}; --length: {meeting.length}">
                            <strong>
                                {meeting.name}
                            </strong>
                            {meeting.location}
                        </article>
                    </div>
                {/each}
            </section>
        {/each}
    </div>
    <div class="background">
        {#each range(8, 13) as hour_number}
            <div class="hour">
                <small>{hour_number}:00</small>
            </div>
            <div class="half-hour">
                <small>{hour_number}:30</small>
            </div>
        {/each}
        {#each range(1, 6) as hour_number}
            <div class="hour">
                <small>{hour_number}:00</small>
            </div>
            <div class="half-hour">
                <small>{hour_number}:30</small>
            </div>
        {/each}
    </div>
</main>

<style>
    h1 {
        text-align: center;
        margin-top: 20px;
    }

    .hour {
        border-bottom: 1px solid var(--muted-color);
        color: var(--muted-color);
        height: var(--hour-spacing);

        display: flex;
        align-items: end;
    }

    .half-hour {
        border-bottom: 1px solid var(--muted-border-color);
        color: var(--muted-border-color);
        height: var(--hour-spacing);

        display: flex;
        align-items: end;
    }

    .days {
        height: 0px;
        padding-left: 70px;
        display: grid;
        grid-template-columns: repeat(7, calc(100% / 7));
    }
    h2 {
        color: var(--secondary);
        text-decoration: underline;
        font-weight: normal;
        font-size: 25px;
        /* flex-grow: 1; */
        text-align: center;

        height: 0px;
        margin: 0px;
    }

    /* Each of the `section`s is a column of elements, where each
    sub-element  */
    section {
        display: flex;
        flex-direction: column;
    }

    article {
        background-color: var(--code-background-color);
        border: 1px solid var(--ins-color);

        padding: 10px;
        margin-bottom: 0px;
        margin-left: 5px;
        margin-right: 5px;
        margin-top: calc(2 * var(--hour-spacing) * (var(--start-decimal) - 0.5) + 2px);
        /* position: absolute; */

        --start-hours: round(down, calc((var(--start) / 100) - 7), 1);
        --start-minutes: mod(var(--start), 100);
        --start-decimal: calc(var(--start-hours) + var(--start-minutes) / 60);
        height: calc(2 * var(--hour-spacing) * var(--length) / 60 - 4px);
        /* width: 160px; */

        display: flex;
        flex-direction: column;

        font-size: 15px;
    }
    article > strong {
        display: block;
        flex-grow: 1;
    }
</style>
