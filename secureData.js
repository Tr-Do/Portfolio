const encryptedData = {
    email: "YWJjZEBnbWFpbC5jb20=", // Base64 encoded "abcd@gmail.com"
    linkedin: "bGlua2VkaW4uY29tL2luL2V4YW1wbGU=" // Base64 encoded "linkedin.com/in/example"
};

// Function to decrypt Base64 data
function decryptData(encoded) {
    return atob(encoded); // Decode Base64
}
