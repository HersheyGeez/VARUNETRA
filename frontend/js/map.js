let dashboardMap;

async function loadDashboardMap() {

    const waterSources =
        await apiRequest(
            "/water-sources"
        );

    const reports =
        await apiRequest(
            "/reports"
        );

    const dangerZones =
        await apiRequest(
            "/danger-zones"
        );

    const alerts =
        await apiRequest(
            "/alerts"
        );

    dashboardMap =
        L.map(
            "dashboard-map"
        ).setView(
            [28.6139, 77.2090],
            11
        );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                "© OpenStreetMap"
        }
    ).addTo(
        dashboardMap
    );

    // WATER SOURCES

    waterSources.forEach(
        source => {

            L.marker([
                source.latitude,
                source.longitude
            ])
            .addTo(
                dashboardMap
            )
            .bindPopup(`
                <b>💧 Water Source</b>
                <br>
                ${source.name}
                <br>
                ${source.type}
            `);
        }
    );

    // REPORTS

    reports.forEach(
        report => {

            L.circleMarker(
                [
                    report.latitude,
                    report.longitude
                ],
                {
                    radius: 8,
                    color: "orange",
                    fillColor: "orange",
                    fillOpacity: 0.8
                }
            )
            .addTo(
                dashboardMap
            )
            .bindPopup(`
                <b>📋 Report</b>
                <br>
                ${report.title}
                <br>
                Severity:
                ${report.severity}
            `);
        }
    );

    // DANGER ZONES

    dangerZones.forEach(
        zone => {

            L.circle(
                [
                    zone.latitude,
                    zone.longitude
                ],
                {
                    radius:
                        zone.radius_meters,

                    color: "red",

                    fillColor: "red",

                    fillOpacity: 0.15
                }
            )
            .addTo(
                dashboardMap
            )
            .bindPopup(`
                <b>⚠ Danger Zone</b>
                <br>
                ${zone.zone_name}
                <br>
                Risk:
                ${zone.risk_level}
            `);
        }
    );

    // ALERTS

    alerts.forEach(
        alert => {

            if (
                dangerZones.length > 0
            ) {

                const zone =
                    dangerZones[0];

                L.circleMarker(
                    [
                        zone.latitude,
                        zone.longitude
                    ],
                    {
                        radius: 10,
                        color: "#dc2626",
                        fillColor: "#dc2626",
                        fillOpacity: 1
                    }
                )
                .addTo(
                    dashboardMap
                )
                .bindPopup(`
                    <b>🚨 Alert</b>
                    <br>
                    ${alert.title}
                    <br>
                    Severity:
                    ${alert.severity}
                `);
            }
        }
    );
}