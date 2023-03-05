CREATE TABLE message (
    message_id serial PRIMARY KEY,
    user_id INT NOT NULL,
    text VARCHAR(250) NOT NULL,

    FOREIGN KEY (user_id)
        REFERENCES "user" (user_id)
);
