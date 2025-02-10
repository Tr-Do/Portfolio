const encryptedData = {
    email: "YWJjZEBnbWFpbC5jb20=",
    linkedin: "bGlua2VkaW4uY29tL2luL2V4YW1wbGU="
};

function decryptData(encoded) {
    return atob(encoded);
}
