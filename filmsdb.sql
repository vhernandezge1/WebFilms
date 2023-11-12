CREATE TABLE movies ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL CHECK(length(Nom) <= 128),
    dateParution TEXT NOT NULL CHECK(length(Description) <= 2048),
    dateParution DATE NOT NULL,
    note INTEGER CHECK(Note >= 0 AND Note <= 5)
); 

INSERT INTO movies (id, nom, description, dateParution, note)
 VALUES
 ('1', 'Marvel', 'Film daction', 2023,5),
 ('2', 'Avatar', 'Film daventure', 2023,4),
 ('3', 'Charlie et la Chocolaterie', 'Film daventure', 1997,5);








