async function renderAlertsPage() {

    const mainContent =
        document.getElementById(
            "main-content"
        );

    mainContent.innerHTML = `

        <div class="page-header">

            <h1>
                Alerts
            </h1>

            <button
                id="add-alert-btn"
                class="primary-btn"
            >
                + Create Alert
            </button>

        </div>

        <div
            id="alerts-table"
        >
            Loading...
        </div>

    `;

    await loadAlertsTable();

    document
        .getElementById(
            "add-alert-btn"
        )
        .addEventListener(
            "click",
            showAlertForm
        );
}

async function loadAlertsTable() {

    try {

        const alerts =
            await apiRequest(
                "/alerts"
            );

        const container =
            document.getElementById(
                "alerts-table"
            );

        let html = `

            <table class="data-table">

                <thead>

                    <tr>

                        <th>Title</th>

                        <th>Type</th>

                        <th>Severity</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>
        `;

        alerts.forEach(
            alert => {

                html += `

                    <tr>

                        <td>
                            ${alert.title}
                        </td>

                        <td>
                            ${alert.alert_type}
                        </td>

                        <td>
                            ${renderSeverityBadge(
                                alert.severity
                            )}
                        </td>

                        <td>

                            ${
                                alert.is_active

                                ? "🟢 Active"

                                : "⚪ Inactive"
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
    }
    catch(error){

        console.error(error);
    }
}

function renderSeverityBadge(
    severity
) {

    const badgeClass =

        severity === "High"

        ? "severity-high"

        : severity === "Medium"

        ? "severity-medium"

        : "severity-low";

    return `

        <span
            class="${badgeClass}"
        >
            ${severity}
        </span>

    `;
}

async function showAlertForm() {

    const dangerZones =
        await apiRequest(
            "/danger-zones"
        );

    const options =
        dangerZones.map(
            zone => `

                <option
                    value="${zone.danger_zone_id}"
                >
                    ${zone.zone_name}
                </option>

            `
        ).join("");

    const modal =
        document.createElement(
            "div"
        );

    modal.className =
        "modal-overlay";

    modal.innerHTML = `

        <div class="modal">

            <h2>
                Create Alert
            </h2>

            <input
                id="alert-title"
                placeholder="Title"
            >

            <input
                id="alert-type"
                placeholder="Alert Type"
            >

            <select
                id="alert-severity"
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
                id="alert-description"
                placeholder="Description"
            ></textarea>

            <select
                id="alert-danger-zone"
            >

                <option value="">
                    Select Danger Zone
                </option>

                ${options}

            </select>

            <div class="modal-actions">

                <button
                    id="save-alert-btn"
                    class="primary-btn"
                >
                    Save
                </button>

                <button
                    id="close-alert-btn"
                >
                    Cancel
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(
        modal
    );

    document
        .getElementById(
            "close-alert-btn"
        )
        .addEventListener(
            "click",
            () => modal.remove()
        );

    document
        .getElementById(
            "save-alert-btn"
        )
        .addEventListener(
            "click",
            () => saveAlert(
                modal
            )
        );
}

async function saveAlert(
    modal
) {

    try {

        await apiRequest(
            "/alerts",
            {
                method: "POST",

                body: JSON.stringify({

                    title:
                    document.getElementById(
                        "alert-title"
                    ).value,

                    alert_type:
                    document.getElementById(
                        "alert-type"
                    ).value,

                    severity:
                    document.getElementById(
                        "alert-severity"
                    ).value,

                    description:
                    document.getElementById(
                        "alert-description"
                    ).value,

                    danger_zone_id:
                    document.getElementById(
                        "alert-danger-zone"
                    ).value || null
                })
            }
        );

        modal.remove();

        await loadAlertsTable();

    }
    catch(error){

        alert(
            error.message
        );
    }
}