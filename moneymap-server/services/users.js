const sql = require("mssql")
var db = require("../services/db")

const UserService = {};

UserService.getJOCs = async (id) => {
  const request = new sql.Request(db);
  request.input('uid', sql.UniqueIdentifier, id);

    let result = await request.execute('sp_get_jocs');
    var output = {
        "result": []
    };
    for (var row in result.recordset) {
        const comprequest = new sql.Request(db);
        comprequest.input('jocid', sql.Int, row)
        let components = await comprequest.execute('sp_get_components')
        output.result.push({
            "jocid": row.JobOfferCardID,
            "jocname": row.JobOfferCardName,
            "jocrfc": row.RFS,
            "joccityid": row.CityID,
            "jocimage": row.CardImageSrc,
            "components": components.recordset
        })
    }

  return output;
};

module.exports = UserService;
