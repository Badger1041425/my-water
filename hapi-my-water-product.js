exports.plugin = {
    name: "hapi-my-water-product",
    version: "1.0.0",
    register: async function (server, options) {

        server.method({
            name: "product.ListProduct",
            method: getProductList
        });

        server.method({
            name: "product.AddProduct",
            method: addProduct
        });
        server.method({
            name: "product.UpdateProduct",
            method: updateProduct
        });

        server.method({
            name: "product.RemoveProduct",
            method: removeProduct
        });

        server.method({
            name: "product.GetProductById",
            method: getProductById
        })

    }
};

const addProduct = (server, request) => {
    const body = {
        name: request.payload.name,
        imageUrl: request.payload.imageUrl,
        price: request.payload.price,
        expire: request.payload.expire
    }
    return new Promise((resolve, reject) => {
        server.methods.datasource.product.Insert(request.mongo.db, body)
            .then((res) => {
                if (res.result.ok == 1) {
                    console.log(res.ops)
                    resolve({
                        status: 200,
                        message: "เพิ่มได้เว้ยยยยยยย",
                        data: (res.ops && res.ops.length > 0) ? res.ops[0] : {}
                    });
                } else {
                    reject({
                        status: 500,
                        message: "เพิ่มไม่ได้เว้ยยยยยยย",
                        data: null
                    });
                }
            }).catch((error) => {
                console.log(error);
                reject({
                    status: 500,
                    message: "เพิ่มไม่ได้เว้ยยยยยยย",
                    data: null
                });
            });
    });

}

var getProductList = (server, request) => {
    return new Promise((resolve, reject) => {
        server.methods.datasource.product.Query(request.mongo.db)
            .then((res) => {
                resolve(res);
            })
    });
}
var removeProduct = (server, request) => {
    const id = request.params.id;
    return new Promise((resolve, reject) => {
        const ObjectID = request.mongo.ObjectID;

        server.methods.datasource.product.Remove(request.mongo.db, new ObjectID(id))
            .then((res) => {
                if (res.deletedCount) {
                    resolve({
                        status: 200,
                        message: "ลบได้เว้ยยยยยยย",
                        data: null
                    });
                } else {
                    reject({
                        status: 500,
                        message: "ลบไม่ได้เว้ยยยยยยย",
                        data: null
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                reject({
                    status: 500,
                    message: "ลบไม่ได้เว้ยยยยยยย",
                    data: null
                });
            });
    });
}
const updateProduct = (server, request) => {
    const body = {
        name: request.payload.name,
        imageUrl: request.payload.imageUrl,
        price: request.payload.price,
        expire: request.payload.expire
    }

    return new Promise((resolve, reject) => {
        const ObjectID = request.mongo.ObjectID;
        server.methods.datasource.product.Update(request.mongo.db, new ObjectID(request.params.id), body)
            .then((res) => {
                if (res.result.ok == 1) {
                    console.log(res.ops)
                    resolve({
                        status: 200,
                        message: "เพิ่มได้เว้ยยยยยยย",
                        data: (res.ops && res.ops.length > 0) ? res.ops[0] : {}
                    });
                } else {
                    reject({
                        status: 500,
                        message: "เพิ่มไม่ได้เว้ยยยยยยย",
                        data: null
                    });
                }
            }).catch((error) => {
                console.log(error);
                reject({
                    status: 500,
                    message: "เพิ่มไม่ได้เว้ยยยยยยย",
                    data: null
                });
            });
    });
}

var getProductById = (server, request) => {
    return new Promise((resolve, reject) => {
        const ObjectID = request.mongo.ObjectID;
        server.methods.datasource.product
            .QueryById(request.mongo.db, new ObjectID(request.params.id))
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                console.log(err);
                reject({
                    status: 500,
                    message: "ใจเย็นๆนะ",
                    data: null
                });
            });
    });
}