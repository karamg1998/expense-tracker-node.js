let forgot=document.getElementById('forgot');
forgot.addEventListener('click',async (e)=>{
    e.preventDefault();
    try{
        let pass=document.getElementById('password').value;
        let cPass=document.getElementById('cPassword').value;
        let email=localStorage.getItem('email');
        let obj={pass,cPass,email};
        if(pass===cPass)
        {
         await axios.post('http://localhost:3000/success/forgotPass',obj)
        .then(res=>{
            console.log(res);
        })
        localStorage.removeItem('email');
        window.location='./login.html';
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