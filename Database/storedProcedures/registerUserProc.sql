CREATE OR ALTER PROCEDURE registerUserProc(@id VARCHAR(50),@username VARCHAR(50),@email VARCHAR(100),@password VARCHAR(MAX))
AS 
BEGIN 
INSERT INTO usersTable(id,username,email,password) 
VALUES (@id,@username,@email,@password)
END;



