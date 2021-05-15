const errors = {email : '', password: ''}

const loginUser = async (obj) => {

  const { email, password } = obj

  console.log({ email, password })




}

const validateEmail = (email) => {
  const regExp = /^[\w]+(\.[\w]+)*@([\w]+\.)+[a-z]{2,7}$/
  return regExp.test(email)
}

const validatePassword = (password) => {
  const regExp = /([a-z]?[A-Z]+[a-z]+[0-9]+){8,}/
  return regExp.test(password)
}


const form = document.querySelector('#login-form')

form.onsubmit = async (e) => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value

  e.preventDefault()

  try{

    const isEmailValid = validateEmail(email)   // validate email
    const isPasswordValid = validatePassword(password)    // validate password

    if (isEmailValid){                          // if the email is vald, validate password

      if(isPasswordValid) {
                             //  if the password is valid, make request to server
        const res = await fetch('/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({email, password})
        });

        if (res.ok){
          const data = await res.json();
        }

      }
      errors.password = 'invalid password, password should have a number, capital letter and small letter'
    }

    else {
      errors.email = 'invalid email, please use a valid email address'
    }
  }
  catch (err) {
    console.log(err)
  }

}
