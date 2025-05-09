import { useEffect, useState } from "react";

export default function AdminTableRow({ eventId, index, onEventUpdated}) {
    const [eventDetails, setEventDetails] = useState([]);
    const [categoryName, setCategoryName] = useState([]);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const url = 'http://localhost:8080/api/v1/events/' + eventId;
                const response = await fetch(url);
                const data = await response.json();
                setEventDetails(data.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEventDetails();

    }, [eventId]);

    useEffect(() => {
        if (!eventDetails.categoryId) return;
    
        const fetchCategoryName = async () => {
            try {
                const url = 'http://localhost:8080/api/v1/categories/' + eventDetails.categoryId;
                const response = await fetch(url);
                const data = await response.json();
                setCategoryName(data.data);
            } catch (error) {
                console.error('Error category name:', error);
            }
        };
    
        fetchCategoryName();
    }, [eventDetails.categoryId]);

    const handleDelete = async () => {

        try{
            const response = await fetch('http://localhost:8080/api/v1/events/' + eventId, {
                method: 'DELETE',
            });
        
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete event');
            }

            onEventUpdated();
        } catch(error){
            alert('Error: ' + error.message);
        }

    }

    return (
        <tr class="bg-gray-100 py-100">
            <td>{index + 1}</td>  
            <td><img src={eventDetails.image} class="w-10 h-10 rounded"/></td>  
            <td>{eventDetails.name}</td>  
            <td>{eventDetails.venue}</td>  
            <td>{eventDetails.price}</td>  
            <td>{new Date(eventDetails.date).toLocaleString()}</td>
            <td>{categoryName.name}</td>  
            <td class="px-2 py-1 max-w-[200px] truncate">{eventDetails.description}</td>
            <td class="flex justify-center"> 
                <button  class="mr-2 self-end rounded-sm bg-blue-500 text-white font-medium px-1.5 flex items-center justify-center border-blue border-1 hover:text-blue hover:border-blue hover:bg-white cursor-pointer">
                    Edit
                </button>
                <button  onClick={handleDelete} class="self-end rounded-sm bg-red-500 text-white font-medium px-1.5 flex items-center justify-center border-red-500 border-1 hover:text-red-500 hover:border-red hover:bg-white cursor-pointer">
                    Delete
                </button>
            </td>  
        </tr>
    );
}
