<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250531172411 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE project RENAME COLUMN year TO year_of_study
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE student RENAME COLUMN year TO year_of_study
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE project RENAME COLUMN year_of_study TO year
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE student RENAME COLUMN year_of_study TO year
        SQL);
    }
}
