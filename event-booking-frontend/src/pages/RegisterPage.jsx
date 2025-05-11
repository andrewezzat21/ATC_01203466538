import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function RegisterPage() {


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    localStorage.removeItem('token');
    localStorage.removeItem('roles');

    const handleSubmit = async (event) => {

        event.preventDefault();
        const formEl = event.currentTarget;
        const formData = new FormData(formEl);
        const errorMsg = document.getElementById('errorMsg'); 
        const jsonData = {};
      
        for (const [key, value] of formData.entries()) {
            jsonData[key] = value;
        }

        console.log(JSON.stringify(jsonData));


        if(jsonData["password"] != jsonData["confirmPassword"]){
            errorMsg.textContent = "Passwords don't match!"
            errorMsg.classList.remove('hidden');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData)
            });
    
            const data = await response.json();

            if (!response.ok) {
                errorMsg.textContent = data.message || 'Something went wrong';
                errorMsg.classList.remove('hidden');
            } else {
                errorMsg.classList.add('hidden');
                alert("User registered Successfuly!")
                navigate('/login');
            }
        } catch (error) {
            const errorMsg = document.getElementById('errorMsg');
            errorMsg.textContent = error.message;
            errorMsg.classList.remove('hidden');
        }
    };


    const togglePassword = () => setShowPassword(!showPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    return(
        <div  className="fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-center" id="wrapper">
            <div class="bg-white w-dvh h-150 flex flex-col py-5 px-10">
                <h1 class="text-blue font-medium font-mont text-xl">Register</h1>
                <div class="w-full h-0.5 mt-1 bg-blue"></div>

                <form onSubmit={handleSubmit} method="post" class=" w-full h-full mt-3">
                    <div class="flex flex-wrap -mx-3 mb-6">

                        <div class="w-full px-3 mb-6 md:mb-0">
                            
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="firstName">
                            First Name
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" name="firstName" type="text" placeholder="e.g. John" />
                        </div>
                        <div class="w-full px-3 mb-6 md:mb-0">

                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="lastName">
                            Last Name
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" name="lastName" type="text" placeholder="e.g. Doe" />
                        </div>

                        <div class="w-full px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
                            Email
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" name="email" type="email" placeholder="e.g. name@gmail.com" />
                        </div>

                        <div class="w-full px-3 mb-6 md:mb-0 relative">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="password">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder='********'
                            class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 pr-16 mb-3 leading-tight focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={togglePassword}
                            class="cursor-pointer absolute right-4 top-[50%] translate-y-[-50%] text-sm text-blue-600 hover:underline focus:outline-none"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                        </div>

                        <div class="w-full px-3 mb-6 md:mb-0 relative">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="password">
                            Confirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder='********'
                            class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 pr-16 mb-3 leading-tight focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPassword}
                            class="cursor-pointer absolute right-4 top-[50%] translate-y-[-50%] text-sm text-blue-600 hover:underline focus:outline-none"
                        >
                            {showConfirmPassword ? 'Hide' : 'Show'}
                        </button>
                        </div>

                        <div class="w-full px-3 mb-6 md:mb-0">

                            <button type="submit" class="bg-blue-500 text-white px-4 py-2 mb-3 rounded cursor-pointer">Register</button>
                            <p id="errorMsg"  class="text-red-500 text-xs italic hidden">Please fill out this field.</p>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
    
};
