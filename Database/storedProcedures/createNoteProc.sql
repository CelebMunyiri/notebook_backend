CREATE OR ALTER PROCEDURE createNoteProc(@id VARCHAR(50),@note_title VARCHAR(50),@note_content VARCHAR(200))
AS
BEGIN
INSERT
INTO notesTable(id,note_title,note_content)
VALUES (@id,@note_title,@note_content)
END

