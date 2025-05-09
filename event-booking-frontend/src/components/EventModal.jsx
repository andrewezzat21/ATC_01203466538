import moment from 'moment';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";


export default function EventModal({isVisible, onClose}){

    const dateTimeProps = {
        placeholder: 'e.g. 5/5/2030 12:30PM',
    };

    const yesterday = moment().subtract( 1, 'day' );
    const valid = function( current ){
        return current.isAfter( yesterday );
    };

    const handleClose = (e) => {
        if(e.target.id === 'wrapper') onClose();
    }
    
    const handleSubmit = (formData) => {
        console.log(formData.get("name"))
    }

    if(!isVisible) return null;
    return(
        <div  className="fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-center" id="wrapper" onClick={handleClose}>
            <div class="bg-white w-dvh h-150 flex flex-col py-5 px-10">
                <h1 class="text-blue font-medium font-mont text-xl">Create New Event</h1>
                <div class="w-full h-0.5 mt-1 bg-blue"></div>

                <form action={handleSubmit} class=" w-full h-full mt-3">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">
                            Event Name
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" name="name" type="text" placeholder="e.g. Job Fair" />
                        {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                        </div>

                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="venue">
                            Venue
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" name="venue" type="text" placeholder="e.g. Assiut University" />
                        </div>

                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="date">
                            Date and Time
                        </label>
                        <Datetime isValidDate={ valid } inputProps={dateTimeProps} className="w appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" name="date"/>
                        </div>

                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="price">
                            Price
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" name="price" type="number" 
                                placeholder="e.g. 35.99" min="0" oninput="this.value = this.value < 0 ? 0 : this.value" onwheel="this.blur()" inputmode="decimal" step="0.01"/> 
                        </div>

                        <div class="w-full px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="description">
                            Description
                        </label>
                        <textarea 
                            class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none resize-none overflow-hidden" 
                            name="description" 
                            placeholder="e.g. Don't miss the opportunity to participate in this Job Fair at Assiut University!" 
                            rows="3"
                            oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px'">
                        </textarea>

                        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Submit</button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );


}