const handler = require('../../../_shared/utils/requestHandler');
const mysql = require('mysql2');
class MySQLService {
    async execute(body, ctx) {
        const { credentials, query } = body;

        if (!credentials) {
            return handler.badRequest(ctx, 'MySQL credentials must be provided');
        }

        if (!query) {
            return handler.badRequest(ctx, 'MySQL query must be provided');
        }

        if (!this.isCredentialValid(credentials)) {
            return handler.badRequest(ctx, 'Bad MySQL Credentials');
        }

        const connection = mysql.createConnection(credentials);
        const response = await this.execQuery(connection, query);


        return handler.success(ctx, response);
    }

    execQuery(connection, query) {
        return new Promise((resolve) => {
            connection.query(query, (error, result) => {
                if (error) {
                    return resolve({ mysqlError: true, error });
                }
                return resolve(result);
            });
        });
    }


    isCredentialValid(credentials) {
        if (!credentials.host || !credentials.user || !credentials.password || !credentials.database || !credentials.port) {
            return false;
        }

        return true;
    }
}

module.exports = new MySQLService();