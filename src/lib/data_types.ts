type ClassSection = {
    crn: number;
    year: number;
    semester: string;
    subject: string;
    course_number: string;
    section_number: string;
    campus: string;
    start_date: string;
    end_date: string;
    credit_hours: number;
    title: string;
    instructor: string;
    seats: number;
    limit: number;
    enrolled: number;
    meetings: Meeting[];
};

type Meeting = {
    class_section: number;
    day: number;
    start_time: number;
    end_time: number;
    location: string;
};

export type { ClassSection, Meeting };
