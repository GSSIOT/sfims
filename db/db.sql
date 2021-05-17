CREATE TABLE FARMINFOTABLE (

    FARM_ID         VARCHAR(20),
    USER_ID         VARCHAR(20)
);

CREATE TABLE USERINFOTABLE (

    USER_ID         VARCHAR(20),
    USER_PW         VARCHAR(20),
    USER_NAME       VARCHAR(20),
    USER_AGE        VARCHAR(20),
    USER_SEX        VARCHAR(20),
    USER_EMAIL      VARCHAR(20),
    USER_PHONE      VARCHAR(20),
    USER_ADDRESS    VARCHAR(20),
    USER_REGISTER   VARCHAR(20),
    USER_AUTHORITY  VARCHAR(20),
);

CREATE TABLE ENVINFOTABLE (

    FARM_ID         VARCHAR(20),
    DATE            VARCHAR(20),
    TIME            VARCHAR(20),
    IN_TEMP         VARCHAR(20),
    IN_HUMI         VARCHAR(20),
    CO2             VARCHAR(20),
    LIGHT           VARCHAR(20),
    SOLAR           VARCHAR(20),
    LANDTEMP        VARCHAR(20),
    LANDHUMI        VARCHAR(20),
    LANDEC          VARCHAR(20),
    LANDPH          VARCHAR(20),
    WINDSPEED       VARCHAR(20),
    WINDDIR         VARCHAR(20),
    WEATHER         VARCHAR(20),
    OUT_TEMP        VARCHAR(20),
    OUT_HUMI        VARCHAR(20),
    RAINFALL        VARCHAR(20),
    WATERVOL        VARCHAR(20),
    MOISTURE        VARCHAR(20),
    HYDROVOL        VARCHAR(20),
    HYDROCNT        VARCHAR(20),
    HYDROPH         VARCHAR(20),
    HYDROEC         VARCHAR(20),
    HYDROPOWER      VARCHAR(20)
    
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

