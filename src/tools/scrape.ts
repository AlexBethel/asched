import scrapeIt from 'scrape-it';
import fs from 'node:fs/promises';

// These are the types that we need to produce, to make the website
// work correctly.
import type { ClassSection, Meeting } from '../lib/data_types';

type TermsAndSubjects = {
    terms: {
        term: string,
        content: string,
    }[],
    subjects: {
        value: string,
        content: string,
    }[],
};
async function termsAndSubjects(): Promise<TermsAndSubjects> {
    return (await scrapeIt(
        'http://banweb7.nmt.edu/pls/PROD/hwzkcrof.p_uncgslctcrsoff',
        {
            terms: {
                listItem: 'select[name="p_term"] > option',
                data: {
                    term: { attr: 'value' },
                    content: {},
                },
            },
            subjects: {
                listItem: 'select[name="p_subj"] > option',
                data: {
                    value: { attr: 'value' },
                    content: {},
                },
            },
        }
    )).data as TermsAndSubjects;
}

function alignColumns<T>(
    headers: string[],
    data: T[][],
): { [key: string]: T }[] {
    return data.map(elem => {
        const rv: { [key: string]: T } = {};
        for (let i = 0; i < headers.length; i++)
            rv[headers[i]] = elem[i];
        return rv;
    });
}

/**
 * Splits at the last index of `by` in the string.
 */
function split_last(
    str: string,
    by: string,
): [string, string] {
    for (let idx = str.length - by.length; idx >= 0; idx--) {
        if (str.substring(idx, idx + by.length) === by) {
            return [
                str.substring(0, idx),
                str.substring(idx + by.length),
            ];
        }
    }

    throw Error(`split_last("${str}") found no "${by}"`);
}

// A row pulled directly from Banweb.
type RawBanwebEntry = {
    CRN: string,
    Course: string,
    Campus: string,
    Days: string,
    Date: string,
    Time: string,
    Location: string,
    Hrs: string,
    Type: string,
    Title: string,
    Instructor: string,
    Seats: string,
    Limit: string,
    Enroll: string,
    Waitlist: string,
    "Course Fees": string,
    "Bookstore Link": string,
};

/**
 * Converts a `term` from Banweb, such as `202430`, to a tuple (2024,
 * "Fal").
 */
function term_name(term: string): [number, string] {
    const year = parseInt(term.substring(0, 4));
    const day = {
        // don't ask about the order.
        '10': 'Sum',
        '20': 'Fal',
        '30': 'Spr',
    }[term.substring(4, 6)] as string;
    return [year, day];
}

async function getClassSections(
    term: string,
    subject: string
): Promise<ClassSection[]> {
    const url = `http://banweb7.nmt.edu/pls/PROD/hwzkcrof.P_UncgSrchCrsOff?p_term=${term}&p_subj=${subject.replaceAll(' ', '%20')}`;
    console.log(`requesting ${url}`);
    const res2 = (await scrapeIt(
        url,
        {
            columns: {
                listItem: 'table:nth-of-type(1) > tbody > tr:nth-of-type(2) > th > font',
                convert: (x: string) => x.replaceAll('*', '')
            },
            sections: {
                listItem: 'table:nth-of-type(1) > tbody > tr:nth-child(n+3)',
                data: {
                    rows: { listItem: 'td' },
                },
                convert: e => e.rows.map((row: string | {}) => (
                    typeof (row) == 'object' ? '' : row
                )),
            },
        }
    )).data as {
        columns: string[],
        sections: string[][],
    };
    console.log(`request done for ${url}`);
    const sectionData = alignColumns(
        res2.columns,
        res2.sections,
    ).filter(s => s['Type']) as RawBanwebEntry[];

    const sections: ClassSection[] = [];
    for (const row of sectionData) {
        // Translate between the raw column dictionaries and the class
        // section structure we expect.

        // Fix for "MATH 3035- 01" of Summer 2023.
        row.Course = row.Course.replace('- 0', '-0');

        const day_order = 'UMTWRFS';
        const meetings: Meeting[] = [];
        for (const day of row.Days) {
            // Padding
            if (day == ' ') continue;

            // A few classes have days but not times. Ignore them.
            if (!row.Time) continue;

            const day_number = day_order.search(day);
            meetings.push({
                day: day_number,
                start_time: parseInt(row.Time.split('-')[0]),
                end_time: parseInt(row.Time.split('-')[1]),
                location: row.Location,
            });
        }

        if (row.CRN !== '') {
            // We need to split at the *last* space to deal with
            // subjects like "CH E".
            const [subject_name, section_string] = split_last(row.Course, ' ');
            const [course_number, section_number] = section_string.split('-');

            const [year, semester] = term_name(term);

            sections.push({
                crn: parseInt(row.CRN),
                year,
                semester,
                subject: subject_name,
                course_number: course_number,
                section_number: section_number,
                campus: row.Campus,
                start_date: row.Date.split('-')[0],
                end_date: row.Date.split('-')[1],
                credit_hours: parseInt(row.Hrs),
                title: row.Title,
                instructor: row.Instructor || '',
                seats: parseInt(row.Seats),
                limit: parseInt(row.Limit),
                enrolled: parseInt(row.Enroll),
                meetings,
            });
        } else {
            // Physics recitations, and a few odd petroleum
            // engineering classes and math classes.
            const lastClass = sections[sections.length - 1];
            lastClass.meetings.push(...meetings);
        }
    }
    return sections;
}

async function main() {
    const res = await termsAndSubjects();

    const termEnt = res.terms[6];
    const subjEnt = res.subjects[54];
    console.log(subjEnt);

    // const sectionData = await getClassSections(termEnt.term, subjEnt.value);
    // const sectionDatas = res.subjects
    //     .map(subj => getClassSections(termEnt.term, subj.value));
    // const sectionData = (await Promise.all(sectionDatas)).flat();

    // const sectionDatas = res.terms.map(term =>
    //     Promise.all(
    //         res.subjects.map(subj =>
    //             getClassSections(term.term, subj.value)
    //         )
    //     )
    // );

    // Crawl one term at a time, but pull every subject within the
    // term at once.
    const sectionData: ClassSection[] = [];
    for (const term of res.terms) {
        const newSubjects = res.subjects.map(subj =>
            getClassSections(term.term, subj.value)
        );
        
        sectionData.push(...(await Promise.all(newSubjects)).flat());
    }

    console.log('writing');
    await fs.writeFile('out.json', JSON.stringify(sectionData));
    console.log('written');
}

await main();
