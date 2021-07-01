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

    FARM_ID             INT NOT NULL PRIMARY KEY,
    USER_ID             VARCHAR(20) REFERENCES USERINFOTABLE(USER_ID)
);


CREATE TABLE ENVINFOTABLE (

    DATE                VARCHAR(8),
    TIME                VARCHAR(6),
    FARM_ID             INT,
    TEMP                INT,
    HUMID               INT,
    DEWPOINT            INT,
    RAIN                INT,
    FLOW                INT,
    RAIN_GAUGE          INT,
    ACTINO              INT,
    WINDDIR             INT,
    WINDSPEED           INT,
    VOLTAGE             INT,
    CO2                 INT,
    EC                  INT,
    PH                  INT,
    SOIL_HUM            INT,
    MOTION              INT,
    SMOKE               INT,
    GAS                 INT,
    BRIGHT              INT,
    DOOR                INT,
    REMOTE              INT,
    E_CURRENT           INT
);

CREATE TABLE SENSORINFOTABLE (

    SENSOR_ID           INT NOT NULL PRIMARY KEY,
    FARM_ID             INT REFERENCES FARMINFOTABLE(FARM_ID),
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
    FARM_ID             INT REFERENCES FARMINFOTABLE(FARM_ID),
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
    FARM_ID             INT REFERENCES FARMINFOTABLE(FARM_ID),
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
    FARM_ID             INT REFERENCES FARMINFOTABLE(FARM_ID),
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
    FARM_ID             INT REFERENCES FARMINFOTABLE(FARM_ID),
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

    FARM_ID             INT REFERENCES FARMINFOTABLE(FARM_ID),  
    CROP_TYPE           INT DEFAULT -1

);


CREATE TABLE SECTORINFOTABLE (

    SECTOR_ID           INT NOT NULL PRIMARY KEY,
    FARM_ID             INT REFERENCES FARMINFOTABLE(FARM_ID)
);

CREATE TABLE GROWTHINFOTABLE (

    IDX                 INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    DATE                VARCHAR(8),
    TIME                VARCHAR(6),
    FARM_ID             INT REFERENCES FARMINFOTABLE(FARM_ID),
    CROP_TYPE           INT, 
    SECTOR_ID           INT REFERENCES SECTORINFOTABLE(SECTOR_ID),
    CROP_LEAF_LONG      VARCHAR(20),
    CROP_LEAF_CNT       VARCHAR(20),
    CROP_FRUIT_WEIGTH   VARCHAR(20),
    CROP_FRUIT_WIDTH    VARCHAR(20),
    CROP_FRUIT_HEIGHT   VARCHAR(20),
    CROP_FRUIT_SUGAR    VARCHAR(20),
    CROP_FRUIT_ACID     VARCHAR(20)
);

