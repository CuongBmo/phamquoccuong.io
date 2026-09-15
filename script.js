let quantity = 1;

let orders = [];


// =========================
// THAY ĐỔI SỐ LƯỢNG
// =========================

function changeQuantity(value){

    quantity += value;

    if(quantity < 1){
        quantity = 1;
    }

    if(quantity > 20){
        quantity = 20;
    }

    document.getElementById("quantity").innerText =
        quantity;
}


// =========================
// THÊM ĐƠN
// =========================

function addOrder(){

    const name =
        document.getElementById("name").value;

    const drink =
        document.getElementById("drink").value;

    const size =
        document.getElementById("size").value;

    const lessSugar =
        document.getElementById("lessSugar").checked;

    const lessIce =
        document.getElementById("lessIce").checked;

    const separateIce =
        document.getElementById("separateIce").checked;


    // KIỂM TRA TÊN

    if(name === ""){

        alert("Vui lòng chọn tên người đặt!");

        return;
    }


    // KIỂM TRA MÓN

    if(drink === ""){

        alert("Vui lòng chọn món nước!");

        return;
    }


    // TẠO TÙY CHỌN

    let options = [];

    if(lessSugar){
        options.push("Ít đường");
    }

    if(lessIce){
        options.push("Ít đá");
    }

    if(separateIce){
        options.push("Đá riêng");
    }


    orders.push({

        name:name,

        drink:drink,

        size:size,

        options:options,

        quantity:quantity

    });


    renderOrders();


    // RESET

    document.getElementById("drink").value = "";

    document.getElementById("lessSugar").checked = false;

    document.getElementById("lessIce").checked = false;

    document.getElementById("separateIce").checked = false;

    quantity = 1;

    document.getElementById("quantity").innerText = "1";

}


// =========================
// HIỂN THỊ ĐƠN
// =========================

function renderOrders(){

    const orderList =
        document.getElementById("orderList");


    if(orders.length === 0){

        orderList.innerHTML = `

            <div class="empty">

                Chưa có món nào được đặt

            </div>

        `;

        return;
    }


    orderList.innerHTML = "";


    orders.forEach((order,index)=>{

        let optionText =
            order.options.length > 0
            ? order.options.join(", ")
            : "Bình thường";


        const item =
            document.createElement("div");

        item.className = "order-item";


        item.innerHTML = `

            <div class="order-info">

                <div class="order-name">

                    ${order.name}

                </div>

                <div class="order-detail">

                    ${order.drink}

                    · Size ${order.size}

                    <br>

                    ${optionText}

                </div>

            </div>


            <div class="order-quantity">

                x${order.quantity}

            </div>


            <button
                class="delete-button"
                onclick="deleteOrder(${index})">

                🗑

            </button>

        `;


        orderList.appendChild(item);

    });


    updateTotal();

}


// =========================
// XÓA ĐƠN
// =========================

function deleteOrder(index){

    orders.splice(index,1);

    renderOrders();

}


// =========================
// TỔNG SỐ LY
// =========================

function updateTotal(){

    let total = 0;


    orders.forEach(order=>{

        total += order.quantity;

    });


    document.getElementById("totalDrinks")
        .innerText = total + " ly";

}


// =========================
// XÁC NHẬN
// =========================

function confirmOrder(){

    if(orders.length === 0){

        alert("Chưa có món nào trong đơn!");

        return;
    }


    document
        .getElementById("successMessage")
        .classList.add("show");

}


// =========================
// ĐÓNG THÔNG BÁO
// =========================

function closeSuccess(){

    document
        .getElementById("successMessage")
        .classList.remove("show");

}
