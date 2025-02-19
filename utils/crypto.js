const crypto = require("crypto");
function hashAndEncode(data) {
  // Create a SHA-256 hash
  const hash = crypto.createHash("sha256");
  hash.update(data);

  // Generate the hash as a buffer
  const buffer = hash.digest();

  // Encode the buffer as a hex string
  const hex = buffer.toString("hex");

  return hex;
}

module.exports = {
    hashAndEncode,
}