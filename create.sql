create table handbook_docs(
  id bigint primary key,
  content text,
  embedding vector(1024)
)
