# VARUNETRA - System Architecture

## Overview

VARUNETRA is an intelligent water monitoring and flood early warning platform that combines IoT sensors, community participation, geospatial visualization, and analytics.

The system collects environmental data from sensors deployed in the field and combines it with user-generated reports to provide water resource monitoring, flood risk assessment, and alert generation.

---

## System Components

### Sensor Layer

* Water Level Sensors
* Rainfall Sensors
* Flow Sensors
* ESP32 Microcontroller

### Cloud Layer

* ThingSpeak Platform
* Sensor data storage and transmission

### Backend Layer

* Flask REST API
* Authentication and Authorization
* Alert Management
* Data Processing
* Analytics Services

### Database Layer

* Microsoft SQL Server
* User Management
* Water Resource Records
* Alerts and Reports
* Historical Sensor Data

### Frontend Layer

* Interactive Dashboard
* Map Visualization
* Resource Management
* Reports and Alerts

---

## User Roles

### Member

* Register and login
* View water resources
* Submit reports
* Add water sources
* View alerts

### Admin

* Manage users
* Manage water resources
* Manage reports
* Configure alerts
* Access analytics

---

## Data Flow

### Community Data Flow

Member
→ Frontend Dashboard
→ Flask Backend
→ SQL Server

### Sensor Data Flow

Sensors
→ ESP32
→ ThingSpeak
→ Flask Backend
→ SQL Server

### Alert Generation Flow

ThingSpeak Data + User Reports
→ Alert Engine
→ Alerts Table
→ Frontend Dashboard

---

## Team Responsibility Split

### Teammate

* Sensor Integration
* ESP32 Programming
* ThingSpeak Data Upload

### My Responsibility

* Flask Backend
* SQL Server Database
* Frontend Dashboard
* Authentication
* Alerts
* Analytics
* Maps
