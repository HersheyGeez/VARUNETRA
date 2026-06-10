
let zoneCreationMap;

let selectedZoneLatitude =
    null;

let selectedZoneLongitude =
    null;

let previewCircle =
    null;

let centerMarker =
    null;

async function renderDangerZonesPage() {

    

    const mainContent =
        document.getElementById(
            "main-content"
        );

    mainContent.innerHTML = `

        <div class="page-header">

            <h1>
                Danger Zones
            </h1>

            <button
                id="add-danger-zone-btn"
                class="primary-btn"
            >
                + Create Zone
            </button>

        </div>

        <div
            id="danger-zones-table"
        >
            Loading...
        </div>

        <div
            id="danger-zones-map"
        ></div>

    `;

    await loadDangerZonesTable();

    await initializeDangerZonesMap();

    document
        .getElementById(
            "add-danger-zone-btn"
        )
        .addEventListener(
            "click",
            showDangerZoneForm
        );
}

async function loadDangerZonesTable() {

    try {

        const zones =
            await apiRequest(
                "/danger-zones"
            );

        const container =
            document.getElementById(
                "danger-zones-table"
            );

        let html = `

            <table class="data-table">

                <thead>

                    <tr>

                        <th>
                            Zone Name
                        </th>

                        <th>
                            Risk Level
                        </th>

                        <th>
                            Radius (m)
                        </th>

                    </tr>

                </thead>

                <tbody>
        `;

        zones.forEach(
            zone => {

                html += `

                    <tr>

                        <td>
                            ${zone.zone_name}
                        </td>

                        <td>
                            ${zone.risk_level}
                        </td>

                        <td>
                            ${zone.radius_meters}
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

let dangerZonesMap;

async function initializeDangerZonesMap() {

    const zones =
        await apiRequest(
            "/danger-zones"
        );

    dangerZonesMap =
        L.map(
            "danger-zones-map"
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
        dangerZonesMap
    );

    zones.forEach(
        zone => {

            L.circle(
                [
                    zone.latitude,
                    zone.longitude
                ],
                {
                    radius:
                        zone.radius_meters,

                    color:
                        "#f97316",

                    fillColor:
                        "#f97316",

                    fillOpacity:
                        0.25
                }
            )
            .addTo(
                dangerZonesMap
            )
            .bindPopup(`

                <strong>
                    ${zone.zone_name}
                </strong>

                <br>

                Risk:
                ${zone.risk_level}
            `);
        }
    );
}

function showDangerZoneForm() {

    selectedZoneLatitude =
        null;

    selectedZoneLongitude =
        null;

    const modal =
        document.createElement(
            "div"
        );

    modal.className =
        "modal-overlay";

    modal.innerHTML = `

        <div
            class="modal danger-zone-modal"
        >

            <h2>
                Create Danger Zone
            </h2>

            <input
                id="zone-name"
                placeholder="Zone Name"
            >

            <select
                id="zone-risk-level"
            >
                <option>
                    Low
                </option>

                <option>
                    Medium
                </option>

                <option selected>
                    High
                </option>
            </select>

            <input
                id="zone-radius"
                type="number"
                value="1500"
                placeholder="Radius"
            >

            <div
                id="zone-map"
            ></div>

            <p
                id="zone-location"
            >
                Click map to select center
            </p>

            <div
                class="modal-actions"
            >

                <button
                    id="save-zone-btn"
                    class="primary-btn"
                >
                    Save
                </button>

                <button
                    id="close-zone-btn"
                >
                    Cancel
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(
        modal
    );

    initializeZoneCreationMap();

    document
        .getElementById(
            "close-zone-btn"
        )
        .addEventListener(
            "click",
            () => modal.remove()
        );

    document
        .getElementById(
            "save-zone-btn"
        )
        .addEventListener(
            "click",
            () => saveDangerZone(
                modal
            )
        );
}

async function initializeZoneCreationMap() {

    zoneCreationMap =
        L.map(
            "zone-map"
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
        zoneCreationMap
    );

    zoneCreationMap.on(
        "click",
        function(e){

            selectedZoneLatitude =
                e.latlng.lat;

            selectedZoneLongitude =
                e.latlng.lng;

            const radius =
                Number(
                    document.getElementById(
                        "zone-radius"
                    ).value
                );

            updateZonePreview(
                radius
            );

            document
                .getElementById(
                    "zone-location"
                )
                .textContent =

                `Center:
                ${selectedZoneLatitude.toFixed(5)},
                ${selectedZoneLongitude.toFixed(5)}`;
        }
    );

    document
        .getElementById(
            "zone-radius"
        )
        .addEventListener(
            "input",
            function(){

                updateZonePreview(
                    Number(
                        this.value
                    )
                );
            }
        );
}

function updateZonePreview(
    radius
) {

    if(
        selectedZoneLatitude === null
    ){
        return;
    }

    if(
        previewCircle
    ){
        zoneCreationMap.removeLayer(
            previewCircle
        );
    }

    if(
        centerMarker
    ){
        zoneCreationMap.removeLayer(
            centerMarker
        );
    }

    centerMarker =
        L.marker([
            selectedZoneLatitude,
            selectedZoneLongitude
        ])
        .addTo(
            zoneCreationMap
        );

    previewCircle =
        L.circle(
            [
                selectedZoneLatitude,
                selectedZoneLongitude
            ],
            {
                radius,

                color:"#f97316",

                fillColor:"#f97316",

                fillOpacity:0.25
            }
        )
        .addTo(
            zoneCreationMap
        );
}

async function saveDangerZone(
    modal
) {

    try {

        if (
            selectedZoneLatitude === null ||
            selectedZoneLongitude === null
        ) {

            alert(
                "Please select a zone center on the map."
            );

            return;
        }

        await apiRequest(
            "/danger-zones",
            {
                method: "POST",

                body: JSON.stringify({

                    zone_name:
                    document.getElementById(
                        "zone-name"
                    ).value,

                    latitude:
                    selectedZoneLatitude,

                    longitude:
                    selectedZoneLongitude,

                    radius_meters:
                    Number(
                        document.getElementById(
                            "zone-radius"
                        ).value
                    ),

                    risk_level:
                    document.getElementById(
                        "zone-risk-level"
                    ).value
                })
            }
        );

        modal.remove();

        await loadDangerZonesTable();

        renderDangerZonesPage();

    }
    catch(error){

        alert(
            error.message
        );
    }
}