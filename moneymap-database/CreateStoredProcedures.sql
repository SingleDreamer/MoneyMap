/****
--This script creates all of the stored procedures in the database that are necessary for the applcation to function
--To Re-enable 30 minute user timeouts, uncomment all blocks that match the following before running
--/*AND u.[ConcurrencyStamp] >= DATEADD(minute, -30, SYSDATETIME())*/
****/

USE [MoneyMapDB]
GO

/****** Object:  StoredProcedure [dbo].[sp_add_city]    Script Date: 5/18/2019 8:42:27 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[sp_add_city]
	
	@CityID int,
	@Latitude float,
	@Longitude float,
	@Country varchar(255),
	@name varchar(255)
AS
BEGIN
	
	SET NOCOUNT ON;

    
	UPDATE Cities
	SET [Latitude] = @Latitude, [Longitude] = @Longitude, [Country] = @Country, [City] = @name
	WHERE [CityID] = @CityID

	INSERT Cities
	SELECT @CityID, @Latitude, @Longitude, @Country, @name
	WHERE NOT EXISTS (SELECT * FROM Cities c WHERE c.[CityID] = @CityID)
END
GO


/****** Object:  StoredProcedure [dbo].[sp_add_item]    Script Date: 5/18/2019 8:44:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_add_item]
	@itemid int,
	@rentfactor float,
	@cpifactor float,
	@name varchar(255),
	@category varchar(50)
AS
BEGIN
	
	SET NOCOUNT ON;

    
	UPDATE Items
	SET Rent_Factor = @rentfactor, Cpi_Factor = @cpifactor, [Name] = @name, [Category] = @category 
	WHERE Item_ID = @itemid

	INSERT Items
	SELECT @rentfactor, @cpifactor, @itemid, @name, @category, NULL
	WHERE NOT EXISTS (SELECT * FROM Items i WHERE i.Item_ID = @itemid)

END
GO

/****** Object:  StoredProcedure [dbo].[sp_add_item_price]    Script Date: 5/18/2019 8:45:14 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_add_item_price]
	@cityid int,
	@itemid	int,
	@lowestprice money = 0,
	@averageprice money = 0,
	@highestprice money = 0
AS
BEGIN
	SET NOCOUNT ON;

	DELETE ItemPrices
	WHERE [CityID] = @cityid AND [ItemID] = @itemid

	INSERT ItemPrices
	SELECT @cityid, @itemid, @lowestprice, @averageprice, @highestprice
	


END
GO


/****** Object:  StoredProcedure [dbo].[sp_add_joc_component]    Script Date: 5/18/2019 8:46:00 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_add_joc_component]
	@jocid int,
	@ctypeid int,
	@cdesc varchar(255) = '',
	@camt money, 
	@token uniqueidentifier
AS
BEGIN
	
	SET NOCOUNT ON;

    IF @cdesc = ''
	BEGIN
		SET @cdesc = (SELECT [ComponentTypeDescription]
					FROM ComponentTypes
					WHERE ComponentTypeID = @ctypeid)
	END
	
	IF NOT EXISTS (SELECT * FROM JobOfferCards j INNER JOIN Users u on u.[UID] = j.[UID]
					WHERE j.[JobOfferCardID] = @jocid AND u.[AuthToken] = @token /*AND u.[ConcurrencyStamp] >= DATEADD(minute, -30, SYSDATETIME())*/)
	BEGIN
		SELECT 1 as 'AuthFailed'
	END
	ELSE
	BEGIN
		UPDATE Users
		SET [ConcurrencyStamp] = SYSDATETIME()
		WHERE EXISTS (SELECT * FROM JobOfferCards j WHERE j.[JobOfferCardID] = @jocid AND j.[UID] = Users.[UID])
	
		INSERT CardComponents
		OUTPUT Inserted.CardComponentID
		SELECT @jocid, @ctypeid, @cdesc, @camt
	END

END
GO


/****** Object:  StoredProcedure [dbo].[sp_add_user_preference]    Script Date: 5/18/2019 8:46:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_add_user_preference]
	@uid uniqueidentifier,
	@itemid int,
	@amount float,
	@token uniqueidentifier
AS
BEGIN
	
	SET NOCOUNT ON;

	IF NOT EXISTS (SELECT * FROM Users u WHERE u.[UID] = @uid AND u.[AuthToken] = @token /*AND u.[ConcurrencyStamp] >= DATEADD(minute, -30, SYSDATETIME())*/)
	BEGIN
		SELECT 1 as 'AuthFailed'
	END
	ELSE
	BEGIN
		UPDATE Users
		SET [ConcurrencyStamp] = SYSDATETIME()
		WHERE [UID] = @uid
	
		UPDATE UserPreferences 
		SET [Amount] = @amount
		WHERE [UID] = @uid AND [ItemID] = @itemid

		INSERT UserPreferences
		SELECT @uid, @itemid, @amount
		WHERE NOT EXISTS (SELECT * FROM UserPreferences u WHERE u.[UID] = @uid AND u.[ItemID] = @itemid)

	END
END
GO


/****** Object:  StoredProcedure [dbo].[sp_create_joc]    Script Date: 5/18/2019 8:47:11 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_create_joc]
	@uid uniqueidentifier,
	@name varchar(50),
	@cityid int,
	@image varchar(max) = '',
	@token uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

    IF NOT EXISTS (SELECT * FROM Users u WHERE u.[UID] = @uid AND u.[AuthToken] = @token /*AND u.[ConcurrencyStamp] >= DATEADD(minute, -30, SYSDATETIME())*/)
	BEGIN
		SELECT 1 as 'AuthFailed'
	END
	ELSE
	BEGIN
		UPDATE Users 
		SET [ConcurrencyStamp] = SYSDATETIME()
		WHERE [UID] = @uid

		DECLARE @prio int

		SET @prio = (SELECT CASE WHEN [ProfileCardID] IS NULL THEN 0 ELSE 1 END FROM UserProfiles 
							WHERE [UID] = @uid)

		DECLARE @id int
		CREATE TABLE #tmp ([id] int)
	
		INSERT INTO JobOfferCards 
		OUTPUT inserted.JobOfferCardID into #tmp
		SELECT @uid, @name, @prio, 0, @cityid, @image

		SET @id = (SELECT TOP 1 [id] FROM #tmp)

		DROP TABLE #tmp
	
		IF @prio = 0 
		BEGIN
			UPDATE UserProfiles 
			SET [ProfileCardID] = @id
			WHERE [UID] = @uid
		END

		SELECT @id as 'JobOfferCardID'
	END
END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_create_user]
	@username varchar(255),
	@password varchar(255),
	@adults int,
	@fname varchar(50),
	@lname varchar(50),
	@children int,
	@married varchar(255)
AS
BEGIN
	SET NOCOUNT ON;

    DECLARE @table table ([UID] uniqueidentifier, [AuthToken] uniqueidentifier)

	INSERT INTO Users
	output inserted.[UID], inserted.[AuthToken] into @table
	SELECT NEWID(), @username, CAST(HASHBYTES('SHA2_512', CAST(HASHBYTES('SHA2_512', CAST(SYSDATETIME() as varchar(50))) as varchar(4000)) + @password) as varchar(4000)), SYSDATETIME(), CAST(HASHBYTES('SHA2_512', CAST(SYSDATETIME() as varchar(50))) as varchar(4000)), NEWID()
	WHERE NOT EXISTS (SELECT * FROM Users u WHERE u.[UserName] = @username) 

	INSERT INTO UserProfiles
	SELECT t.[UID], @username, @adults, NULL, @fname, @lname, @children, @married
	FROM @table t

	SELECT *
	FROM @table
END
GO


/****** Object:  StoredProcedure [dbo].[sp_create_userprofile]    Script Date: 5/18/2019 8:48:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_create_userprofile]
	@uid uniqueidentifier,
	@email varchar(255),
	@adults int,
	@cardid int = null,
	@fname varchar(50),
	@lname varchar(50),
	@children int,
	@married varchar(255),
	@token uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

    IF NOT EXISTS (SELECT * FROM Users u WHERE u.[UID] = @uid AND u.[AuthToken] = @token /*AND u.[ConcurrencyStamp] >= DATEADD(minute, -30, SYSDATETIME())*/)
	BEGIN
		SELECT 1 as 'AuthFailed'
	END
	ELSE
	BEGIN
		UPDATE Users
		SET [ConcurrencyStamp] = SYSDATETIME()
		WHERE [UID] = @uid

		INSERT INTO UserProfiles
		SELECT @uid, @email, @adults, @cardid, @fname, @lname, @children, @married
	END
END


/****** Object:  StoredProcedure [dbo].[sp_delete_joc]    Script Date: 5/18/2019 8:49:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_delete_joc]
	@cardid int,
	@token uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

    IF NOT EXISTS (SELECT * FROM JobOfferCards j INNER JOIN Users u on u.[UID] = j.[UID]
					WHERE j.[JobOfferCardID] = @cardid AND u.[AuthToken] = @token /*AND u.[ConcurrencyStamp] >= DATEADD(minute, -30, SYSDATETIME())*/)
	BEGIN
		SELECT 1 as 'AuthFailed'
	END
	ELSE
	BEGIN
		UPDATE Users
		SET ConcurrencyStamp = SYSDATETIME()
		WHERE EXISTS (SELECT * FROM JobOfferCards j WHERE j.[UID] = USers.[UID] AND j.[JobOfferCardID] = @cardid)

		UPDATE UserProfiles
		SET [ProfileCardID] = NULL
		WHERE [ProfileCardID] = @cardid

		DELETE CardComponents 
		WHERE [JobOfferCardID] = @cardid

		DELETE JobOfferCards 
		WHERE [JobOfferCardID] = @cardid
	END
END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_delete_joc_components]
	@jocid int,
	@token uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

    
	IF NOT EXISTS (SELECT * FROM JobOfferCards j INNER JOIN Users u on u.[UID] = j.[UID]
					WHERE j.[JobOfferCardID] = @jocid AND u.[AuthToken] = @token /*AND u.[ConcurrencyStamp] >= DATEADD(minute, -30, SYSDATETIME())*/)
	BEGIN
		SELECT 1 as 'AuthFailed'
	END
	ELSE
	BEGIN
		UPDATE Users
		SET [ConcurrencyStamp] = SYSDATETIME()
		WHERE EXISTS (SELECT * FROM JobOfferCards j WHERE j.[JobOfferCardID] = @jocid AND j.[UID] = Users.[UID])
	
		DELETE CardComponents
		WHERE [JobOfferCardID] = @jocid
	END

END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_get_averages]
	@cityid int,
	@uid uniqueidentifier,
	@token uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

    IF NOT EXISTS (SELECT * FROM Users u WHERE u.[UID] = @uid AND u.[AuthToken] = @token /*AND u.[ConcurrencyStamp] >= DATEADD(minute, -30, SYSDATETIME())*/)
	BEGIN
		SELECT 1 as 'AuthFailed'
	END
	ELSE
	BEGIN
		UPDATE Users
		SET [ConcurrencyStamp] = SYSDATETIME()
		WHERE [UID] = @uid

		DECLARE @adults int, @children int
		SET @adults = (SELECT u.[Adults]
								FROM UserProfiles u
								WHERE u.[UID] = @uid
								)
		SET @children = (SELECT u.[Children]
								FROM UserProfiles u
								WHERE u.[UID] = @uid
								)

		SELECT a.[ComponentTypeID], t.[ComponentTypeDescription], CASE WHEN a.[ComponentTypeID] = 2 THEN a.[Amount] WHEN a.[ComponentTypeID] = 1 THEN a.[Amount] * @adults ELSE a.[Amount] * (@adults + CAST(@children as float) * .5) END as 'Amount'
		FROM Averages a
		INNER JOIN ComponentTypes t on a.[ComponentTypeID] = t.[ComponentTypeID]
		WHERE a.[CityID] = @cityid
	END
END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_get_cities]
@CityName varchar(255) = ''
AS
BEGIN
	SET NOCOUNT ON;

    SELECT *
	FROM Cities c
	WHERE c.City LIKE '%' + @CityName + '%'
END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_get_city]
	@cityid int
AS
BEGIN
	SET NOCOUNT ON;

    SELECT *
	FROM Cities
	WHERE [CityID] = @cityid
END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_get_city_ids] 
	@type int
AS
BEGIN
	SET NOCOUNT ON;

	SELECT CityID
	FROM Cities
	WHERE [CityID] BETWEEN 1000* (@type - 1) AND 1000 * @type
END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_get_components]
	@jocid int,
	@token uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

    IF NOT EXISTS (SELECT * FROM JobOfferCards j INNER JOIN Users u on u.[UID] = j.[UID]
					WHERE j.[JobOfferCardID] = @jocid AND u.[AuthToken] = @token /*AND u.[ConcurrencyStamp] >= DATEADD(minute, -30, SYSDATETIME())*/)
	BEGIN
		SELECT 1 as 'AuthFailed'
	END
	ELSE
	BEGIN
		UPDATE Users
		SET ConcurrencyStamp = SYSDATETIME()
		WHERE EXISTS (SELECT * FROM JobOfferCards j WHERE j.[UID] = USers.[UID] AND j.[JobOfferCardID] = @jocid)
		
		SELECT * 
		FROM CardComponents
		WHERE [JobOfferCardID] = @jocid
		ORDER BY CASE WHEN [ComponentTypeID] = 0 THEN 5 ELSE [ComponentTypeID] END
	END
END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_get_componenttypes]
	
AS
BEGIN
	SET NOCOUNT ON;

    SELECT *
	FROM ComponentTypes
END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_get_items]
	
AS
BEGIN
	SET NOCOUNT ON;

    SELECT i.*, t.[ComponentTypeDescription]
	FROM Items i
	INNER JOIN ComponentTypes t on i.[Type] = t.[ComponentTypeID]
	ORDER BY t.[ComponentTypeID]
END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_get_jocs]
	@uid uniqueidentifier,
	@token uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

    IF NOT EXISTS (SELECT * FROM Users u WHERE u.[UID] = @uid AND u.[AuthToken] = @token /*AND u.[ConcurrencyStamp] >= DATEADD(minute, -30, SYSDATETIME())*/)
	BEGIN
		SELECT 1 as 'AuthFailed'
	END
	ELSE
	BEGIN
		UPDATE Users
		SET [ConcurrencyStamp] = SYSDATETIME()
		WHERE [UID] = @uid

		Select c.* , COALESCE(s.[Savings], 0) as 'savings'
		FROM JobOfferCards c
		LEFT OUTER JOIN (
		SELECT c.[JobOfferCardID], SUM(CASE WHEN c.[ComponentTypeID] != 1 THEN -1 * c.ComponentAmount ELSE c.ComponentAmount / 12 END) as 'savings'
		FROM CardComponents c
		WHERE c.[ComponentTypeID] != 0 AND c.[ComponentTypeID] < 5
		GROUP BY c.[JobOfferCardID]
		) s on s.JobOfferCardID = c.JobOfferCardID
		WHERE [UID] = @uid
	END
END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_get_profile] 
	@uid uniqueidentifier,
	@token uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

    IF NOT EXISTS (SELECT * FROM Users u WHERE u.[UID] = @uid AND u.[AuthToken] = @token /*AND u.[ConcurrencyStamp] >= DATEADD(minute, -30, SYSDATETIME())*/)
	BEGIN
		SELECT 1 as 'AuthFailed'
	END
	ELSE
	BEGIN
		UPDATE Users
		SET [ConcurrencyStamp] = SYSDATETIME()
		WHERE [UID] = @uid

		Select [FirstName], [LastName], [Adults], [Children], [MaritalStatus]
		From UserProfiles
		WHERE [UID] = @uid
	END
END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_get_tax_info]
	@jocid int,
	@token uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

    IF NOT EXISTS (SELECT * FROM JobOfferCards j INNER JOIN Users u on u.[UID] = j.[UID]
					WHERE j.[JobOfferCardID] = @jocid AND u.[AuthToken] = @token /*AND u.[ConcurrencyStamp] >= DATEADD(minute, -30, SYSDATETIME())*/)
	BEGIN
		SELECT 1 as 'AuthFailed'
	END
	ELSE
	BEGIN
		UPDATE Users
		SET [ConcurrencyStamp] = SYSDATETIME()
		WHERE EXISTS (SELECT * FROM JobOfferCards j WHERE j.[JobOfferCardID] = @jocid AND j.[UID] = Users.[UID])
	
		SELECT u.MaritalStatus as 'filing_status', CASE WHEN (u.[MaritalStatus] != 'married') THEN 1 ELSE 2 END + u.[Children] as 'exemptions', j.CityID
		FROM UserProfiles u
		INNER JOIN JobOfferCards j on j.[UID] = u.[UID]
		WHERE j.[JobOfferCardID] = @jocid
	END

END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_get_user_city_costs]
	@uid uniqueidentifier,
	@cityid int,
	@token uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

    IF NOT EXISTS (SELECT * FROM Users u WHERE u.[UID] = @uid AND u.[AuthToken] = @token /*AND u.[ConcurrencyStamp] >= DATEADD(minute, -30, SYSDATETIME())*/)
	BEGIN
		SELECT 1 as 'AuthFailed'
	END
	ELSE
	BEGIN
		UPDATE Users
		SET [ConcurrencyStamp] = SYSDATETIME()
		WHERE [UID] = @uid
	
		SELECT  t.[ComponentTypeID], t.[ComponentTypeDescription], SUM(u.[Amount] * p.[AveragePrice]) as 'Cost'
		FROM UserPreferences u
		INNER JOIN Items i on u.[ItemID] = i.[Item_ID]
		INNER JOIN ComponentTypes t on i.[Type] = t.[ComponentTypeID]
		INNER JOIN ItemPrices p on i.[Item_ID] = p.[ItemID]
		WHERE u.[UID] = @uid AND p.[CityID] = @cityid
		GROUP BY t.[ComponentTypeID], t.[ComponentTypeDescription]

	END
END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_get_user_city_preferences]
	@uid uniqueidentifier,
	@cityid int,
	@token uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

    IF NOT EXISTS (SELECT * FROM Users u WHERE u.[UID] = @uid /*AND u.[AuthToken] = @token AND u.[ConcurrencyStamp] >= DATEADD(minute, -30, SYSDATETIME())*/)
	BEGIN
		SELECT 1 as 'AuthFailed'
	END
	ELSE
	BEGIN
		UPDATE Users
		SET [ConcurrencyStamp] = SYSDATETIME()
		WHERE [UID] = @uid
	
		SELECT  t.[ComponentTypeID], t.[ComponentTypeDescription], i.[Item_ID], i.[Name], COALESCE(u.[Amount], 0) as 'Quantity', COALESCE(u.[Amount], 0) * p.[AveragePrice] as 'Price',
			p.[LowestPrice], p.[AveragePrice], p.[HighestPrice]
		FROM Items i 
		INNER JOIN ComponentTypes t on i.[Type] = t.[ComponentTypeID]
		INNER JOIN ItemPrices p on i.[Item_ID] = p.[ItemID]
		LEFT OUTER JOIN UserPreferences u on u.[ItemID] = p.[ItemID]
		WHERE u.[UID] = @uid AND p.[CityID] = @cityid

	END
END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_get_user_preferences]
	@uid uniqueidentifier,
	@token uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

    IF NOT EXISTS (SELECT * FROM Users u WHERE u.[UID] = @uid AND u.[AuthToken] = @token /*AND u.[ConcurrencyStamp] >= DATEADD(minute, -30, SYSDATETIME())*/)
	BEGIN
		SELECT 1 as 'AuthFailed'
	END
	ELSE
	BEGIN
		UPDATE Users
		SET [ConcurrencyStamp] = SYSDATETIME()
		WHERE [UID] = @uid
	
		SELECT  t.[ComponentTypeID], t.[ComponentTypeDescription], i.[Item_ID], i.[Name], u.[Amount]
		FROM UserPreferences u
		INNER JOIN Items i on u.[ItemID] = i.[Item_ID]
		INNER JOIN ComponentTypes t on i.[Type] = t.[ComponentTypeID]
		WHERE u.[UID] = @uid

	END
END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_update_averages]
AS
BEGIN
	SET NOCOUNT ON;

    UPDATE Averages
	SET [Amount] = t.[Amount]
	FROM (SELECT p.[CityID], i.[Type], SUM(u.[Amount] * p.[AveragePrice]) as 'amount'
		FROM UserPreferences u
		INNER JOIN Items i on u.[ItemID] = i.[Item_ID]
		INNER JOIN ItemPrices p on i.[Item_ID] = p.[ItemID]
		WHERE u.[UID] = '11111111-1111-1111-1111-111111111111'
		GROUP BY p.[CityID], i.[Type]
		) t 
	WHERE t.[CityID] = Averages.[CityID] AND t.[Type] = Averages.ComponentTypeID

	INSERT Averages 
	SELECT p.[CityID], i.[Type], SUM(u.[Amount] * p.[AveragePrice]) as 'amount'
	FROM UserPreferences u
	INNER JOIN Items i on u.[ItemID] = i.[Item_ID]
	INNER JOIN ItemPrices p on i.[Item_ID] = p.[ItemID]
	WHERE NOT EXISTS (SELECT * FROM Averages a WHERE a.[CityID] = p.[CityID] AND a.[ComponentTypeID] = i.[Type]) AND 
		u.[UID] = '11111111-1111-1111-1111-111111111111'
	GROUP BY p.[CityID], i.[Type]

END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_update_joc]
	@jocid int,
	@name varchar(50),
	@cityid int,
	@image varchar(max) = '',
	@token uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

    IF NOT EXISTS (SELECT * FROM JobOfferCards j INNER JOIN Users u on u.[UID] = j.[UID]
					WHERE j.[JobOfferCardID] = @jocid AND u.[AuthToken] = @token /*AND u.[ConcurrencyStamp] >= DATEADD(minute, -30, SYSDATETIME())*/)
	BEGIN
		SELECT 1 as 'AuthFailed'
	END
	ELSE
	BEGIN
		UPDATE Users
		SET [ConcurrencyStamp] = SYSDATETIME()
		WHERE EXISTS (SELECT * FROM JobOfferCards j WHERE j.[JobOfferCardID] = @jocid AND j.[UID] = Users.[UID])


		DECLARE @id int
		CREATE TABLE #tmp ([id] int)
	
		UPDATE JobOfferCards 
		SET [JobOfferCardName] = @name, [CityID] = @cityid, [CardImageSrc] = @image
		OUTPUT inserted.JobOfferCardID into #tmp
		WHERE [JobOfferCardID] = @jocid
		

		SET @id = (SELECT TOP 1 [id] FROM #tmp)

		DROP TABLE #tmp

		SELECT @id as 'JobOfferCardID'
	END
END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_update_rfs] 
	@CardID int,
	@token uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

    IF NOT EXISTS (SELECT * FROM JobOfferCards j INNER JOIN Users u on u.[UID] = j.[UID]
					WHERE j.[JobOfferCardID] = @CardID AND u.[AuthToken] = @token /*AND u.[ConcurrencyStamp] >= DATEADD(minute, -30, SYSDATETIME())*/)
	BEGIN
		SELECT 1 as 'AuthFailed'
	END
	ELSE
	BEGIN
		UPDATE Users
		SET ConcurrencyStamp = SYSDATETIME()
		WHERE EXISTS (SELECT * FROM JobOfferCards j WHERE j.[UID] = USers.[UID] AND j.[JobOfferCardID] = @CardID)

		UPDATE [JobOfferCards]
		SET [RFS] = CASE WHEN s.[Savings Component] >= 0 THEN ( i.[income] / ai.[Amount] ) * s.[savings component] ELSE s.[savings component] / ( i.[income] / ai.[Amount] ) END  * 100 
		FROM (
		SELECT j.[JobOfferCardID], SUM(c.[ComponentAmount]) / 12 as 'income' 
		FROM CardComponents c
		INNER JOIN JobOfferCards j on c.[JobOfferCardID] = j.[JobOfferCardID]
		WHERE c.[ComponentTypeID] = 1
		GROUP BY j.[JobOfferCardID]
		) i
		INNER JOIN (
		SELECT j.[JobOfferCardID], a.[Amount] * u.Adults as 'amount'
		FROM JobOfferCards j
		INNER JOIN UserProfiles u on j.[UID] = u.[UID]
		INNER JOIN Averages a on j.[CityID] = a.[CityID] AND a.[ComponentTypeID] = 1
		) ai on i.[JobOfferCardID] = ai.JobOfferCardID
		INNER JOIN (
		SELECT j.[JobOfferCardID], SUM(CASE WHEN c.[ComponentTypeID] = 1 THEN c.[ComponentAmount] / 12 ELSE -1 * c.[ComponentAmount] END)/
			SUM(CASE WHEN c.[ComponentTypeID] = 1 THEN c.[ComponentAmount] / 12 ELSE 0 END) as 'savings component'
		FROM CardComponents c
		INNER JOIN JobOfferCards j on c.[JobOfferCardID] = j.[JobOfferCardID]
		WHERE c.[ComponentTypeID] < 5 AND c.[ComponentTypeID] != 0
		GROUP BY j.[JobOfferCardID]
		) s on s.[JobOfferCardID] = ai.JobOfferCardID
		WHERE i.[JobOfferCardID] = JobOfferCards.[JobOfferCardID] AND i.[JobOfferCardID] = @CardID
	END
END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_update_user_profile]
	@uid uniqueidentifier,
	@adults int,
	@fname varchar(50),
	@lname varchar(50),
	@children int,
	@married varchar(255),
	@token uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

    IF NOT EXISTS (SELECT * FROM Users u WHERE u.[UID] = @uid AND u.[AuthToken] = @token /*AND u.[ConcurrencyStamp] >= DATEADD(minute, -30, SYSDATETIME())*/)
	BEGIN
		SELECT 1 as 'AuthFailed'
	END
	ELSE
	BEGIN
		UPDATE Users
		SET [ConcurrencyStamp] = SYSDATETIME()
		WHERE [UID] = @uid

		UPDATE UserProfiles
		SET [Adults] = @adults, [FirstName] = @fname, [LastName] = @lname, [Children]= @children, [MaritalStatus] = @married
		WHERE [UID] = @uid

		UPDATE [JobOfferCards]
		SET [RFS] = CASE WHEN s.[Savings Component] >= 0 THEN ( i.[income] / ai.[Amount] ) * s.[savings component] ELSE s.[savings component] / ( i.[income] / ai.[Amount] ) END  * 100 
		FROM (
		SELECT j.[JobOfferCardID], SUM(c.[ComponentAmount]) / 12 as 'income' 
		FROM CardComponents c
		INNER JOIN JobOfferCards j on c.[JobOfferCardID] = j.[JobOfferCardID]
		WHERE c.[ComponentTypeID] = 1
		GROUP BY j.[JobOfferCardID]
		) i
		INNER JOIN (
		SELECT j.[JobOfferCardID], a.[Amount] * u.Adults as 'amount'
		FROM JobOfferCards j
		INNER JOIN UserProfiles u on j.[UID] = u.[UID]
		INNER JOIN Averages a on j.[CityID] = a.[CityID] AND a.[ComponentTypeID] = 1
		) ai on i.[JobOfferCardID] = ai.JobOfferCardID
		INNER JOIN (
		SELECT j.[JobOfferCardID], SUM(CASE WHEN c.[ComponentTypeID] = 1 THEN c.[ComponentAmount] / 12 ELSE -1 * c.[ComponentAmount] END)/
			SUM(CASE WHEN c.[ComponentTypeID] = 1 THEN c.[ComponentAmount] / 12 ELSE 0 END) as 'savings component'
		FROM CardComponents c
		INNER JOIN JobOfferCards j on c.[JobOfferCardID] = j.[JobOfferCardID]
		WHERE c.[ComponentTypeID] < 5 AND c.[ComponentTypeID] != 0
		GROUP BY j.[JobOfferCardID]
		) s on s.[JobOfferCardID] = ai.JobOfferCardID
		WHERE i.[JobOfferCardID] = JobOfferCards.[JobOfferCardID] AND JobOfferCards.[UID] = @uid 
	END
END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_validate_user]
	@username varchar(255),
	@password varchar(255)
AS
BEGIN
	SET NOCOUNT ON;

    UPDATE Users
	SET [ConcurrencyStamp] = SYSDATETIME(), [AuthToken] = NEWID()
	OUTPUT inserted.[UID], inserted.[AuthToken]--, inserted.ConcurrencyStamp
	FROM Users
	WHERE [UserName] = @username AND [PasswordHash] = CAST(HashBytes('SHA2_512', [Salt] + @password) as varchar(4000))
END
GO


