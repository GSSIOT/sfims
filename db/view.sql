CREATE VIEW ENVDAYAVG AS 
SELECT 
    FARM_ID,
    DATE,
    ROUND(AVG(TEMP),2)       AS TEMP,
    ROUND(AVG(HUMID),2)      AS HUMID,
    ROUND(AVG(DEWPOINT),2)   AS DEWPOINT,
    ROUND(AVG(FLOW),2)       AS FLOW,
    ROUND(AVG(RAIN_GAUGE),2) AS RAIN_GAUGE,
    ROUND(AVG(ACTINO),2)     AS ACTINO,
    ROUND(AVG(WINDDIR),2)    AS WINDDIR,
    ROUND(AVG(WINDSPEED),2)  AS WINDSPEED,
    ROUND(AVG(VOLTAGE),2)    AS VOLTAGE,
    ROUND(AVG(CO2),2)        AS CO2,
    ROUND(AVG(EC),2)         AS EC,
    ROUND(AVG(SOIL_HUM),2)   AS SOIL_HUM,
    ROUND(AVG(SMOKE),2)      AS SMOKE,
    ROUND(AVG(GAS),2)        AS GAS,
    ROUND(AVG(BRIGHT),2)     AS BRIGHT,
    ROUND(AVG(E_CURRENT),2)  AS E_CURRENT
FROM ENVINFOTABLE GROUP BY DATE;



CREATE VIEW ENVHOURAVG AS 
SELECT 
    FARM_ID,
    DATE,
    LEFT(TIME, 2)            AS TIME,
    ROUND(AVG(TEMP),2)       AS TEMP,
    ROUND(AVG(HUMID),2)      AS HUMID,
    ROUND(AVG(DEWPOINT),2)   AS DEWPOINT,
    ROUND(AVG(FLOW),2)       AS FLOW,
    ROUND(AVG(RAIN_GAUGE),2) AS RAIN_GAUGE,
    ROUND(AVG(ACTINO),2)     AS ACTINO,
    ROUND(AVG(WINDDIR),2)    AS WINDDIR,
    ROUND(AVG(WINDSPEED),2)  AS WINDSPEED,
    ROUND(AVG(VOLTAGE),2)    AS VOLTAGE,
    ROUND(AVG(CO2),2)        AS CO2,
    ROUND(AVG(EC),2)         AS EC,
    ROUND(AVG(SOIL_HUM),2)   AS SOIL_HUM,
    ROUND(AVG(SMOKE),2)      AS SMOKE,
    ROUND(AVG(GAS),2)        AS GAS,
    ROUND(AVG(BRIGHT),2)     AS BRIGHT,
    ROUND(AVG(E_CURRENT),2)  AS E_CURRENT
FROM ENVINFOTABLE GROUP BY FARM_ID, DATE, LEFT(TIME, 2);
