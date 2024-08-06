-- USE brain_boost_db;

INSERT INTO users (username, password)
VALUES ("banana", "$2b$10$/1UfZvXYrToAGa5mO1IbfesmFQJ42WIlI60swCyafhzrB/2KcD1RK");

INSERT INTO study_sets (set_id, user_id, title, description)
VALUES (1, 1, "This is a test", "optional description");

INSERT INTO flashcards (flashcard_id, set_id, term, answer)
VALUES (1, 1, "IS THIS A TEST?", "YES");

INSERT INTO flashcards (flashcard_id, set_id, term, answer)
VALUES (1, 1, "IS THIS A TEST TOO?", "YES");