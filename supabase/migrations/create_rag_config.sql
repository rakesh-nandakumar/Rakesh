-- RAG Configuration Table
-- Stores admin-customizable RAG manifest and settings

create table if not exists rag_config (
  id uuid default gen_random_uuid() primary key,
  key text not null unique,
  value jsonb not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table rag_config enable row level security;

-- Policy: Public read, service_role write
create policy "Public can read rag config" on rag_config
  for select using (true);

create policy "Service role can insert rag config" on rag_config
  for insert with check (true);

create policy "Service role can update rag config" on rag_config
  for update using (true);

-- Insert default configuration
insert into rag_config (key, value) values 
('manifest_json', '{
  "version": "2.0.0",
  "tables": {
    "profiles": {
      "priority": "critical",
      "alwaysInclude": true,
      "query": "*",
      "summaryTemplate": "{name} is a {title}. {short_bio}. CV: {cv_link}."
    },
    "contacts": {
      "priority": "high",
      "alwaysInclude": true,
      "query": "*, contact_types(name, icon)",
      "itemSummaryTemplate": "{contact_types.name}: {value}"
    },
    "timelines": {
      "priority": "high",
      "query": "*, timeline_categories(name), timeline_technologies(technology)",
      "itemSummaryTemplate": "{title} ({time}) [{timeline_categories.name}]: {short_description}. Tech: {timeline_technologies.technology}."
    },
    "portfolios": {
      "priority": "high",
      "query": "*, portfolio_technologies(technology)",
      "itemSummaryTemplate": "Project: {title} [{category}]. {short_description}. Live: {live_link}. GitHub: {github_link}."
    },
    "blogs": {
      "priority": "medium",
      "query": "title, excerpt, slug, category, date, blog_tags(tag)",
      "itemSummaryTemplate": "Blog: {title} ({date}) [{category}]. {excerpt}. Tags: {blog_tags.tag}."
    }
  },
  "retrievalRules": {
    "defaultTopK": 6,
    "maxItemsPerTable": {
      "timelines": 4,
      "portfolios": 3,
      "blogs": 3
    }
  }
}'::jsonb),
('enabled_sections', '{
  "profiles": true,
  "contacts": true,
  "timelines": true,
  "portfolios": true,
  "blogs": true
}'::jsonb)
on conflict (key) do nothing;

-- Create updated_at trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_rag_config_updated_at
  before update on rag_config
  for each row
  execute function update_updated_at_column();
