export interface Webinar {
    id: string;
    title: string;
    tutor: string;
    startTime: string;
    endTime: string;
}

export interface WebinarWithStudents extends Webinar {
    students: Student[];
}

export interface Student {
    id: string;
    name: string;
    email: string;
    webinarId: string;
} 