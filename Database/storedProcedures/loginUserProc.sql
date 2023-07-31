CREATE OR ALTER PROCEDURE loginUserProc(@username VARCHAR(50),@password VARCHAR(50))
AS 
BEGIN 
SELECT * FROM usersTable 
WHERE username=@username AND password=@password
END;