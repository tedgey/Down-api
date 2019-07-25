CREATE TABLE users
(
  user_id SERIAL PRIMARY KEY,
  name text
);

CREATE TABLE groups
(
  group_id SERIAL PRIMARY KEY,
  group_name character varying,
  date_time character varying
);

CREATE TABLE messages
(
  id SERIAL PRIMARY KEY,
  group_id int references groups(group_id),
  texts character varying,
  user_id integer
);

CREATE TABLE user_groups
(
  id SERIAL PRIMARY KEY,
  user_id int references users(user_id),
  group_id int references groups(group_id)
);