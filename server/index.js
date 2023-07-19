
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const {loadApi} = require('./src/handlers/loadAPI');


conn.sync({ force: true })
.then(async() => {
    
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    })
    await loadApi();
}).catch(error => console.error(error))
