let login=document.getElementById('login');
login.addEventListener('click',(e)=>{
    e.preventDefault();
    let email=document.getElementById('email').value;
    let pass=document.getElementById('password').value;
    if(email==='')
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
    if( pass==='')
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

    let user={email,pass};

    axios.post('http://localhost:3000/user/login',user)
    .then(user=>{
        console.log(user.data);
        if(user.data.length===0)
        {
            let element=document.querySelector('.popup');
            let n_element=document.createElement('div');
            n_element.className='toast';
            n_element.innerText='email or password incorrect';
            element.appendChild(n_element);
            setTimeout(()=> {
            n_element.remove();
            },2000); 
            return; 
        }
        alert('logged in successfully')
    }).catch((err)=>{
        console.log(err);
    })
});