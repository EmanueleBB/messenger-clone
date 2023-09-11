'use client'

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {

   const [variant,setVariant] = useState<Variant>('LOGIN');
   const [isLoading,setIsLoading] = useState<boolean>(false);

   const toggleVariant = useCallback(()=>{
      if(variant === 'LOGIN'){
         setVariant('REGISTER');
      }else{
         setVariant('LOGIN')
      }
   },[variant]);

   const {
      register,
      handleSubmit,
      formState:{
         errors
      }
   } = useForm<FieldValues>({
      //we define the default values for our form
      defaultValues:{
         name:'',
         email:'',
         password:'',
      }
   });

   const onSubmit:SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);
      if(variant === 'REGISTER'){
         //Axios register
      }

      if(variant === 'LOGIN'){
         //NextAuth SignIn
      }
   }

   const socialActions = (action:string) => {
      setIsLoading(true);

      //NextAuth Social Sign In
   }

   return (
      <div className='
         mt-8
         sm:mx-auto,
         sm:w-full,
         sm:max-w-md
      '>
         <div  
            className="
               bg-white
               px-4
               py-8
               shadow
               sm:rounded-lg
               sm:px-10
            "
         >
            <form
               className="space-y-6">
                  
            </form>
         </div>
      </div>
   )
}

export default AuthForm