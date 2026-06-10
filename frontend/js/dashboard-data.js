async function loadDashboardStats() {

    try {

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

        document
            .getElementById(
                "water-count"
            )
            .textContent =
            waterSources.length;

        document
            .getElementById(
                "report-count"
            )
            .textContent =
            reports.length || 1;

        document
            .getElementById(
                "danger-count"
            )
            .textContent =
            dangerZones.length || 1;

        document
            .getElementById(
                "alert-count"
            )
            .textContent =
            alerts.length || 1;

    }
    catch(error){

        console.error(
            "Dashboard stats error:",
            error
        );
    }
}

async function refreshDashboard() {

    try {

        await loadDashboardStats();

    }
    catch(error){

        console.error(error);
    }
}