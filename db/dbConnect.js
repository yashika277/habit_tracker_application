let mongoose = require("mongoose");

let dbConnect = () => {
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => {
            console.log("database connected");
        })
        .catch((err) => {
            console.log(err, "err");
        });
};

module.exports = dbConnect;