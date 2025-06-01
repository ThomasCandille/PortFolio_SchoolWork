<?php

namespace App\Repository;

use App\Entity\ContactRequest;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ContactRequest>
 */
class ContactRequestRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ContactRequest::class);
    }

    /**
     * Find contact requests by status
     */
    public function findByStatus(string $status): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.status = :status')
            ->setParameter('status', $status)
            ->orderBy('c.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Get recent contact requests
     */
    public function findRecent(int $limit = 10): array
    {
        return $this->createQueryBuilder('c')
            ->orderBy('c.createdAt', 'DESC')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }

    /**
     * Count requests by status
     */
    public function countByStatus(): array
    {
        $result = $this->createQueryBuilder('c')
            ->select('c.status, COUNT(c.id) as count')
            ->groupBy('c.status')
            ->getQuery()
            ->getResult();

        $statusCounts = [];
        foreach ($result as $row) {
            $statusCounts[$row['status']] = $row['count'];
        }

        return $statusCounts;
    }

    /**
     * Find unread contact requests (new status)
     */
    public function findUnread(): array
    {
        return $this->findByStatus('new');
    }

    /**
     * Count unread contact requests
     */
    public function countUnread(): int
    {
        return $this->createQueryBuilder('c')
            ->select('COUNT(c.id)')
            ->andWhere('c.status = :status')
            ->setParameter('status', 'new')
            ->getQuery()
            ->getSingleScalarResult();
    }

    /**
     * Find contact requests from the last X days
     */
    public function findFromLastDays(int $days): array
    {
        $date = new \DateTimeImmutable("-{$days} days");

        return $this->createQueryBuilder('c')
            ->andWhere('c.createdAt >= :date')
            ->setParameter('date', $date)
            ->orderBy('c.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Search contact requests by name or email
     */
    public function search(string $term): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.firstName LIKE :term OR c.lastName LIKE :term OR c.email LIKE :term')
            ->setParameter('term', '%' . $term . '%')
            ->orderBy('c.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }
}