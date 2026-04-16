<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        $this->createTestDatabaseIfNotExists();
        parent::setUp();
    }

    private function createTestDatabaseIfNotExists(): void
    {
        $db       = $_ENV['DB_DATABASE'] ?? 'szakdolgozat_test';
        $host     = $_ENV['DB_HOST']     ?? '127.0.0.1';
        $port     = $_ENV['DB_PORT']     ?? '3306';
        $user     = $_ENV['DB_USERNAME'] ?? 'root';
        $password = $_ENV['DB_PASSWORD'] ?? '';

        try {
            $pdo = new \PDO(
                "mysql:host={$host};port={$port}",
                $user,
                $password
            );
            $safeDb = preg_replace('/\W/', '', $db);
            $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$safeDb}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        } catch (\PDOException) {
            // Ha nem sikerül csatlakozni, a teszt maga fog hibát dobni
        }
    }
}
