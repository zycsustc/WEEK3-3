var carProducts = [
    {
      "id": 1,
      "name": "英雄牌 钢笔",
      "count": 1,
      "price": 69,
      "checked": false
    },
    {
      "id": 2,
      "name": "晨光牌 铅字笔",
      "count": 2,
      "price": 5.5,
      "checked": true
    },
    {
      "id": 3,
      "name": "晨光牌 铅笔",
      "count": 1,
      "price": 2,
      "checked": false
    },
    {
      "id": 4,
      "name": "狗熊牌 橡皮擦",
      "count": 1,
      "price": 1,
      "checked": false
    },
    {
      "id": 5,
      "name": "瑞士牌 双肩书包",
      "count": 1,
      "price": 199,
      "checked": true
    },
    {
      "id": 6,
      "name": "晨光牌 作业本",
      "count": 5,
      "price": 2.5,
      "checked": false
    }
  ]

var body = document.getElementById('boo');
var para = document.getElementById('products');
var jiazai = document.getElementById('jiazai');
var test1 = document.getElementById('test1');
var test2 = document.getElementById('test2');

//Helper functions
function test_fun(){
    jiazai.innerHTML = 'test_right';
}
function getTotMoney(){
    var sum_item = 0;
    var sum_money = 0;
    for(let j=0;j<carProducts.length;j++){
        if(document.getElementById('checkbox'+carProducts[j].id).checked===true){
            var item_num_single = Number(document.getElementById('number'+carProducts[j].id).innerHTML);
            sum_item += item_num_single;
            sum_money += Number(document.getElementById('totPrice'+carProducts[j].id).innerHTML);
        }
    }
    document.getElementById('totMoney').innerHTML = '共计'+sum_item+'件商品，'+sum_money+'￥';
}
function getTotPrice(i){
        var item_check = document.getElementById('checkbox'+carProducts[i].id);
        var item_totPrice = document.getElementById('totPrice'+carProducts[i].id);
        if(item_check.checked){
            var item_price = carProducts[i].price;
            var item_num = Number(document.getElementById('number'+carProducts[i].id).innerHTML);
            item_totPrice.innerHTML = item_price*item_num;
            getTotMoney();
        }
        if(!item_check.checked){
            item_totPrice.innerHTML = null;
            getTotMoney();
        }
}

for(let i=0;i<carProducts.length;i++){
    var newProduct = document.createElement('tr');
    newProduct.id = carProducts[i].id;

    var check = document.createElement('td');
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'checkbox'+carProducts[i].id;
    //add listener
    checkbox.addEventListener('change',function(){
        getTotPrice(i);
    },true)

    check.appendChild(checkbox);
    newProduct.appendChild(check);
    
    var productname = document.createElement('td');
    productname.innerHTML = carProducts[i].name;
    newProduct.appendChild(productname);

    var productprice = document.createElement('td');
    productprice.innerHTML = carProducts[i].price;
    productprice.id = 'productprice'+carProducts[i].id;
    newProduct.appendChild(productprice);
    
    //number plus&minus buttons
    var number = document.createElement('td');
    var minus = document.createElement('button');
    var plus = document.createElement('button');
    minus.id = 'minus'+carProducts[i].id;
    plus.id = 'plus'+carProducts[i].id;
    minus.innerHTML = '-'; plus.innerHTML = '+';
    var productNum = document.createElement('span');
    productNum.id = 'number'+carProducts[i].id;
    productNum.innerHTML = 1;
    
    //add listener
    minus.addEventListener('click',function(){
        var number_in_car = Number(document.getElementById('number'+carProducts[i].id).innerHTML);
        var new_number_in_car = number_in_car-1;
        if(new_number_in_car<0){
            new_number_in_car = 0;
        }
        if(new_number_in_car===0){
            document.getElementById('checkbox'+carProducts[i].id).checked = false;
        }
        document.getElementById('number'+carProducts[i].id).innerHTML = new_number_in_car;
        getTotPrice(i);
    },false)
    plus.addEventListener('click',function(){
        var number_in_car = Number(document.getElementById('number'+carProducts[i].id).innerHTML);
        document.getElementById('number'+carProducts[i].id).innerHTML = number_in_car+1;

        var item_check = document.getElementById('checkbox'+carProducts[i].id)
        var item_totPrice = document.getElementById('totPrice'+carProducts[i].id);
        getTotPrice(i);
    })

    //complete number body
    number.appendChild(minus);number.appendChild(productNum);number.appendChild(plus);
    newProduct.appendChild(number);
    
    var totalPrice = document.createElement('td');
    totalPrice.id = 'totPrice'+carProducts[i].id;
    newProduct.appendChild(totalPrice);
 
    para.appendChild(newProduct);
    
}
var selectAll = document.createElement('tr');
var check = document.createElement('td');
var checkbox_tot = document.createElement('input')
checkbox_tot.type = 'checkbox';
check.innerHTML = '全选';
check.appendChild(checkbox_tot);
selectAll.appendChild(check);
var totalmoney = document.createElement('td');
totalmoney.id = 'totMoney'
totalmoney.colSpan = '4';
totalmoney.style.textAlign = 'right';
selectAll.appendChild(totalmoney);
para.appendChild(selectAll);

checkbox_tot.addEventListener('change',function(){
    if(checkbox_tot.checked){
        for(let i=0;i<carProducts.length;i++){
            document.getElementById('checkbox'+carProducts[i].id).checked = true;
            getTotPrice(i);
        }
    }
    if(!checkbox_tot.checked){
        for(let i=0;i<carProducts.length;i++){
            document.getElementById('checkbox'+carProducts[i].id).checked = false;
            getTotPrice(i);
        }
    }
    getTotMoney();
},true)
