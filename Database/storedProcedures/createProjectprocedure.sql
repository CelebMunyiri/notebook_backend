CREATE OR ALTER PROCEDURE createProjectPROC(@id VARCHAR(200),@note_title VARCHAR(200),@note_content VARCHAR(200),@creation_time TIME)
AS
BEGIN
INSERT INTO projectsTable(id,project_name, description, project_location, startdate, enddate) 
VALUES (@id,@note_title,@note_content,@creation_time)
END