const fs = require("fs")
const path = require("path")

const file_name = path.join(__dirname, "email.html")

module.exports = async (link) => {

    const data = fs.readFileSync(file_name, {
        encoding: "utf-8"
    }).toString()

    return data.replace("${VERIFICATION_LINK}$", link)
}