<?php

namespace App\Command;

use App\Entity\Project;
use App\Entity\Student;
use App\Entity\Technology;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:seed-test-data',
    description: 'Seed the database with test data for API testing'
)]
class SeedTestDataCommand extends Command
{
    public function __construct(
        private EntityManagerInterface $entityManager
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $io->title('Seeding Test Data');

        // Create Technologies
        $technologies = $this->createTechnologies($io);

        // Create Students
        $students = $this->createStudents($io);

        // Create Projects
        $this->createProjects($io, $technologies, $students);

        $this->entityManager->flush();

        $io->success('Test data seeded successfully!');

        return Command::SUCCESS;
    }

    private function createTechnologies(SymfonyStyle $io): array
    {
        $io->section('Creating Technologies');

        $technologiesData = [
            ['name' => 'React', 'category' => 'Frontend', 'icon' => 'react.svg'],
            ['name' => 'TypeScript', 'category' => 'Frontend', 'icon' => 'typescript.svg'],
            ['name' => 'PHP', 'category' => 'Backend', 'icon' => 'php.svg'],
            ['name' => 'Symfony', 'category' => 'Backend', 'icon' => 'symfony.svg'],
            ['name' => 'MySQL', 'category' => 'Database', 'icon' => 'mysql.svg'],
            ['name' => 'Docker', 'category' => 'DevOps', 'icon' => 'docker.svg'],
        ];

        $technologies = [];
        foreach ($technologiesData as $data) {
            $technology = new Technology();
            $technology->setName($data['name']);
            $technology->setCategory($data['category']);
            $technology->setIcon($data['icon']);

            $this->entityManager->persist($technology);
            $technologies[] = $technology;

            $io->writeln("Created technology: {$data['name']}");
        }

        return $technologies;
    }

    private function createStudents(SymfonyStyle $io): array
    {
        $io->section('Creating Students');

        $studentsData = [
            ['name' => 'Alice Johnson', 'email' => 'alice@example.com', 'yearOfStudy' => '1', 'bio' => 'Frontend developer passionate about React and UX design.'],
            ['name' => 'Bob Smith', 'email' => 'bob@example.com', 'yearOfStudy' => '2', 'bio' => 'Full-stack developer with expertise in PHP and JavaScript.'],
            ['name' => 'Carol Davis', 'email' => 'carol@example.com', 'yearOfStudy' => '3', 'bio' => 'Backend developer specializing in API development and databases.'],
        ];

        $students = [];
        foreach ($studentsData as $data) {
            $student = new Student();
            $student->setName($data['name']);
            $student->setEmail($data['email']);
            $student->setYearOfStudy($data['yearOfStudy']);
            $student->setBio($data['bio']);

            $this->entityManager->persist($student);
            $students[] = $student;

            $io->writeln("Created student: {$data['name']}");
        }

        return $students;
    }

    private function createProjects(SymfonyStyle $io, array $technologies, array $students): void
    {
        $io->section('Creating Projects');

        $projectsData = [
            [
                'title' => 'Portfolio Website',
                'shortDescription' => 'A modern portfolio website built with React and TypeScript',
                'description' => 'This project showcases a responsive portfolio website with modern design principles, built using React and TypeScript for the frontend.',
                'yearOfStudy' => '1',
                'status' => 'published',
                'liveUrl' => 'https://portfolio.example.com',
                'githubUrl' => 'https://github.com/example/portfolio',
                'techIndices' => [0, 1], // React, TypeScript
                'studentIndices' => [0] // Alice
            ],
            [
                'title' => 'E-commerce API',
                'shortDescription' => 'RESTful API for e-commerce platform using Symfony',
                'description' => 'A comprehensive e-commerce API built with Symfony and API Platform, featuring user authentication, product management, and order processing.',
                'yearOfStudy' => '2',
                'status' => 'published',
                'githubUrl' => 'https://github.com/example/ecommerce-api',
                'techIndices' => [2, 3, 4], // PHP, Symfony, MySQL
                'studentIndices' => [1, 2] // Bob, Carol
            ],
            [
                'title' => 'Task Management App',
                'shortDescription' => 'Full-stack task management application',
                'description' => 'A collaborative task management application with real-time updates, built with React frontend and Symfony backend.',
                'yearOfStudy' => '3',
                'status' => 'draft',
                'techIndices' => [0, 1, 2, 3], // React, TypeScript, PHP, Symfony
                'studentIndices' => [0, 1] // Alice, Bob
            ]
        ];

        foreach ($projectsData as $data) {
            $project = new Project();
            $project->setTitle($data['title']);
            $project->setShortDescription($data['shortDescription']);
            $project->setDescription($data['description']);
            $project->setYearOfStudy($data['yearOfStudy']);
            $project->setStatus($data['status']);

            if (isset($data['liveUrl'])) {
                $project->setLiveUrl($data['liveUrl']);
            }

            if (isset($data['githubUrl'])) {
                $project->setGithubUrl($data['githubUrl']);
            }

            // Add technologies
            foreach ($data['techIndices'] as $index) {
                $project->addTechnology($technologies[$index]);
            }

            // Add students
            foreach ($data['studentIndices'] as $index) {
                $project->addStudent($students[$index]);
            }

            $this->entityManager->persist($project);

            $io->writeln("Created project: {$data['title']}");
        }
    }
}