CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    query TEXT NOT NULL,

    analysis JSONB NOT NULL,
    
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_analyses_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_analyses_user_created
ON analyses(user_id, created_at DESC);