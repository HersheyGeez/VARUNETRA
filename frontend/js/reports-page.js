let reportMap;

let selectedLatitude =
    null;

let selectedLongitude =
    null;

let reportMarker =
    null;


async function renderReportsPage() {

    const mainContent =
        document.getElementById(
            "main-content"
        );

    mainContent.innerHTML = `

        <div class="page-header">

            <h1>
                Reports
            </h1>

            <button
                id="add-report-btn"
                class="primary-btn"
            >
                + Add Report
            </button>

        </div>

        <div
            id="reports-table"
        >
            Loading...
        </div>

    `;

    await loadReportsTable();

    document
        .getElementById(
            "add-report-btn"
        )
        .addEventListener(
            "click",
            showReportForm
        );
}

async function loadReportsTable() {

    try {

        const reports =
            await apiRequest(
                "/reports"
            );

        const container =
            document.getElementById(
                "reports-table"
            );

        let html = `

            <table class="data-table">

                <thead>

                    <tr>

                        <th>Title</th>

                        <th>Type</th>

                        <th>Severity</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>
        `;

        reports.forEach(
            report => {

                html += `

                    <tr>

                        <td>
                            ${report.title}
                        </td>

                        <td>
                            ${report.report_type}
                        </td>

                        <td>
                            ${report.severity}
                        </td>

                        <td>
                            ${report.status}
                        </td>

                        <td>

                            ${
                                report.status === "Verified"

                                ? `
                                    <span class="verified-badge">
                                        ✓ Verified
                                    </span>
                                `

                                : `
                                    <button
                                        class="verify-report-btn"
                                        data-id="${report.report_id}"
                                    >
                                        Verify
                                    </button>
                                `
                            }

                        </td>

                    </tr>
                `;
            }
        );

        html += `

                </tbody>

            </table>
        `;

        container.innerHTML =
            html;
        
        document
            .querySelectorAll(
                ".verify-report-btn"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        verifyReport(
                            button.dataset.id
                        );
                    }
                );

    });
    }
    catch(error){

        console.error(error);
    }
}

function showReportForm() {

    selectedLatitude = null;
    selectedLongitude = null;
    reportMarker = null;

    const modal =
        document.createElement(
            "div"
        );

    modal.className =
        "modal-overlay";

    modal.innerHTML = `

        <div class="modal report-modal">

            <h2>
                Add Report
            </h2>

            <input
                id="report-title"
                placeholder="Title"
            >

            <input
                id="report-type"
                placeholder="Report Type"
            >

            <select
                id="report-severity"
            >
                <option>
                    Low
                </option>

                <option selected>
                    Medium
                </option>

                <option>
                    High
                </option>
            </select>

            <textarea
                id="report-description"
                placeholder="Description"
            ></textarea>

            <div
                id="report-map"
            ></div>

            <p
                id="selected-location"
            >
                No location selected
            </p>

            <div class="modal-actions">

                <button
                    id="save-report-btn"
                    class="primary-btn"
                >
                    Save
                </button>

                <button
                    id="close-report-modal"
                >
                    Cancel
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(
        modal
    );

    initializeReportMap();

    document
        .getElementById(
            "close-report-modal"
        )
        .addEventListener(
            "click",
            () => modal.remove()
        );

    document
        .getElementById(
            "save-report-btn"
        )
        .addEventListener(
            "click",
            () => saveReport(
                modal
            )
        );
}

async function initializeReportMap() {

    const waterSources =
        await apiRequest(
            "/water-sources"
        );

    reportMap =
        L.map(
            "report-map"
        ).setView(
            [28.6139, 77.2090],
            6
        );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                "© OpenStreetMap"
        }
    ).addTo(
        reportMap
    );

    const reportIcon = L.icon({
        iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",

        shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    waterSources.forEach(
        source => {

            L.marker([
                source.latitude,
                source.longitude
            ])
            .addTo(
                reportMap
            )
            .bindPopup(`
                💧 ${source.name}
            `);
        }
    );

    reportMap.on(
        "click",
        function(e){

            selectedLatitude =
                e.latlng.lat;

            selectedLongitude =
                e.latlng.lng;

            if(
                reportMarker
            ){
                reportMap.removeLayer(
                    reportMarker
                );
            }

            reportMarker =
                L.marker(
                    [
                        selectedLatitude,
                        selectedLongitude
                    ],
                    {
                        icon: reportIcon
                    }
                )
                .addTo(
                    reportMap
                );

            document
                .getElementById(
                    "selected-location"
                )
                .textContent =

                `Selected:
                ${selectedLatitude.toFixed(5)},
                ${selectedLongitude.toFixed(5)}`;
        }
    );
}

async function saveReport(
    modal
) {

    try {

        if (
            selectedLatitude === null ||
            selectedLongitude === null
        ) {

            alert(
                "Please select a location on the map."
            );

            return;
        }

        await apiRequest(
            "/reports",
            {
                method: "POST",

                body: JSON.stringify({

                    title:
                    document.getElementById(
                        "report-title"
                    ).value,

                    report_type:
                    document.getElementById(
                        "report-type"
                    ).value,

                    severity:
                    document.getElementById(
                        "report-severity"
                    ).value,

                    description:
                    document.getElementById(
                        "report-description"
                    ).value,

                    latitude:
                    selectedLatitude,

                    longitude:
                    selectedLongitude
                })
            }
        );

        modal.remove();

        await loadReportsTable();

    }
    catch(error){

        alert(
            error.message
        );
    }
}

async function verifyReport(
    reportId
) {

    try {

        await apiRequest(
            `/reports/${reportId}/verify`,
            {
                method: "PUT"
            }
        );

        await loadReportsTable();

    }
    catch(error){

        alert(
            error.message
        );
    }
}