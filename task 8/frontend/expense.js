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
        console.log(expense);
        for(var i=0;i<expense.data.length;i++)
        {
            showExpense(expense.data[i]);
        }
    })
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
