exports.plugin = {
    name: "hapi-my-water-product",
    version: "1.0.0",
    register: async function (server, options) {

        server.method({
            name: "product.ListProduct",
            method: getProductList,
            

        })

    }
};
var getProductList=() => {
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