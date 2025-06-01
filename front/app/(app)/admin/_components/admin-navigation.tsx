"use client";

import { Button } from "@/components/hero";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiUsers,
  FiFolderPlus,
  FiSettings,
  FiPlus,
} from "react-icons/fi";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: <FiHome className="w-4 h-4" />,
  },
  {
    href: "/admin/students",
    label: "Students",
    icon: <FiUsers className="w-4 h-4" />,
  },
  {
    href: "/admin/projects",
    label: "Projects",
    icon: <FiFolderPlus className="w-4 h-4" />,
  },
  {
    href: "/admin/technologies",
    label: "Technologies",
    icon: <FiSettings className="w-4 h-4" />,
  },
];

const quickActions: NavItem[] = [
  {
    href: "/admin/students/new",
    label: "New Student",
    icon: <FiPlus className="w-4 h-4" />,
  },
  {
    href: "/admin/projects/new",
    label: "New Project",
    icon: <FiPlus className="w-4 h-4" />,
  },
  {
    href: "/admin/technologies/new",
    label: "New Technology",
    icon: <FiPlus className="w-4 h-4" />,
  },
];

export default function AdminNavigation() {
  const pathname = usePathname();

  return (
    <nav className="p-6 space-y-6">
      {/* Main Navigation */}
      <div>
        <h3 className="text-small font-semibold text-default-600 mb-3">
          Navigation
        </h3>
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Button
                key={item.href}
                as={Link}
                href={item.href}
                variant={isActive ? "flat" : "light"}
                color={isActive ? "primary" : "default"}
                className="w-full justify-start"
                startContent={item.icon}
              >
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-small font-semibold text-default-600 mb-3">
          Quick Actions
        </h3>
        <div className="space-y-1">
          {quickActions.map((action) => (
            <Button
              key={action.href}
              as={Link}
              href={action.href}
              variant="light"
              color="success"
              size="sm"
              className="w-full justify-start"
              startContent={action.icon}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
