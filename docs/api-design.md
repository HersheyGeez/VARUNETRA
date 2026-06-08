# VARUNETRA - API Design

## Overview

The VARUNETRA backend exposes RESTful APIs that allow users, administrators, and system services to interact with the platform.

All APIs communicate using JSON.

Base URL:

/api/v1

---

# Authentication APIs

## Register User

POST /auth/register

Purpose:
Create a new member account.

---

## Login User

POST /auth/login

Purpose:
Authenticate user and generate access token.

---

## Logout User

POST /auth/logout

Purpose:
Terminate active session.

---

## Get Current User

GET /auth/me

Purpose:
Retrieve authenticated user information.

---

# User Management APIs

## Get All Users

GET /users

Access:
Admin

Purpose:
Retrieve all registered users.

---

## Get User By ID

GET /users/{id}

Access:
Admin

Purpose:
Retrieve specific user details.

---

## Update User

PUT /users/{id}

Access:
Admin or Owner

Purpose:
Update user information.

---

## Delete User

DELETE /users/{id}

Access:
Admin

Purpose:
Remove user account.

---

# Water Source APIs

## Get All Water Sources

GET /water-sources

Purpose:
Retrieve all mapped water sources.

---

## Get Water Source By ID

GET /water-sources/{id}

Purpose:
Retrieve detailed water source information.

---

## Create Water Source

POST /water-sources

Access:
Authenticated Member

Purpose:
Add a new water source.

---

## Update Water Source

PUT /water-sources/{id}

Access:
Admin or Owner

Purpose:
Modify water source information.

---

## Delete Water Source

DELETE /water-sources/{id}

Access:
Admin

Purpose:
Remove a water source.

---

# Water Source Image APIs

## Upload Image

POST /water-sources/{id}/images

Purpose:
Upload image for a water source.

---

## Get Images

GET /water-sources/{id}/images

Purpose:
Retrieve water source images.

---

# Report APIs

## Create Report

POST /reports

Purpose:
Submit a community report.

---

## Get All Reports

GET /reports

Purpose:
Retrieve reports.

---

## Get Report By ID

GET /reports/{id}

Purpose:
Retrieve report details.

---

## Verify Report

PATCH /reports/{id}/verify

Access:
Admin

Purpose:
Mark report as verified.

---

## Resolve Report

PATCH /reports/{id}/resolve

Access:
Admin

Purpose:
Mark report as resolved.

---

# Report Image APIs

## Upload Report Image

POST /reports/{id}/images

Purpose:
Attach evidence images.

---

## Get Report Images

GET /reports/{id}/images

Purpose:
Retrieve report images.

---

# Sensor APIs

## Get Sensor Nodes

GET /sensor-nodes

Purpose:
Retrieve deployed sensor nodes.

---

## Get Sensor Node By ID

GET /sensor-nodes/{id}

Purpose:
Retrieve node details.

---

## Create Sensor Node

POST /sensor-nodes

Access:
Admin

Purpose:
Register new sensor node.

---

## Update Sensor Node

PUT /sensor-nodes/{id}

Access:
Admin

Purpose:
Update sensor node metadata.

---

# Sensor Reading APIs

## Get Readings

GET /sensor-readings

Purpose:
Retrieve sensor measurements.

---

## Get Readings For Node

GET /sensor-nodes/{id}/readings

Purpose:
Retrieve measurements for a specific node.

---

## Sync ThingSpeak Data

POST /sensor-readings/sync

Access:
Admin/System

Purpose:
Fetch latest data from ThingSpeak.

---

# Danger Zone APIs

## Get All Danger Zones

GET /danger-zones

Purpose:
Retrieve all danger zones.

---

## Create Danger Zone

POST /danger-zones

Access:
Admin

Purpose:
Create danger zone.

---

## Update Danger Zone

PUT /danger-zones/{id}

Access:
Admin

Purpose:
Modify danger zone.

---

## Delete Danger Zone

DELETE /danger-zones/{id}

Access:
Admin

Purpose:
Remove danger zone.

---

# Alert APIs

## Get Active Alerts

GET /alerts

Purpose:
Retrieve active alerts.

---

## Get Alert By ID

GET /alerts/{id}

Purpose:
Retrieve alert details.

---

## Create Alert

POST /alerts

Access:
Admin

Purpose:
Create alert manually.

---

## Deactivate Alert

PATCH /alerts/{id}/deactivate

Access:
Admin

Purpose:
Disable active alert.

---

# Analytics APIs

## Dashboard Statistics

GET /analytics/dashboard

Purpose:
Retrieve dashboard metrics.

---

## Water Source Statistics

GET /analytics/water-sources

Purpose:
Retrieve water source analytics.

---

## Sensor Statistics

GET /analytics/sensors

Purpose:
Retrieve sensor analytics.

---

## Alert Statistics

GET /analytics/alerts

Purpose:
Retrieve alert analytics.
