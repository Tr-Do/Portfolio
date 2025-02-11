const encryptedData = {
    email: "dHJkb0BkdWNrLmNvbQ==",
    linkedin: "aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL3RyLWRvLw=="
};

function decryptData(encoded) {
    return atob(encoded);
}
