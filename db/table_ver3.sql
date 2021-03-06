CREATE TABLE USERINFOTABLE (

    USER_ID             VARCHAR(20) NOT NULL PRIMARY KEY,
    USER_PW             VARCHAR(100),
    USER_NAME           VARCHAR(10),
    USER_EMAIL          VARCHAR(50),
    USER_PHONE          VARCHAR(15),
    USER_REGISTER       VARCHAR(8),
    USER_AUTHORITY      VARCHAR(10)
);

CREATE TABLE FARMINFOTABLE (

    FARM_ID             INT,
    USER_ID             VARCHAR(20) REFERENCES USERINFOTABLE(USER_ID)
);


CREATE TABLE ENVINFOTABLE (

    FARM_ID             INT,
    DATE                VARCHAR(8),
    TIME                VARCHAR(6),
    TEMP                VARCHAR(8),
    HUMID               VARCHAR(8),
    DEWPOINT            VARCHAR(8),
    RAIN                VARCHAR(8),
    FLOW                VARCHAR(8),
    RAIN_GAUGE          VARCHAR(8),
    ACTINO              VARCHAR(8),
    WINDSPEED           VARCHAR(8),
    WINDDIR             VARCHAR(8),
    VOLTAGE             VARCHAR(8),
    CO2                 VARCHAR(8),
    EC                  VARCHAR(8),
    QUANTUM             VARCHAR(8),
    SOIL_HUM            VARCHAR(8),
    SOIL_TENS           VARCHAR(8),
    PH                  VARCHAR(8),
    SOIL_TEMP           VARCHAR(8),
    WEIGHT              VARCHAR(8),
    REMOTE              VARCHAR(8),
    MOTION              VARCHAR(8),
    SMOKE               VARCHAR(8),
    E_CURRENT           VARCHAR(8),
    GAS                 VARCHAR(8),
    BRIGHT              VARCHAR(8),
    DOOR                VARCHAR(8)
);

CREATE TABLE SENSORINFOTABLE (

    SENSOR_ID           INT NOT NULL PRIMARY KEY,
    FARM_ID             INT,
    GATEWAY_ID          INT,
    NODE_ID             INT,
    SENSOR_TYPE         INT DEFAULT -1,
    SENSOR_USED         VARCHAR(3)  DEFAULT 'OFF',
    SENSOR_PLACE        VARCHAR(20) DEFAULT 'NONE',
    SENSOR_NAME         VARCHAR(20) DEFAULT 'NONE',
    SENSOR_MAKER        VARCHAR(20) DEFAULT 'NONE'
);

CREATE TABLE ACTUATORINFOTABLE (

    ACTUATOR_ID         INT NOT NULL PRIMARY KEY,
    FARM_ID             INT,
    GATEWAY_ID          INT,
    NODE_ID             INT,
    ACTUATOR_TYPE       INT DEFAULT -1,
    ACTUATOR_USED       VARCHAR(3)  DEFAULT 'OFF',
    ACTUATOR_PLACE      VARCHAR(20) DEFAULT 'NONE',
    ACTUATOR_NAME       VARCHAR(20) DEFAULT 'NONE',
    ACTUATOR_MAKER      VARCHAR(20) DEFAULT 'NONE'
);

CREATE TABLE CCTVINFOTABLE (

    CCTV_ID             INT NOT NULL PRIMARY KEY,
    FARM_ID             INT,
    GATEWAY_ID          INT,
    NODE_ID             INT,
    CCTV_TYPE           INT DEFAULT -1,
    CCTV_USED           VARCHAR(3)  DEFAULT 'OFF',
    CCTV_PLACE          VARCHAR(20) DEFAULT 'NONE',
    CCTV_NAME           VARCHAR(20) DEFAULT 'NONE',
    CCTV_MAKER          VARCHAR(20) DEFAULT 'NONE'
);

CREATE TABLE GATEWAYINFOTABLE (

    GATEWAY_ID          INT NOT NULL PRIMARY KEY,
    FARM_ID             INT,
    GATEWAY_HOST        VARCHAR(15),
    GATEWAY_PORT        INT,
    GATEWAY_USED        VARCHAR(3)  DEFAULT 'OFF',
    GATEWAY_DEVCNT      INT DEFAULT 0,
    GATEWAY_NODECNT     INT DEFAULT 0,
    GATEWAY_PLACE       VARCHAR(30) DEFAULT 'NONE',
    GATEWAY_NAME        VARCHAR(20) DEFAULT 'NONE',
    GATEWAY_MAKER       VARCHAR(20) DEFAULT 'NONE'
);


CREATE TABLE NODEINFOTABLE (

    NODE_ID             INT NOT NULL PRIMARY KEY,
    FARM_ID             INT,
    GATEWAY_ID          INT REFERENCES GATEWAYINFOTABLE(GATEWAY_ID),
    DEV1_ID             INT DEFAULT -1,
    DEV2_ID             INT DEFAULT -1,
    DEV3_ID             INT DEFAULT -1,
    NODE_USED           VARCHAR(3)  DEFAULT 'OFF',
    NODE_DEVCNT         INT DEFAULT 0,
    NODE_PLACE          VARCHAR(30) DEFAULT 'NONE',
    NODE_NAME           VARCHAR(20) DEFAULT 'NONE',
    NODE_MAKER          VARCHAR(20) DEFAULT 'NONE'
);


CREATE TABLE CROPINFOTABLE (

    FARM_ID             INT,  
    CROP_TYPE           VARCHAR(20) DEFAULT -1

);


CREATE TABLE SECTORINFOTABLE (

    SECTOR_ID           VARCHAR(20),
    FARM_ID             INT
);

CREATE TABLE GROWTHINFOTABLE (

    IDX                 INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    DATE                VARCHAR(8),
    TIME                VARCHAR(6),
    FARM_ID             INT,
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


CREATE TABLE DEVINFOTABLE (

    DEV_ID          INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FARM_ID         VARCHAR(20),
    DEV_TYPE        VARCHAR(20),
    DEV_NAME        VARCHAR(20),
    DEV_MAKER       VARCHAR(20)
);


