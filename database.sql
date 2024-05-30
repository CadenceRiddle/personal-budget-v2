CREATE TABLE envelopes(
  id INTEGER PRIMARY KEY,
  name VARCHAR(50),
  cost VARCHAR(10)
);


INSERT INTO envelopes (id, name, cost) VALUES (1, 'Housing', '$1000');
INSERT INTO envelopes (id, name, cost) VALUES (2, 'Car', '$350');


SELECT * FROM envelopes;
