export default function validateInfo(values){
    let errors ={}
     if(!values.username.trim()){
         errors.username = "Username requierd."
     }
      //Email
      if(!values.emial){
          errors.email="Email required."
      } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
          errors.email = "Email adress is invalid."
      }

      if(!values.password){
          errors.passowrd="Password is required."
      }else if(values.password.length < 8){
          errors.password ="Password needs to be 8 characters or more."
      }

      if(!values.password2){
          errors.password2="Password is required."
      }else if(values.password2 !== values.password){
          errors.password2 ="Passwords do not match."
      }

      return errors;
}