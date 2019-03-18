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
        comprequest.input('jocid', sql.Int, result.recordset[row].JobOfferCardID);
        let components = await comprequest.execute('sp_get_components');
    	var comps = components.recordset;
	    if(comps == null) {
	 	comps = [];
	    }
	    output.result.push({
            "jocid": result.recordset[row].JobOfferCardID,
            "jocname": result.recordset[row].JobOfferCardName,
            "jocrfc": result.recordset[row].RFS,
            "joccityid": result.recordset[row].CityID,
            "jocimage": result.recordset[row].CardImageSrc,
	    "savings": result.recordset[row].savings,
            "components": comps
        });
	
    }
    
  return output;
};

module.exports = UserService;
