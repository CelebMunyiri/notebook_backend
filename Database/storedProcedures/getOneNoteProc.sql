CREATE OR ALTER PROCEDURE getOneNoteProc(@id VARCHAR(50))
AS 
BEGIN
SELECT id,note_title,note_content,creation_time
FROM notesTable WHERE id=@id 
END;

