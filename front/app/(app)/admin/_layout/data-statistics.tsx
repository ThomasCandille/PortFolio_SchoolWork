import {apiClient} from "@/lib/api";
import {Card, CardBody, Chip, Divider} from "@/components/hero";
import Link from "next/link";

export default async function DataStatisticsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const projects = await apiClient.getProjects();
    const students = await apiClient.getStudents();
    const technologies = await apiClient.getTechnologies();

    return (
        <div className="container mx-auto px-6 py-16">
            <h1 className="text-3xl font-bold mb-8">Data Statistics</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card>
                    <CardBody>
                        <h2 className="text-xl font-semibold mb-4">Projects</h2>
                        <p className="text-2xl font-bold">{projects.totalItems}</p>
                        <Divider />
                        <Link href="/admin/projects" className="text-primary mt-4">
                            View Projects
                        </Link>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <h2 className="text-xl font-semibold mb-4">Students</h2>
                        <p className="text-2xl font-bold">{students.totalItems}</p>
                        <Divider />
                        <Link href="/admin/students" className="text-primary mt-4">
                            View Students
                        </Link>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <h2 className="text-xl font-semibold mb-4">Technologies</h2>
                        <p className="text-2xl font-bold">{technologies.totalItems}</p>
                        <Divider />
                        <Link href="/admin/technologies" className="text-primary mt-4">
                            View Technologies
                        </Link>
                    </CardBody>
                </Card>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/admin/projects" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition">
                    All Projects
                </Link>
                <Link href="/admin/projects/new" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                    Add Project
                </Link>
                <Link href="/admin/students" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    All Students
                </Link>
                <Link href="/admin/students/new" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                    Add Student
                </Link>
            </div>

            {children}
        </div>
    );
}