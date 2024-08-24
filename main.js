let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let Total=document.getElementById('total');
let category=document.getElementById('category');
let submit=document.getElementById('submit');

 
let mood='create';
let temp;


//Count Total Price
function getTotal(){
   if(price.value !=''){
    let result= (+price.value+ +taxes.value+ +ads.value) - +discount.value;
    Total.innerHTML=result;
    Total.style.backgroundColor ='#040';
   }
   else{
    Total.innerHTML='';
     Total.style.backgroundColor ='#a00d02';

}
}

//creat New product

let dataPro ;

//save data in localstorage
if(localStorage.product !=null){
    dataPro=JSON.parse(localStorage.product);
}
else{
    dataPro=[];
}

submit.onclick= function(){
let newpro={
title:title.value.toLowerCase(),
price:price.value,
ads:ads.value,
taxes:taxes.value,
discount:discount.value,
Total:Total.innerHTML,
count:count.value,
category:category.value.toLowerCase(),
}
if(title.value !='' && price.value !='' && category.value !='' && newpro.count<100){
   if(mood=='create'){
      if(newpro.count > 1){
         for(let i=0;i< newpro.count; i++){
            dataPro.push(newpro);
         }
      }
         else{
            dataPro.push(newpro);
         }
   }
   else{
    dataPro[temp]=newpro;
      mood='create';
      submit.innerHTML='create';
      count.style.display='block';
   }
}


localStorage.setItem('product',  JSON.stringify(dataPro));
showData();
clear();

}



// ########################
//clear inputs data
function clear(){
    title.value='';
    count.value='';
    category.value='';
    discount.value='';
    taxes.value='';
    price.value='';
    ads.value='';
    Total.innerHTML='';
    getTotal();

    }




    //read inputs data
function showData(){
    getTotal();
    let tabel='';
    for(let i=0; i< dataPro.length;i++){
       tabel += `
       <tr>
       <td>${i+1}</td>
       <td>${dataPro[i].title}</td>
       <td>${dataPro[i].price}</td>
       <td>${dataPro[i].taxes}</td>
       <td>${dataPro[i].ads}</td>
       <td>${dataPro[i].discount}</td>
       <td>${dataPro[i].Total}</td>
       <td>${dataPro[i].category}</td>
       <td><button onclick="update(${i})">Updata</button></td>
       <td><button  onclick="deleteData(${i})">Delete</button></td>
    </tr>
     `
    }
    document.getElementById('tbody').innerHTML=tabel;
    let btnDelete=document.getElementById('deletAll');
    if(dataPro.length > 0){
    btnDelete.innerHTML=
    `<button  onclick="deleteAll()">Delete ALL(${dataPro.length})</button>`;
    }
    else{
        btnDelete.innerHTML='';
    }
    getTotal();
    }
    showData();



    //delete data Item
function deleteData(i){
    dataPro.splice(i , 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
 }




 
    //delete all 
function deleteAll(i){
    localStorage.clear();
    dataPro.splice(0);
    showData();
 }



//  update data
function update(i){
   mood='update';
   title.value=dataPro[i].title;
   price.value=dataPro[i].price;
   taxes.value=dataPro[i].taxes;
   ads.value=dataPro[i].ads;
   discount.value=dataPro[i].discount;
   category.value=dataPro[i].category;
   getTotal();
   count.style.display='none';
   submit.innerHTML='Update';
   temp=i;
   scroll({
      top:0,
      behavior:"smooth",
   })
   getTotal();

}



// #############################
//search
let serchMood = 'title';

function getsearchmood(id) {
    let search = document.getElementById('search');
    if (id == 'searchtitle') {
        serchMood = 'title';
        search.placeholder = 'Search By Title';
    } else {
        serchMood = 'category';
        search.placeholder = 'Search By Category';
    }

    search.focus();
    search.value = '';
    show();
}

function searchData(value){
   let tabel='';
   for(let i=0;i<dataPro.length;i++){
      if(serchMood == 'title'){
         if(dataPro[i].title.includes(value.toLowerCase())){
          
            tabel += `
            <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].Total}</td>
            <td>${dataPro[i].category}</td>
           
       <td><button onclick="update(${i})">Updata</button></td>
       <td><button  onclick="deleteData(${i})">Delete</button></td>
         </tr>
          `
         }
      }
      else{
        
            if(dataPro[i].category.includes(value.toLowerCase())){
             
               tabel += `
               <tr>
               <td>${i+1}</td>
              <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].Total}</td>
            <td>${dataPro[i].category}</td>
              
       <td><button onclick="update(${i})">Updata</button></td>
       <td><button  onclick="deleteData(${i})">Delete</button></td>
            </tr>
             `
            }
      }
   }
document.getElementById('tbody').innerHTML=tabel;
}
