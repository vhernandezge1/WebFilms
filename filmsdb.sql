CREATE TABLE FILM BABYLON ( 
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Nom TEXT NOT NULL CHECK(length(Nom) <= 128),
    Description TEXT NOT NULL CHECK(length(Description) <= 2048),
    DateParution DATE NOT NULL,
    Note INTEGER CHECK(Note >= 0 AND Note <= 5)
); 


