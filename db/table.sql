CREATE TABLE FARMINFOTABLE (

    FARM_ID         VARCHAR(20),
    USER_ID         VARCHAR(20)
);

CREATE TABLE USERINFOTABLE (

    USER_ID         VARCHAR(20),
    USER_PW         VARCHAR(100),
    USER_NAME       VARCHAR(20),
    USER_EMAIL      VARCHAR(20),
    USER_PHONE      VARCHAR(20),
    USER_REGISTER   VARCHAR(20),
    USER_AUTHORITY  VARCHAR(20)
);

CREATE TABLE ENVINFOTABLE (

    DATE            VARCHAR(20),
    TIME            VARCHAR(20),
    FARM_ID         VARCHAR(20),
    TEMP            VARCHAR(20),
    HUMID           VARCHAR(20),
    DEWPOINT        VARCHAR(20),
    RAIN            VARCHAR(20),
    FLOW            VARCHAR(20),
    RAIN_GAUGE      VARCHAR(20),
    ACTINO          VARCHAR(20),
    WINDDIR         VARCHAR(20),
    WINDSPEED       VARCHAR(20),
    VOLTAGE         VARCHAR(20),
    CO2             VARCHAR(20),
    EC              VARCHAR(20),
    SOIL_HUM        VARCHAR(20),
    MOTION          VARCHAR(20),
    SMOKE           VARCHAR(20),
    GAS             VARCHAR(20),
    BRIGHT          VARCHAR(20),
    DOOR            VARCHAR(20),
    REMOTE          VARCHAR(20),
    E_CURRENT       VARCHAR(20)
);

CREATE TABLE ENVINFOTABLE (

    DATE            VARCHAR(20),
    TIME            VARCHAR(20),
    FARM_ID         VARCHAR(20),
    TEMP            VARCHAR(20),
    HUMID           VARCHAR(20),
    DEWPOINT        VARCHAR(20),
    RAIN            VARCHAR(20),
    FLOW            VARCHAR(20),
    RAIN_GAUGE      VARCHAR(20),
    ACTINO          VARCHAR(20),
    WINDDIR         VARCHAR(20),
    WINDSPEED       VARCHAR(20),
    VOLTAGE         VARCHAR(20),
    CO2             VARCHAR(20),
    EC              VARCHAR(20),
    SOIL_HUM        VARCHAR(20),
    MOTION          VARCHAR(20),
    SMOKE           VARCHAR(20),
    GAS             VARCHAR(20),
    BRIGHT          VARCHAR(20),
    DOOR            VARCHAR(20),
    REMOTE          VARCHAR(20),
    E_CURRENT       VARCHAR(20)
);

CREATE TABLE SENSORINFOTABLE (

    SENSOR_ID       VARCHAR(20),
    FARM_ID         VARCHAR(20),
    GATEWAY_ID      VARCHAR(20),
    NODE_ID         VARCHAR(20),
    SENSOR_TYPE     VARCHAR(20),
    SENSOR_USED     VARCHAR(20),
    SENSOR_PLACE    VARCHAR(20)
);

CREATE TABLE ACTUATORINFOTABLE (

    ACTUATOR_ID     VARCHAR(20),
    FARM_ID         VARCHAR(20),
    GATEWAY_ID      VARCHAR(20),
    NODE_ID         VARCHAR(20),
    ACTUATOR_TYPE   VARCHAR(20),
    ACTUATOR_USED   VARCHAR(20),
    ACTUATOR_PLACE  VARCHAR(20)
);

CREATE TABLE DEVINFOTABLE (

    DEV_ID          INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FARM_ID         VARCHAR(20),
    DEV_TYPE        VARCHAR(20),
    DEV_NAME        VARCHAR(20),
    DEV_MAKER       VARCHAR(20)
);


CREATE TABLE GATEWAYINFOTABLE (

    GATEWAY_ID      VARCHAR(20),
    FARM_ID         VARCHAR(20), 
    GATEWAY_HOST    VARCHAR(20),
    GATEWAY_PORT    VARCHAR(20),
    GATEWAY_USED    VARCHAR(20),
    GATEWAY_DEVCNT  VARCHAR(20),
    GATEWAY_NODECNT VARCHAR(20)
);

CREATE TABLE NODEINFOTABLE (

    NODE_ID         VARCHAR(20),
    GATEWAY_ID      VARCHAR(20), 
    DEV1_ID         VARCHAR(20),
    DEV2_ID         VARCHAR(20),
    DEV3_ID         VARCHAR(20),
    NODE_DEVCNT     VARCHAR(20),
    NODE_USED       VARCHAR(20),
    NODE_PLACE      VARCHAR(20)
);


CREATE TABLE CROPINFOTABLE (

    FARM_ID         VARCHAR(20),  
    CROP_TYPE       VARCHAR(20)

);

-- CREATE TABLE SECTORINFOTABLE (

--     SECTOR_ID       VARCHAR(20),
--     CROP_ID         VARCHAR(20)

-- );

CREATE TABLE GROWTHINFOTABLE (

    INDEX               INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    DATE                VARCHAR(20),
    TIME                VARCHAR(20),
    FARM_ID             VARCHAR(20),
    CROP_TYPE           VARCHAR(20), 
    SECTOR_ID           VARCHAR(20),
    CROP_LEAF_LONG      VARCHAR(20),
    CROP_LEAF_CNT       VARCHAR(20),
    CROP_FRUIT_WEIGTH   VARCHAR(20),
    CROP_FRUIT_WIDTH    VARCHAR(20),
    CROP_FRUIT_HEIGHT   VARCHAR(20),
    CROP_FRUIT_SUGAR    VARCHAR(20),
    CROP_FRUIT_ACID     VARCHAR(20)
);
