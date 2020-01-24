module .exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQy=oldCart.totalQy || 0;
    this.totalPrice =oldCart.totalPrice || 0;
    this.add = function (item, id) {
        var storedItem = this.items[id];
        if (!storedItem){
            storedItem = this.items[id] = {item: item, qty: 0, price: 0}
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQy++;
        this.totalPrice += storedItem.item.price;
    };

    this.reduceByOne = function (id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQy--;
        this.totalPrice -= this.items[id].item.price;

        if(this.items[id].qty <= 0){
            delete this.items[id];
        }
    };

    this.removeItem = function (id) {
        this.totalQy -= this.items[id].qty
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };

    this.generateArray = function () {
        var arr = [];
        for(let id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    }

};