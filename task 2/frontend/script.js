let signup=document.getElementById('signup');

signup.addEventListener('click',(e)=>{
    e.preventDefault();
    var name=document.getElementById('name').value;
    var email=document.getElementById('email').value;
    var pass=document.getElementById('password').value;
   if(name=='',email=='',pass=='')
   {
      let element=document.querySelector('.popup');
      let n_element=document.createElement('div');
      n_element.className='toast';
      n_element.innerText='*all the fields are mendatory';
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
      n_element.innerText='*user already registered';
      element.appendChild(n_element);
      setTimeout(()=> {
        n_element.remove();
        },2000); 
        return;
    }
    });
});