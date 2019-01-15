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


var getProductList = () => {
    return {
        "status": 200,
        "message": "success",
        "data": [
            {
                "id": 1,
                "name": "Nam 1",
                "imageUrl": "water.jpg",
                "price": 99.99,
                "expire": "2018-12-31"
            },
            {
                "id": 1,
                "name": "Nam 1",
                "imageUrl": "water.jpg",
                "price": 99.99,
                "expire": "2018-12-31"
            }
        ]
    };
}