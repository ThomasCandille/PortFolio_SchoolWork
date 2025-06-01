"use client";

import { Button, Card, CardBody } from "@heroui/react";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Hi, I&apos;m{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your Name
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-6">
            Full Stack Developer & Creative Problem Solver
          </p>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
            I create beautiful, functional, and user-centered digital
            experiences. Passionate about turning ideas into reality through
            clean code and thoughtful design.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            color="primary"
            variant="solid"
            className="font-semibold"
            href="#projects"
            as="a"
          >
            View My Work
          </Button>
          <Button
            size="lg"
            color="primary"
            variant="bordered"
            className="font-semibold"
            href="#contact"
            as="a"
          >
            Get In Touch
          </Button>
        </div>

        <Card className="bg-background/50 backdrop-blur-sm border border-border">
          <CardBody className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">3+</h3>
                <p className="text-foreground/70">Years Experience</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">15+</h3>
                <p className="text-foreground/70">Projects Completed</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">10+</h3>
                <p className="text-foreground/70">Technologies</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">5+</h3>
                <p className="text-foreground/70">Happy Clients</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
