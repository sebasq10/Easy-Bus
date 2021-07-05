// const rest = new (require('rest-mssql-nodejs'))({
//     user: 'admin',
//     password: '',
//     server: 'DESKTOP-FDUQL33\\MSSQLSERVER',
//     database: 'Easy-bus'
// });

var sql = require('mssql');

var dbConfig= {
    server:"localhost",
    database: "Easy-Bus",
    user: "admin",
    password: "",
    port: 8080
}

async function getTable(){
    var conn= await new sql.connect(dbConfig);
    var req= await new sql.request(conn);

    conn.connect(function(err){
        if(err){
            console.log(err);
            return;
        }


        req.query("SELECT * FROM rol", function(err, recordset){
            if(err){
                console.log(err);
                return;
            }else{
                console.log(recordset);
            }
            conn.close();
        });
    });
}
