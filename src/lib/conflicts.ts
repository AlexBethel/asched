// Functions to find conflicting classes.

import type { ClassSection, Meeting } from './data_types.ts';

// Whether two meetings have overlapping time.
function meetings_conflict(l: Meeting, r: Meeting): boolean {
    if (l.day != r.day) return false;

    // Sort the meetings in order from earlier to later.
    if (l.start_time > r.start_time) return meetings_conflict(r, l);

    // l now just has to end before r starts.
    return l.end_time > r.start_time;
}

// Whether a meeting corresponds with a particular class section.
function section_meeting_conflict(l: ClassSection, r: Meeting): boolean {
    return l.meetings.find((ml) => meetings_conflict(ml, r)) != undefined;
}

// Given a list of all class sections and a particular meeting,
// returns a list of every class section that conflicts with the
// meeting, except for `except`; it's assumed that `except` should be
// the class section that `r` came from, since a class section can't
// conflict with itself.
function sections_meeting_conflict(
    l: ClassSection[],
    r: Meeting,
    except: ClassSection
): ClassSection[] {
    return l.filter((ls) => section_meeting_conflict(ls, r)).filter((ls) => ls.crn != except.crn);
}

function sections_conflict(l: ClassSection, r: ClassSection): boolean {
    return l.meetings.find((ml) => r.meetings.find((mr) => meetings_conflict(ml, mr))) != undefined;
}

export {
    meetings_conflict,
    section_meeting_conflict,
    sections_meeting_conflict,
    sections_conflict
};
