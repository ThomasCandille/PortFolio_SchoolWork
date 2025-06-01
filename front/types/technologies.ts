export type Technology = {
    id: number;
    name: string;
    category: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
};

export type Technologies = {
    member: Technology[];
};