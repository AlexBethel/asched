import type { PageServerLoad } from './$types';

import classtimes from './classes.json.gz/classtimes.json';

const semesters: {
    year: number;
    semester: 'Spr' | 'Sum' | 'Fal';
}[] = [];
for (const classtime of classtimes) {
    if (!semesters.find((v) => v.semester === classtime.semester && v.year === classtime.year))
        semesters.push({
            year: classtime.year,
            semester: classtime.semester as 'Spr' | 'Sum' | 'Fal'
        });
}
semesters.reverse();

export const load: PageServerLoad = ({ params: _ }) => {
    return { semesters };
};
