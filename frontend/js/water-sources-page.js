async function renderWaterSourcesPage() {

    const mainContent =
        document.getElementById(
            "main-content"
        );

    mainContent.innerHTML = `

        <div class="page-header">

            <h1>
                Water Sources
            </h1>

            <button
                id="add-water-source-btn"
                class="primary-btn"
            >
                + Add Water Source
            </button>

        </div>

        <div
            id="water-sources-table"
        >
            Loading...
        </div>

    `;

    await loadWaterSourcesTable();

    document
        .getElementById(
            "add-water-source-btn"
        )
        .addEventListener(
            "click",
            showWaterSourceForm
        );
}


async function loadWaterSourcesTable() {

    try {

        const waterSources =
            await apiRequest(
                "/water-sources"
            );

        const container =
            document.getElementById(
                "water-sources-table"
            );

        let html = `

            <table class="data-table">

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Type</th>

                        <th>Status</th>

                        <th>Latitude</th>

                        <th>Longitude</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>
        `;

        waterSources.forEach(
            source => {

                html += `

                    <tr>

                        <td>
                            ${source.name}
                        </td>

                        <td>
                            ${source.type}
                        </td>

                        <td>
                            ${source.status}
                        </td>

                        <td>
                            ${source.latitude}
                        </td>

                        <td>
                            ${source.longitude}
                        </td>

                        <td>

                            <button
                                class="edit-btn"
                                data-id="${source.water_source_id}"
                            >
                                ✏ Edit
                            </button>

                            <button
                                class="delete-btn"
                                data-id="${source.water_source_id}"
                            >
                                🗑 Delete
                            </button>

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
            .querySelectorAll(".delete-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        deleteWaterSource(
                            button.dataset.id
                        );
                    }
                );

            });
        
        document
            .querySelectorAll(".edit-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        editWaterSource(
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

function showWaterSourceForm(source = null) {

    const modal = document.createElement(
        "div"
    );

    modal.className =
        "modal-overlay";

    modal.innerHTML = `

        <div class="modal">

            <h2>
                Add Water Source
            </h2>

            <input
                id="ws-name"
                placeholder="Name"
                value="${source?.name || ''}"
            >

            <input
                id="ws-type"
                placeholder="Type"
                value="${source?.type || ''}"
            >

            <input
                id="ws-latitude"
                placeholder="Latitude"
                type="number"
                step="any"
                value="${source?.latitude || ''}"
            >

            <input
                id="ws-longitude"
                placeholder="Longitude"
                type="number"
                step="any"
                value="${source?.longitude || ''}"
            >

            <input
                id="ws-capacity"
                placeholder="Capacity Liters"
                type="number"
                value="${source?.capacity_liters || ''}"
            >

            <textarea
                id="ws-description"
                placeholder="Description"
            ></textarea>

            <div class="modal-actions">

                <button
                    id="save-water-source"
                    class="primary-btn"
                >
                    Save
                </button>

                <button
                    id="close-modal"
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
            "close-modal"
        )
        .addEventListener(
            "click",
            () => modal.remove()
        );

    document
        .getElementById(
            "save-water-source"
        )
        .addEventListener(
            "click",
            () => saveWaterSource(
                modal,
                source?.water_source_id
            )
        );
}

async function saveWaterSource(
    modal,
    waterSourceId = null
) {

    try {

        const endpoint =
            waterSourceId
            ? `/water-sources/${waterSourceId}`
            : "/water-sources";

        const method =
            waterSourceId
            ? "PUT"
            : "POST";

        await apiRequest(
            endpoint,
            {
                method,

                body:JSON.stringify({

                    name:
                    document.getElementById(
                        "ws-name"
                    ).value,

                    type:
                    document.getElementById(
                        "ws-type"
                    ).value,

                    latitude:
                    parseFloat(
                        document.getElementById(
                            "ws-latitude"
                        ).value
                    ),

                    longitude:
                    parseFloat(
                        document.getElementById(
                            "ws-longitude"
                        ).value
                    ),

                    capacity_liters:
                    parseFloat(
                        document.getElementById(
                            "ws-capacity"
                        ).value
                    ),

                    description:
                    document.getElementById(
                        "ws-description"
                    ).value
                })
            }
        );

        modal.remove();

        await loadWaterSourcesTable();

    }
    catch(error){

        alert(error.message);
    }
}

async function deleteWaterSource(
    waterSourceId
) {

    const confirmed =
        confirm(
            "Delete this water source?"
        );

    if (!confirmed) {
        return;
    }

    try {

        await apiRequest(
            `/water-sources/${waterSourceId}`,
            {
                method: "DELETE"
            }
        );

        await loadWaterSourcesTable();



    }
    catch(error){

        alert(
            error.message
        );
    }
}

async function editWaterSource(
    waterSourceId
) {

    const waterSources =
        await apiRequest(
            "/water-sources"
        );

    const source =
        waterSources.find(
            ws =>
            ws.water_source_id ==
            waterSourceId
        );

    if (!source) {
        return;
    }

    showWaterSourceForm(
        source
    );
}