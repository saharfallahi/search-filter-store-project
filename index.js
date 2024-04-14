//  http://localhost:3000/items

const searchInput=document.querySelector("#search");
const productsDOM=document.querySelector(".product-center");
const searchBtn=[...document.querySelectorAll(".btn")];
let allProductsData=[];

const filters={
    searchItems: "",
};
document.addEventListener("DOMContentLoaded",()=>{
    axios.get("http://localhost:3000/items")
    .then((res)=>{
        allProductsData=res.data;
        // render products on DOM
        renderProducts(res.data,filters);
    })
    .catch((err)=>console.log(err));
    
});

function renderProducts(_products,_filters){
    const filteredProducts = _products.filter((p)=>{
        return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase()) 
    });
    productsDOM.innerHTML="";
    console.log(filteredProducts);
    // render to DOM
    filteredProducts.forEach((item,index) => {
        // create
        // content
        // append to products
        const productsDiv= document.createElement("div");
        productsDiv.classList.add("product");
        productsDiv.innerHTML=`<div class="product-img">
          <img src=${item.image} alt="p-${index}" />
        </div>
        <div class="product-desc">
          <p class="product-price">${item.price} $</p>
          <p class="product-title">${item.title}</p>
        </div>`
        productsDOM.appendChild(productsDiv);
    });

};

searchInput.addEventListener("input",(e)=>{
    filters.searchItems=e.target.value;
    renderProducts(allProductsData,filters);
});

searchBtn.forEach((item)=>{
    item.addEventListener("click",(e)=>{
        console.log(e.target.dataset.filter);
        filters.searchItems=e.target.dataset.filter;
        renderProducts(allProductsData,filters);
    })
})
