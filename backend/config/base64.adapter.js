
const fs = require('fs');

class Base64 {

    static async base64_encode(file) {
        // read binary data
        let bitmap = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        return Buffer(bitmap).toString('base64');
    }




}

module.exports = Base64;