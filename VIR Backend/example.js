const oracledb = require('oracledb');

async function run() {

    let connection;

    try {

        connection = await oracledb.getConnection({ user: "student", password: "student", connectionString: "//localhost:1521/xe" });

        console.log("Successfully connected to Oracle Database");
        // Create a table

        await connection.execute(`begin
                                execute immediate 'drop table users';
                                exception when others then if sqlcode <> -942 then raise; end if;
                              end;`);

        await connection.execute(`create table users (
                                   id int not null,
								   username varchar2(50),
								   email varchar2(50),
								   password varchar2(50)
                                   )`);
        connection.commit();

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

run();