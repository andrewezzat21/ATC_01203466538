import moment from 'moment';
import { useEffect, useState } from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

export default function EditModal({isVisible, onClose, onEventUpdated, reloadTrigger, eventDetails}){

    const dateTimeProps = {
        placeholder: 'e.g. 5/5/2030 12:30PM',
        name: 'date'
    };

    const yesterday = moment().subtract( 1, 'day' );
    const valid = function( current ){
        return current.isAfter( yesterday );
    };

    const handleClose = (event) => {
        if(event.target.id === 'wrapper') onClose();
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formEl = event.currentTarget;
        const formData = new FormData(formEl);
    
        let imageUrl = "";
        const imageFile = formData.get('imageFile'); 
    
        if (imageFile && imageFile.size > 0) {
            try {
                const imageData = new FormData();
                imageData.append('file', imageFile);
                imageData.append('upload_preset', 'testupload'); 
                const errorMsg = document.getElementById('errorMsg');
                errorMsg.textContent = 'Uploading Image..... Please wait it takes time!';
                errorMsg.classList.remove('hidden');
                const res = await fetch('https://api.cloudinary.com/v1_1/diha0tqnn/image/upload', {
                    method: 'POST',
                    body: imageData
                });
        
                if (!res.ok) {
                    throw new Error('Image upload failed');
                }
        
                const imageResponse = await res.json();
                console.log('Image upload successful:', imageResponse);
                imageUrl = imageResponse.secure_url;
                errorMsg.classList.add('hidden');
        
            } catch (error) {
                console.error('Error uploading image:', error);
                const errorMsg = document.getElementById('errorMsg');
                errorMsg.textContent = error;
                errorMsg.classList.remove('hidden');
            }
        }
    
        const jsonData = {};
      
        for (const [key, value] of formData.entries()) {
            if (key !== 'imageFile') jsonData[key] = value;
        }
      
        jsonData.image = imageUrl;
          
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/v1/events/' + eventDetails.id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(jsonData)
            });
    
            const errorMsg = document.getElementById('errorMsg'); 
        
            if (!response.ok) {
                const errorData = await response.json();
                errorMsg.textContent = errorData.message || 'Something went wrong';
                errorMsg.classList.remove('hidden');
            } else {
                errorMsg.classList.add('hidden');
                alert('Event Edited successfully!');
                onEventUpdated();
                onClose();
                window.location.reload();
            }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            const errorMsg = document.getElementById('errorMsg');
            errorMsg.textContent = 'Network error. Please try again.';
            errorMsg.classList.remove('hidden');
        }
    };
    


    const [categories, setCategories] = useState([]);
      


    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/v1/categories',{
                headers: {'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            setCategories(data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [reloadTrigger]);


    if(!isVisible) return null;
    return(
        <div  className="z-10 fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-center" id="wrapper" onClick={handleClose}>
            <div class="bg-white w-dvh h-150 flex flex-col py-5 px-10">
                <h1 class="text-blue font-medium font-mont text-xl">Edit Event</h1>
                <div class="w-full h-0.5 mt-1 bg-blue"></div>

                <form onSubmit={handleSubmit} method="post" class=" w-full h-full mt-3">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">
                            Event Name
                        </label>
                        <input defaultValue={eventDetails.name} class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" name="name" type="text" placeholder="e.g. Job Fair" />
                        </div>

                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="venue">
                            Venue
                        </label>
                        <input defaultValue={eventDetails.venue} class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" name="venue" type="text" placeholder="e.g. Assiut University" />
                        </div>

                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="date">
                            Date and Time
                        </label>
                        <Datetime initialValue={new Date(eventDetails.date)} timeFormat = {"hh:mm A"} isValidDate={ valid } inputProps={dateTimeProps} className="w appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" name="date"/>
                        </div>

                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="price">
                            Price
                        </label>
                        <input defaultValue={eventDetails.price} class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" name="price" type="number" 
                                placeholder="e.g. 35.99" min="0" oninput="this.value = this.value < 0 ? 0 : this.value" onwheel="this.blur()" inputmode="decimal" step="0.01"/> 
                        </div>

                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="capacity">
                            Capacity
                        </label>
                        <input defaultValue={eventDetails.capacity} class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" name="capacity" type="number" 
                                placeholder="e.g. 100" min="0" oninput="this.value = this.value < 0 ? 0 : this.value" onwheel="this.blur()" inputmode="numeric" step="1"/> 
                        </div>

                        <div class="w-full px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="category">
                                Category
                            </label>
                            <select defaultValue={eventDetails.categoryId}
                                class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" name="categoryId">
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <div class="w-full px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="description">
                            Description
                        </label>
                        <textarea 
                            defaultValue={eventDetails.description}
                            class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none resize-none overflow-hidden" 
                            name="description" 
                            placeholder="e.g. Don't miss the opportunity to participate in this Job Fair at Assiut University!" 
                            rows="3"
                            oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px'">
                        </textarea>
                        <input type="file" name="imageFile" accept="image/*"/>

                        <button type="submit" class="bg-blue-500 text-white px-4 py-2 mb-3 rounded cursor-pointer">Edit Event</button>
                        <p id="errorMsg"  class="text-red-500 text-xs italic hidden">Please fill out this field.</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );


}