-- Interactive STEM Platform – Initial Schema
-- Requires PostgreSQL 16+ with pgvector extension
-- Official pgvector: https://github.com/pgvector/pgvector

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users (works with Auth.js / NextAuth adapter or custom)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  email TEXT UNIQUE,
  email_verified TIMESTAMPTZ,
  image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Accounts / Sessions for Auth.js (standard tables)
CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  UNIQUE(provider, provider_account_id)
);

CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_token TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier TEXT NOT NULL,
  token TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- Learning progress
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_slug TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  score NUMERIC(5,2),
  last_accessed TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  data JSONB DEFAULT '{}',
  UNIQUE(user_id, module_slug)
);

-- Content embeddings for future RAG / search (pgvector)
CREATE TABLE IF NOT EXISTS content_embeddings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_slug TEXT NOT NULL,
  chunk_id TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding vector(384), -- adjust dimension to your embedding model
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(module_slug, chunk_id)
);

-- Index for similarity search (official pgvector HNSW example)
-- CREATE INDEX ON content_embeddings USING hnsw (embedding vector_cosine_ops);

COMMENT ON TABLE content_embeddings IS 'Stores embeddings for semantic search and AI tutor RAG. Use official pgvector operators: <=> cosine, <-> L2, <#> inner product';
