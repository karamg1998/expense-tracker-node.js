let save=document.getElementById('save');

save.addEventListener('click',(e)=>{
    e.preventDefault();
    let amount=document.getElementById('expenseamount').value;
    let description=document.getElementById('description').value;
    let category=document.getElementById('category').value;
    if(amount=='')
    {
      let a='amount cannot empty'
      popup(a);
      return;
    }
    let expense={amount,description,category};

    axios.post('http://localhost:3000/addexpense',expense)
    .then(res=>{
        console.log(res.data);
        showExpense(res.data);
        popup('expense added');
    })
    .catch((err)=>{
        console.log(err);
        popup(err.response.data.message);
    });
});

window.addEventListener('DOMContentLoaded',async (e)=>{
 try{
    await axios.get('http://localhost:3000/getexpense')
    .then(expense=>{
        console.log(expense.data);
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
                      <button id="edit">Edit</button>
                      <button id="del">Delete</button>
                      </li>`

    let del=document.getElementById('del');
    del.addEventListener('click',async (e)=>{
      let parent=e.target.parentElement;
      try{
        await axios.delete(`http://localhost:3000/deleteexpense/${parent.id}`)
        .then((res)=>{
            popup(res.data.message);
            console.log(res.data.message);
        })
      }
      catch(err)
      {
        console.log(err);
        popup(err.response.data.message);
      }
      parent.remove();
    });                  
};

