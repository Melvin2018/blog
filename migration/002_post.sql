-- +goose Up
CREATE TABLE post (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    title TEXT not null,
    body TEXT not null,
    "userId" UUID not null REFERENCES user(id),
    modified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER update_user_modified BEFORE
UPDATE ON post FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE INDEX post_user_id_fk on post("userId")