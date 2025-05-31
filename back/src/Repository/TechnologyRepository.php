<?php

namespace App\Repository;

use App\Entity\Technology;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Technology>
 */
class TechnologyRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Technology::class);
    }

    /**
     * Find technologies by category
     */
    public function findByCategory(string $category): array
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.category = :category')
            ->setParameter('category', $category)
            ->orderBy('t.name', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Find technologies used in projects with usage count
     */
    public function findWithUsageCount(): array
    {
        return $this->createQueryBuilder('t')
            ->select('t, COUNT(p.id) as projectCount')
            ->leftJoin('t.projects', 'p')
            ->groupBy('t.id')
            ->orderBy('projectCount', 'DESC')
            ->addOrderBy('t.name', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Search technologies by name
     */
    public function searchByName(string $search): array
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.name LIKE :search')
            ->setParameter('search', '%' . $search . '%')
            ->orderBy('t.name', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Get all available categories
     */
    public function getCategories(): array
    {
        $result = $this->createQueryBuilder('t')
            ->select('DISTINCT t.category')
            ->orderBy('t.category', 'ASC')
            ->getQuery()
            ->getResult();

        return array_column($result, 'category');
    }
}