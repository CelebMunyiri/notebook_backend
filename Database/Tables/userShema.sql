BEGIN 
TRY 
CREATE TABLE usersTable(
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(MAX) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    issent BIT DEFAULT 0
)
END TRY
BEGIN   
CATCH 
THROW 50001,'User table Alrady created as sucess',1
END CATCH



-- SELECT * FROM usersTable;