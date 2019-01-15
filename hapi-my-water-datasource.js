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
            name: "datasource.product.Delete",
            method: () => { },
        });

        server.method({
            name: "datasource.product.Query",
            method: () => { },
        });
    }
};

const InsertProduct = (db, body) => { 
    return db.collection('product').insert(body);
}