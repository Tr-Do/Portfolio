const encryptedData = {
    email: "dGRvMDJAamFndWFyLnRhbXUuZWR1",
    linkedin: "aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL3QtZG8tNzI4OTA5MTk0Lw=="
};

function decryptData(encoded) {
    return atob(encoded);
}