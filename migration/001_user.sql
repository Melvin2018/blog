-- +goose Up
-- +goose StatementBegin
/* Add modified update function */
CREATE OR REPLACE FUNCTION update_modified_column() RETURNS TRIGGER AS $$ BEGIN NEW.modified = now();
RETURN NEW;
END;
$$ language 'plpgsql';
-- +goose StatementEnd
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE user(
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    firstname TEXT NOT NULL,
    middlename TEXT NOT NULL DEFAULT '',
     lastname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    email_verified BOOLEAN DEFAULT FALSE,
    password TEXT NOT NULL,
    modified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER update_user_modified BEFORE
UPDATE ON user FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
-- +goose Down
DROP TRIGGER IF EXISTS update_user_modified ON user;
DROP TABLE user;