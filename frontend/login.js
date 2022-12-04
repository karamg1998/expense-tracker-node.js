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
    
});