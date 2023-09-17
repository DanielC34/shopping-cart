let shop = document.getElementById('shop');



//pulls data from local storage. if nothing is found an empty array is returned.
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop =()=>{
    return (shop.innerHTML= shopItemsData
        .map((x)=>{
            let {id, name, price, desc, img} = x;
            //if something is found store it in search variable, else return empty array
            let search = basket.find((x) => x.id === id) || [];
        return `
        <div id=product-id-${id} class="item">
                        <img width="220" src="${img}" alt="">
                        <div class="details">
                            <h3>${name}</h3>
                            <p>${desc}</p>
                            <div class="price-quantity">
                                <h2>$ ${price} </h2>
                                <div class="buttons">
                                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                                    <div id=${id} class="quantity">
                                    ${search.item === undefined ? 0 : search.item}
                                    </div>
                                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
    let selectedItem = id;
    /**Search is responsible for finding the item to be added to basket */
    let search = basket.find((x) => x.id === selectedItem.id);
    
    /***!If item is not found you push it onto queue otherwise just increase item quantity*/
    if(search === undefined) {

    basket.push({
    id : selectedItem.id,
    item: 1,
    });
}
    else {
    search.item += 1;
}
    //console.log(basket);
    update(selectedItem.id); 
    
    localStorage.setItem("data", JSON.stringify(basket));
};


let decrement = (id) => {
    let selectedItem = id;
    /**Search is responsible for finding the item to be added to basket */
    let search = basket.find((x) => x.id === selectedItem.id);
    
    /***!If item count is equal to zero then stop decreasing item count*/
    if(search === undefined) return;
   else if(search.item === 0) return;

    else {
    search.item -= 1;
}
//bear in mind, local storage is being used in this project
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    //console.log(basket)
    

    localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    //basket function
    let search = basket.find((x) => x.id ===id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};