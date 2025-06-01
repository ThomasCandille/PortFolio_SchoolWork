import {Project} from './projects';

export type Student = {
    id: number;
    name: string;
    email: string;
    yearOfStudy: string;
    bio: string;
    projects: Project[];
    createdAt: string;
    updatedAt: string;
}

export type Students = {
    member: Student[];
}