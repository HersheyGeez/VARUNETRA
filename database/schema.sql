/*
=========================================================
VARUNETRA - Database Schema
Database: Microsoft SQL Server
Version: 1.0
=========================================================
*/

-- =====================================================
-- ROLES
-- =====================================================

CREATE TABLE roles (
    role_id INT IDENTITY(1,1) PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- =====================================================
-- USERS
-- =====================================================

CREATE TABLE users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,

    role_id INT NOT NULL,

    username VARCHAR(50) NOT NULL UNIQUE,

    email VARCHAR(255) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    first_name VARCHAR(100),

    last_name VARCHAR(100),

    phone_number VARCHAR(20),

    profile_image_url VARCHAR(500),

    email_verified BIT DEFAULT 0,

    status VARCHAR(50) DEFAULT 'Active',

    created_at DATETIME2 DEFAULT GETDATE(),

    updated_at DATETIME2 DEFAULT GETDATE(),

    FOREIGN KEY (role_id)
        REFERENCES roles(role_id)
);

-- =====================================================
-- WATER SOURCES
-- =====================================================

CREATE TABLE water_sources (
    water_source_id INT IDENTITY(1,1) PRIMARY KEY,

    created_by INT NOT NULL,

    name VARCHAR(150) NOT NULL,

    type VARCHAR(50) NOT NULL,

    latitude DECIMAL(10,8) NOT NULL,

    longitude DECIMAL(11,8) NOT NULL,

    capacity_liters DECIMAL(18,2),

    description NVARCHAR(MAX),

    status VARCHAR(50) DEFAULT 'Active',

    created_at DATETIME2 DEFAULT GETDATE(),

    updated_at DATETIME2 DEFAULT GETDATE(),

    FOREIGN KEY (created_by)
        REFERENCES users(user_id)
);

-- =====================================================
-- WATER SOURCE IMAGES
-- =====================================================

CREATE TABLE water_source_images (
    image_id INT IDENTITY(1,1) PRIMARY KEY,

    water_source_id INT NOT NULL,

    uploaded_by INT NOT NULL,

    image_url VARCHAR(500) NOT NULL,

    uploaded_at DATETIME2 DEFAULT GETDATE(),

    FOREIGN KEY (water_source_id)
        REFERENCES water_sources(water_source_id),

    FOREIGN KEY (uploaded_by)
        REFERENCES users(user_id)
);

-- =====================================================
-- SENSOR NODES
-- =====================================================

CREATE TABLE sensor_nodes (
    sensor_node_id INT IDENTITY(1,1) PRIMARY KEY,

    water_source_id INT NOT NULL,

    node_name VARCHAR(150) NOT NULL,

    thingspeak_channel_id VARCHAR(100),

    status VARCHAR(50) DEFAULT 'Active',

    installed_at DATETIME2,

    last_seen DATETIME2,

    created_at DATETIME2 DEFAULT GETDATE(),

    updated_at DATETIME2 DEFAULT GETDATE(),

    FOREIGN KEY (water_source_id)
        REFERENCES water_sources(water_source_id)
);

-- =====================================================
-- SENSOR READINGS
-- =====================================================

CREATE TABLE sensor_readings (
    reading_id INT IDENTITY(1,1) PRIMARY KEY,

    sensor_node_id INT NOT NULL,

    water_level DECIMAL(10,2),

    rainfall DECIMAL(10,2),

    flow_rate DECIMAL(10,2),

    battery_level DECIMAL(5,2),

    source VARCHAR(50) DEFAULT 'ThingSpeak',

    recorded_at DATETIME2 NOT NULL,

    FOREIGN KEY (sensor_node_id)
        REFERENCES sensor_nodes(sensor_node_id)
);

-- =====================================================
-- REPORTS
-- =====================================================

CREATE TABLE reports (
    report_id INT IDENTITY(1,1) PRIMARY KEY,

    user_id INT NOT NULL,

    water_source_id INT NULL,

    latitude DECIMAL(10,8) NOT NULL,

    longitude DECIMAL(11,8) NOT NULL,

    report_type VARCHAR(50) NOT NULL,

    title NVARCHAR(MAX) NOT NULL,

    description NVARCHAR(MAX) NOT NULL,

    severity VARCHAR(20) DEFAULT 'Medium',

    status VARCHAR(50) DEFAULT 'Pending',

    verified_by INT NULL,

    verified_at DATETIME2 NULL,

    created_at DATETIME2 DEFAULT GETDATE(),

    updated_at DATETIME2 DEFAULT GETDATE(),

    FOREIGN KEY (user_id)
        REFERENCES users(user_id),

    FOREIGN KEY (water_source_id)
        REFERENCES water_sources(water_source_id),

    FOREIGN KEY (verified_by)
        REFERENCES users(user_id)
);

-- =====================================================
-- REPORT IMAGES
-- =====================================================

CREATE TABLE report_images (
    image_id INT IDENTITY(1,1) PRIMARY KEY,

    report_id INT NOT NULL,

    uploaded_by INT NOT NULL,

    image_url VARCHAR(500) NOT NULL,

    uploaded_at DATETIME2 DEFAULT GETDATE(),

    FOREIGN KEY (report_id)
        REFERENCES reports(report_id),

    FOREIGN KEY (uploaded_by)
        REFERENCES users(user_id)
);

-- =====================================================
-- DANGER ZONES
-- =====================================================

CREATE TABLE danger_zones (
    danger_zone_id INT IDENTITY(1,1) PRIMARY KEY,

    zone_name VARCHAR(150) NOT NULL,

    latitude DECIMAL(10,8) NOT NULL,

    longitude DECIMAL(11,8) NOT NULL,

    radius_meters DECIMAL(10,2) NOT NULL,

    risk_level VARCHAR(20) NOT NULL,

    description NVARCHAR(MAX),

    created_by INT NOT NULL,

    created_at DATETIME2 DEFAULT GETDATE(),

    updated_at DATETIME2 DEFAULT GETDATE(),

    FOREIGN KEY (created_by)
        REFERENCES users(user_id)
);

-- =====================================================
-- ALERTS
-- =====================================================

CREATE TABLE alerts (
    alert_id INT IDENTITY(1,1) PRIMARY KEY,

    alert_type VARCHAR(50) NOT NULL,

    severity VARCHAR(20) NOT NULL,

    title NVARCHAR(MAX) NOT NULL,

    description NVARCHAR(MAX) NOT NULL,

    water_source_id INT NULL,

    danger_zone_id INT NULL,

    generated_by VARCHAR(50) DEFAULT 'System',

    is_active BIT DEFAULT 1,

    created_at DATETIME2 DEFAULT GETDATE(),

    expires_at DATETIME2 NULL,

    FOREIGN KEY (water_source_id)
        REFERENCES water_sources(water_source_id),

    FOREIGN KEY (danger_zone_id)
        REFERENCES danger_zones(danger_zone_id)
);

