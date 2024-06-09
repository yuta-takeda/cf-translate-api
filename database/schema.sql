CREATE TABLE IF NOT EXISTS artists (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    english_name TEXT NOT NULL,
    japanese_name TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS groups (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    english_name TEXT NOT NULL,
    japanese_name TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS series (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    english_name TEXT NOT NULL,
    japanese_name TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS histories (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    english_name TEXT NOT NULL,
    japanese_name TEXT NOT NULL,
    table_name TEXT NOT NULL,
    ip_address TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL
);