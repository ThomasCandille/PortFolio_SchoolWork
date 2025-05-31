<?php

namespace App\Entity;

use App\Repository\ProjectRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProjectRepository::class)]
class Project
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $shortDescription = null;

    #[ORM\Column(type: Types::ARRAY)]
    private array $technologies = [];

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $liveURL = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $githubURL = null;

    #[ORM\Column]
    private ?bool $isPublic = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getShortDescription(): ?string
    {
        return $this->shortDescription;
    }

    public function setShortDescription(?string $shortDescription): static
    {
        $this->shortDescription = $shortDescription;

        return $this;
    }

    public function getTechnologies(): array
    {
        return $this->technologies;
    }

    public function setTechnologies(array $technologies): static
    {
        $this->technologies = $technologies;

        return $this;
    }

    public function getLiveURL(): ?string
    {
        return $this->liveURL;
    }

    public function setLiveURL(?string $liveURL): static
    {
        $this->liveURL = $liveURL;

        return $this;
    }

    public function getGithubURL(): ?string
    {
        return $this->githubURL;
    }

    public function setGithubURL(?string $githubURL): static
    {
        $this->githubURL = $githubURL;

        return $this;
    }

    public function isPublic(): ?bool
    {
        return $this->isPublic;
    }

    public function setIsPublic(bool $isPublic): static
    {
        $this->isPublic = $isPublic;

        return $this;
    }
}
