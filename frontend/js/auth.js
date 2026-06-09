async function login(username, password) {

    const response = await apiRequest(
        "/auth/login",
        {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            })
        }
    );

    localStorage.setItem(
        STORAGE_KEYS.TOKEN,
        response.access_token
    );

    return response;
}

function logout() {

    localStorage.removeItem(
        STORAGE_KEYS.TOKEN
    );

    location.reload();
}

function getToken() {

    return localStorage.getItem(
        STORAGE_KEYS.TOKEN
    );
}

function isAuthenticated() {

    return !!getToken();
}