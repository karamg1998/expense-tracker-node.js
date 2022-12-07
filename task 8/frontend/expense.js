let save=document.getElementById('save');

save.addEventListener('click',(e)=>{
    e.preventDefault();
    let amount=document.getElementById('expenseamount').value;
    let description=document.getElementById('description').value;
    let category=document.getElementById('category').value;
    let id=localStorage.getItem('token');
    if(amount=='')
    {
      let a='amount cannot empty'
      popup(a);
      return;
    }
    let expense={amount,description,category,id};

    axios.post('http://localhost:3000/addexpense',expense)
    .then(res=>{
        console.log(res.data);
        showExpense(res.data);
        popup(res.data.message);
    })
    .catch((err)=>{
        console.log(err);
        popup(err.response.data.message);
    });
});

window.addEventListener('DOMContentLoaded',async (e)=>{
  let token=localStorage.getItem('token');
 try{
    await axios.get('http://localhost:3000/getexpense',{headers:{'Authorization':token}})
    .then(expense=>{
        console.log(expense.data);
        let userHeading=document.querySelector('.user');
        userHeading.innerText=`Hello ${expense.data.name}`;
        let exp=expense.data.data;
        for(var i=0;i<exp.length;i++)
        {
            showExpense(exp[i]);
        }
        if(expense.data.premium==='true')
        {
          userHeading.innerText=`Hello 👑 ${expense.data.name}`;

          let theme=document.querySelector('.main-heading');
          theme.innerHTML+=`<label for="toggle">Toggle theme</label>
          <input type="checkbox" id="toggle" name="toggle">`;

          let mem=document.getElementById('membership');
          mem.remove();

          let toggle=document.getElementById('toggle');
          toggle.addEventListener('change',(e)=>{
            document.body.classList.toggle('dark',e.target.checked);
          });
        }
    });
 }
 catch(err){
    console.log(err);
    popup(err.response.data.message);
 }
});

function popup(data)
{
  let element=document.querySelector('.popup');
      let n_element=document.createElement('div');
      n_element.className='toast';
      n_element.innerText=data;
      element.appendChild(n_element);
      setTimeout(()=> {
        n_element.remove();
        },2000); 
};

function showExpense(expense)
{
    var main=document.querySelector('.main');
    main.innerHTML+=`<li class="e-container" id="${expense.id}">
                      Amount:${expense.amount}-Description:${expense.description}-Category:${expense.category}
                      <button class="edit">Edit</button>
                      <button class="del">Delete</button>
                      </li>`

    let del=document.getElementsByClassName('del');
    for(var i=0;i<del.length;i++)
    {
       del[i].addEventListener('click',async (e)=>{
      let p=e.target.parentElement;
      try{
      await  axios.delete(`http://localhost:3000/deleteexpense/${p.id}`)
      .then(res=>{
        console.log(res);
        popup(res.data.message);
      })
      }
      catch(err){
        console.log(err);
        popup(err.response.data.message)
      }
      p.remove();
    });  
    }
};

let logout=document.getElementById('logout');
logout.addEventListener('click',(e)=>{
  window.location.href = "./login.html"
  localStorage.removeItem('token');
});

let premium=document.getElementById('membership');
premium.addEventListener('click',async(e)=>{
  let token=localStorage.getItem('token');
  try{
     let response =await  axios.get('http://localhost:3000/checkout',{headers:{'authorization':token}});
     console.log(response);
     var options =
    {
     "key": response.data.keyId,
     "name": "Test Company",
     "order_id": response.data.order.id,
     "prefill": {
       "name": "karamveer",
       "email": "k@xyz.com",
       "contact": "8209583352"
     },
     "theme": {
      "color": "#3399cc"
     },
     "handler": function (response) {
         console.log(response);
        let orderId=response.razorpay_order_id;
        let paymentId=response.razorpay_payment_id
         let obj={orderId,paymentId,token};
         axios.post('http://localhost:3000/success',obj).then(() => {
             alert('You are a Premium User Now')
             window.location.href = "./login.html"
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     }
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();
  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });  
  }
  catch(err){
    console.log(err);
  }
});
