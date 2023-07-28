BEGIN 
TRY
CREATE TABLE notesTable(
    id VARCHAR(50) PRIMARY KEY,
    note_title VARCHAR(50) NOT NULL,
    note_content VARCHAR(100) NOT NULL,
    creation_time TIMESTAMP NOT NULL
)
END TRY
BEGIN
CATCH
THROW 50001, 'Table is in existence',1
END CATCH