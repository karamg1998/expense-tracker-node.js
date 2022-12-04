let signup=document.getElementById('signup');

signup.addEventListener('click',(e)=>{
    e.preventDefault();
    var name=document.getElementById('name').value;
    var email=document.getElementById('email').value;
    var pass=document.getElementById('password').value;
   if(name=='')
   {
      let element=document.querySelector('.popup');
      let n_element=document.createElement('div');
      n_element.className='toast';
      n_element.innerText='*name cannot empty';
      element.appendChild(n_element);
      setTimeout(()=> {
        n_element.remove();
        },2000); 
        return;
   }
   if(email=='')
   {
    let element=document.querySelector('.popup');
    let n_element=document.createElement('div');
    n_element.className='toast';
    n_element.innerText='*email cannot empty';
    element.appendChild(n_element);
    setTimeout(()=> {
      n_element.remove();
      },2000); 
      return;
   }
   if(pass=='')
   {
    let element=document.querySelector('.popup');
    let n_element=document.createElement('div');
    n_element.className='toast';
    n_element.innerText='*password cannot empty';
    element.appendChild(n_element);
    setTimeout(()=> {
      n_element.remove();
      },2000); 
      return;
   }

   
   let user={name,email,pass};

   axios.post('http://localhost:3000/user/signup',user)
   .then(user=>{
    console.log(user.data);
   })
   .catch((err)=>{
    console.log(err);
    let error=err.response.data.original.code;
    if(error=='ER_DUP_ENTRY')
    {
      let element=document.querySelector('.popup');
      let n_element=document.createElement('div');
      n_element.className='toast';
      n_element.innerText='*email already registered';
      element.appendChild(n_element);
      setTimeout(()=> {
        n_element.remove();
        },2000); 
        return;
    }
    });
});
