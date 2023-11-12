CREATE TABLE movies ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL CHECK(length(Nom) <= 128),
    dateParution TEXT NOT NULL CHECK(length(Description) <= 2048),
    dateParution DATE NOT NULL,
    note INTEGER CHECK(Note >= 0 AND Note <= 5)
); 

INSERT INTO movies (id, nom, dateParution, dateParution, note)
 VALUES
 ('12345', 'Marvel', 'Film daction', 2023,5),
 ('23456', 'Avatar', 'Film daventure', 2023,4);








