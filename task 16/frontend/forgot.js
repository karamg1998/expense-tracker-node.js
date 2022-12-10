let forgot=document.getElementById('forgot');
forgot.addEventListener('click',async (e)=>{
    e.preventDefault();
    try{
        let pass=document.getElementById('password').value;
        let cPass=document.getElementById('cPassword').value;
        let id=localStorage.getItem('id');
        let obj={pass,cPass,id};
        if(pass===cPass)
        {
         await axios.post('http://localhost:3000/success/forgotPass',obj)
        .then(res=>{
            console.log(res);
        })
        localStorage.removeItem('id');
        let form=document.querySelector('.login');
        form.innerHTML=`<p class="para">Password changed successfully</p>
                        <a href="./login.html" class="redi">=> Click here to go to login page</a>`
        }
        else{
            popup('password not match');
        }
        
    }
    catch(err)
    {
        console.log(err);
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
}