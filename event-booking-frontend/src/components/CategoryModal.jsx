import { useEffect, useState } from "react";
export default function CategoryModal({isVisible, onClose, onCategoryUpdate}){


    const handleClose = (event) => {
        if(event.target.id === 'wrapper') onClose();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formEl = event.currentTarget;
        const formData = new FormData(formEl);
        const jsonData = {};
      
        for (const [key, value] of formData.entries()) {
          jsonData[key] = value;
        }      
        console.log(JSON.stringify(jsonData));
      
        try {
          const response = await fetch('http://localhost:8080/api/v1/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
          });
      
          const categoryErrorMsg = document.getElementById('categoryErrorMsg'); 
      
          if (!response.ok) {
            const errorData = await response.json();
            categoryErrorMsg.textContent = errorData.message || 'Something went wrong';
            categoryErrorMsg.classList.remove('hidden');
          } else {
            categoryErrorMsg.classList.add('hidden');
            alert("Category Added Successfuly!")
            formEl.reset();
            await fetchCategories();
            onCategoryUpdate();
          }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
          const categoryErrorMsg = document.getElementById('categoryErrorMsg');
          categoryErrorMsg.textContent = 'Network error. Please try again.';
          categoryErrorMsg.classList.remove('hidden');
        }
      };

    const [categories, setCategories] = useState([]);



    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/categories');
            const data = await response.json();
            setCategories(data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    if(!isVisible) return null;
    return(
        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-center" id="wrapper" onClick={handleClose}>
            <div class="bg-white w-dvh h-150 flex flex-col py-5 px-10">
                <h1 class="text-green-500 font-medium font-mont text-xl">Categories</h1>
                <div class="w-full h-0.5 mt-1 bg-green-500"></div>
                <form onSubmit={handleSubmit} method="post" class=" w-full mt-3 mb-3 bg-grey-500"> 
                    <div class="flex flex-wrap mb-1">
                        <div class="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">
                            Category Name
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" name="name" type="text" placeholder="e.g. Technology" />
                        <button type="submit" class=" bg-green-500 text-white px-4 py-2 rounded cursor-pointer">Create</button>
                        </div>
                    </div>
                    <div id="categoryErrorMsg"  class="ml-3 mt-2 text-red-500 text-xs italic hidden">Category name can't be blank!</div>
                </form>
                <div class="bg-white w-full max-h-[80vh] overflow-y-auto rounded-lg">
                    {categories.map((category) => (
                        <div>{category.name}</div>
                    ))}
                </div>
                

{/* 
                <div class="bg-white w-4/5 max-h-[80vh] p-6 overflow-y-auto rounded-lg">
                    <p>Your long content...</p>
                </div>
                </div> */}

            </div>

        </div>
    );
    
}