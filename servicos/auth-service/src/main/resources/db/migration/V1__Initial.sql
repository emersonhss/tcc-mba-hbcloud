CREATE TABLE IF NOT EXISTS users (
  username VARCHAR(50) NOT NULL PRIMARY KEY,
  email VARCHAR(120),
  password TEXT,
  activated BOOLEAN DEFAULT FALSE,
  activationkey VARCHAR(50) DEFAULT NULL,
  resetpasswordkey VARCHAR(50) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS authorities (
  name VARCHAR(50) NOT NULL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS users_authorities (
    username VARCHAR(50) NOT NULL,
    authority VARCHAR(50) NOT NULL,
    FOREIGN KEY (username) REFERENCES users (username),
    FOREIGN KEY (authority) REFERENCES authorities (name),
    UNIQUE (username, authority)
);

CREATE TABLE IF NOT EXISTS oauth_access_tokens (
  token_id VARCHAR(256) DEFAULT NULL,
  token TEXT,
  authentication_id VARCHAR(256) DEFAULT NULL,
  user_name VARCHAR(256) DEFAULT NULL,
  client_id VARCHAR(256) DEFAULT NULL,
  authentication TEXT,
  refresh_token TEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS oauth_refresh_tokens (
  token_id VARCHAR(256) DEFAULT NULL,
  token TEXT,
  authentication TEXT
);

CREATE TABLE IF NOT EXISTS  oauth_clients_details (
  client_id VARCHAR(255) PRIMARY KEY,
  resource_ids TEXT,
  client_secret TEXT,
  scope TEXT,
  authorized_grant_types TEXT,
  web_server_redirect_uri TEXT,
  authorities TEXT,
  access_token_validity INTEGER,
  refresh_token_validity INTEGER,
  additional_information TEXT,
  autoapprove TEXT
);


INSERT INTO users (username, email, password, activated)
SELECT * FROM (SELECT 'admin', 'admin@admin.com', '$2a$10$r0RFDmpneBVryx.ihHK9gu6FFJQi4nTxQUqzdSTvrPpaKZMxigqpy', true) AS tmp
WHERE NOT EXISTS (
    SELECT username FROM users WHERE username = 'admin'
) LIMIT 1;

INSERT INTO authorities (name)
SELECT * FROM (SELECT 'ROLE_USER') AS tmp
WHERE NOT EXISTS (
    SELECT name FROM authorities WHERE name = 'ROLE_USER'
) LIMIT 1;

INSERT INTO authorities (name)
SELECT * FROM (SELECT 'ROLE_ADMIN') AS tmp
WHERE NOT EXISTS (
    SELECT name FROM authorities WHERE name = 'ROLE_ADMIN'
) LIMIT 1;

INSERT INTO users_authorities (username, authority)
SELECT * FROM (SELECT 'admin', 'ROLE_USER') AS tmp
WHERE NOT EXISTS (
    SELECT username, authority FROM users_authorities WHERE username = 'admin' and authority = 'ROLE_USER'
) LIMIT 1;

INSERT INTO users_authorities (username, authority)
SELECT * FROM (SELECT 'admin', 'ROLE_ADMIN') AS tmp
WHERE NOT EXISTS (
    SELECT username, authority FROM users_authorities WHERE username = 'admin' and authority = 'ROLE_ADMIN'
) LIMIT 1;