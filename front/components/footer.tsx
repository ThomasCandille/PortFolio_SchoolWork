"use client";

import { Link, Button } from "@heroui/react";

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-background border-t border-border py-16 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Get In Touch
            </h3>
            <p className="text-foreground/70 mb-4">
              I&apos;m always open to discussing new opportunities, interesting
              projects, or just having a chat about technology.
            </p>
            <div className="space-y-2">
              <Link
                href="mailto:your.email@example.com"
                className="text-primary hover:text-primary/80 block"
              >
                your.email@example.com
              </Link>
              <Link
                href="tel:+1234567890"
                className="text-primary hover:text-primary/80 block"
              >
                +1 (234) 567-890
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <div className="space-y-2">
              <Link
                href="#about"
                className="text-foreground/70 hover:text-primary block"
              >
                About
              </Link>
              <Link
                href="#projects"
                className="text-foreground/70 hover:text-primary block"
              >
                Projects
              </Link>
              <Link
                href="/admin"
                className="text-foreground/70 hover:text-primary block"
              >
                Admin
              </Link>
              <Link
                href="#"
                className="text-foreground/70 hover:text-primary block"
              >
                Resume
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Connect With Me
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button
                as={Link}
                href="https://github.com"
                variant="bordered"
                size="sm"
                className="hover:bg-primary hover:text-white"
              >
                GitHub
              </Button>
              <Button
                as={Link}
                href="https://linkedin.com"
                variant="bordered"
                size="sm"
                className="hover:bg-primary hover:text-white"
              >
                LinkedIn
              </Button>
              <Button
                as={Link}
                href="https://twitter.com"
                variant="bordered"
                size="sm"
                className="hover:bg-primary hover:text-white"
              >
                Twitter
              </Button>
              <Button
                as={Link}
                href="#"
                variant="bordered"
                size="sm"
                className="hover:bg-primary hover:text-white"
              >
                Portfolio
              </Button>
            </div>
            <p className="text-foreground/60 text-sm mt-6">
              Let&apos;s build something amazing together!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-foreground/60 text-sm">
            © 2024 Your Name. Built with Next.js and HeroUI. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
