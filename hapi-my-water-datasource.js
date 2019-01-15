exports.plugin = {
    name: "hapi-my-water-datasource",
    version: "1.0.0",
    register: async function (server, options) {
        server.method({
            name: "datasource.product.Insert",
            method: InsertProduct,
        });

        server.method({
            name: "datasource.product.Update",
            method: () => { },
        });

        server.method({
            name: "datasource.product.Remove",
            method: RemoveProduct,
        });

        server.method({
            name: "datasource.product.Query",
            method: QueryProduct,
        });
    }
};

const InsertProduct = (db, body) => {
    return db.collection('product').insert(body);
}

const QueryProduct = (db) => {
    return new Promise((resolve, reject) => {
        db.collection('product').find({})
        .toArray((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
     });
    }
const RemoveProduct = (db, id) => { 
    return db.collection('product').deleteOne({_id:id});
}