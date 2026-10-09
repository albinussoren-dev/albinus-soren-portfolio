-- Albinus Soren Portfolio schema
-- Run this in Supabase Dashboard > SQL Editor.
-- These tables are accessed only by Next.js server routes using the service-role key.
-- Do not expose the service-role key to the browser.

create extension if not exists pgcrypto;

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 2 and 100),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  category text not null default 'web' check (category in ('web','ai','creative')),
  summary text not null check (char_length(summary) between 5 and 600),
  technologies text[] not null default '{}',
  live_url text,
  repo_url text,
  status text not null default 'Concept' check (status in ('Live','In development','Concept','Experiment')),
  featured boolean not null default false,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 254),
  topic text not null default 'Something else' check (char_length(topic) <= 120),
  message text not null check (char_length(message) between 3 and 5000),
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists portfolio_projects_public_order_idx
  on public.portfolio_projects (published, featured desc, sort_order asc, created_at desc);
create index if not exists portfolio_messages_created_idx
  on public.portfolio_messages (created_at desc);

-- RLS is enabled as defense in depth. No anon/authenticated policies are created:
-- browser clients cannot read/write these tables directly.
alter table public.portfolio_projects enable row level security;
alter table public.portfolio_messages enable row level security;

-- Seed initial projects only when their slug is not already present.
insert into public.portfolio_projects
(title, slug, category, summary, technologies, status, featured, published, sort_order)
values
('SunoSantal','sunosantal','web','A music discovery and streaming experience concept celebrating Santali music.','{"Next.js","FastAPI","PostgreSQL"}','In development',true,true,1),
('PHULGO','phulgo','ai','A personal language-model learning experiment exploring tokenization, datasets, and training workflows.','{"Python","LLM","Data"}','Experiment',true,true,2),
('TechBinus','techbinus','creative','A technology content brand concept covering AI tools, practical technology, and digital skills.','{"Content","Technology","SEO"}','Concept',true,true,3),
('Infinite AI Studio','infinite-ai-studio','ai','An AI creative-workspace concept for bringing content and creative workflows together.','{"AI","SaaS","Product"}','Concept',false,true,4),
('ClipForge / iCut','clipforge-icut','creative','Exploring accessible video-editing workflows and a mobile-first editing experience.','{"Android","Media","UX"}','Concept',false,true,5),
('ARAM','aram','web','A social platform idea focused on community, identity, and meaningful digital connection.','{"Product","UX","Community"}','Concept',false,true,6)
on conflict (slug) do nothing;