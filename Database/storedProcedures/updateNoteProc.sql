CREATE OR ALTER PROCEDURE updateNoteProc(@id VARCHAR(50),@note_title VARCHAR(50),@note_content VARCHAR(200))
AS 
BEGIN
UPDATE notesTable 
SET note_title= @note_title ,note_content=@note_content 
WHERE id=@id 
END;