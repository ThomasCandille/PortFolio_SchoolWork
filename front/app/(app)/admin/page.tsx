import { Card, CardBody, CardHeader, Button } from "@/components/hero";
import Link from "next/link";
import { apiClient } from "@/lib/api";
import { FiUsers, FiFolderPlus, FiSettings, FiPlus } from "react-icons/fi";

export default async function AdminDashboard() {
  let studentsCount = 0;
  let projectsCount = 0;
  let technologiesCount = 0;

  try {
    const [students, projects, technologies] = await Promise.all([
      apiClient.getStudents(),
      apiClient.getProjects(),
      apiClient.getTechnologies(),
    ]);

    studentsCount = students.member.length;
    projectsCount = projects.member.length;
    technologiesCount = technologies.member.length;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
  }

  const stats = [
    {
      title: "Students",
      count: studentsCount,
      icon: <FiUsers className="w-8 h-8" />,
      href: "/admin/students",
      newHref: "/admin/students/new",
      color: "primary" as const,
    },
    {
      title: "Projects",
      count: projectsCount,
      icon: <FiFolderPlus className="w-8 h-8" />,
      href: "/admin/projects",
      newHref: "/admin/projects/new",
      color: "secondary" as const,
    },
    {
      title: "Technologies",
      count: technologiesCount,
      icon: <FiSettings className="w-8 h-8" />,
      href: "/admin/technologies",
      newHref: "/admin/technologies/new",
      color: "success" as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Dashboard Overview
        </h1>
        <p className="text-default-600">
          Welcome to your portfolio administration panel
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="hover:scale-105 transition-transform"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg bg-${stat.color}/10 text-${stat.color}`}
                >
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{stat.title}</h3>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.count}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              <div className="flex gap-2">
                <Button
                  as={Link}
                  href={stat.href}
                  variant="flat"
                  color={stat.color}
                  size="sm"
                  className="flex-1"
                >
                  View All
                </Button>
                <Button
                  as={Link}
                  href={stat.newHref}
                  variant="solid"
                  color={stat.color}
                  size="sm"
                  startContent={<FiPlus className="w-4 h-4" />}
                >
                  New
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Quick Actions</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              as={Link}
              href="/admin/students/new"
              variant="flat"
              color="primary"
              size="lg"
              startContent={<FiPlus className="w-5 h-5" />}
              className="h-16"
            >
              Add New Student
            </Button>
            <Button
              as={Link}
              href="/admin/projects/new"
              variant="flat"
              color="secondary"
              size="lg"
              startContent={<FiPlus className="w-5 h-5" />}
              className="h-16"
            >
              Create New Project
            </Button>
            <Button
              as={Link}
              href="/admin/technologies/new"
              variant="flat"
              color="success"
              size="lg"
              startContent={<FiPlus className="w-5 h-5" />}
              className="h-16"
            >
              Add New Technology
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Getting Started</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <p className="text-default-600">
              Welcome to your admin dashboard! Here you can manage all aspects
              of your portfolio:
            </p>
            <ul className="space-y-2 text-sm text-default-600">
              <li>
                • <strong>Students:</strong> Add and manage student profiles
              </li>
              <li>
                • <strong>Projects:</strong> Create and showcase student
                projects
              </li>
              <li>
                • <strong>Technologies:</strong> Define the tech stack used in
                projects
              </li>
            </ul>
            <div className="pt-4">
              <Button
                as={Link}
                href="/admin/students"
                color="primary"
                variant="flat"
              >
                Start by adding students
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
