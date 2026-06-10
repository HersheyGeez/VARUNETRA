function renderDashboard() {

    document.getElementById("app").innerHTML = `

        <div class="layout">

            <div
                id="cursor-glow"
                class="cursor-glow"
            ></div>

            <header class="header">

                <div class="brand">

                    <div class="brand-logo">
                        🌊
                    </div>

                    <div>

                        <h1>
                            VARUNETRA
                        </h1>

                        <span>
                            Water Resource Monitoring System
                        </span>

                    </div>

                </div>

                <button
                    id="logout-btn"
                    class="logout-btn"
                >
                    Logout
                </button>

            </header>

            <div class="body">

                <aside class="sidebar">

                    <button
                        id="nav-dashboard"
                        class="nav-btn active"
                    >
                        🏠 Dashboard
                    </button>

                    <button
                        id="nav-water-sources"
                        class="nav-btn"
                    >
                        💧 Water Sources
                    </button>

                    <button class="nav-btn">
                        📋 Reports
                    </button>

                    <button class="nav-btn">
                        ⚠ Danger Zones
                    </button>

                    <button class="nav-btn">
                        🚨 Alerts
                    </button>

                </aside>

                <main 
                    class="content"
                    id="main-content"
                >

                    <div class="hero-banner">

                        <h1>
                            Water Resource Monitoring Dashboard
                        </h1>

                        <p>
                            Monitor water resources, community reports,
                            danger zones and emergency alerts from a
                            centralized platform.
                        </p>

                    </div>

                    <div class="stats-grid">

                        <div class="stat-card">

                            <div class="stat-icon">
                                💧
                            </div>

                            <h3 id="water-count">
                                0
                            </h3>

                            <p>
                                Water Sources
                            </p>

                            <span>
                                Registered Resources
                            </span>

                        </div>

                        <div class="stat-card">

                            <div class="stat-icon">
                                📋
                            </div>

                            <h3 id="report-count">
                                0
                            </h3>

                            <p>
                                Reports
                            </p>

                            <span>
                                Community Reports
                            </span>

                        </div>

                        <div class="stat-card">

                            <div class="stat-icon">
                                ⚠
                            </div>

                            <h3 id="danger-count">
                                0
                            </h3>

                            <p>
                                Danger Zones
                            </p>

                            <span>
                                High Risk Areas
                            </span>

                        </div>

                        <div class="stat-card">

                            <div class="stat-icon">
                                🚨
                            </div>

                            <h3 id="alert-count">
                                0
                            </h3>

                            <p>
                                Alerts
                            </p>

                            <span>
                                Active Notifications
                            </span>

                        </div>

                    </div>

                    <div class="map-container">

                    <div class="map-legend">

                        <div>
                            💧 Water Source
                        </div>

                        <div>
                            📋 Report
                        </div>

                        <div>
                            ⚠ Danger Zone
                        </div>

                        <div>
                            🚨 Alert
                        </div>

                    </div>

                        <div id="dashboard-map"></div>

                    </div>

                </main>

            </div>

        </div>

    `;

    document
        .getElementById("logout-btn")
        .addEventListener(
            "click",
            logout
        );
    
    loadDashboardStats();
    loadDashboardMap();

    const glow =
        document.getElementById(
            "cursor-glow"
        );

    document.addEventListener(
        "mousemove",
        (e) => {

            glow.style.left =
                e.clientX + "px";

            glow.style.top =
                e.clientY + "px";
        }
    );

    document
        .getElementById(
            "nav-water-sources"
        )
        .addEventListener(
            "click",
            renderWaterSourcesPage
        );

    document
        .getElementById(
            "nav-dashboard"
        )
        .addEventListener(
            "click",
            () => {

                renderDashboard();
            }
        );


}

