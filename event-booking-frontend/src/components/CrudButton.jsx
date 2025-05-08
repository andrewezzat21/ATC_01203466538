export default function CrudButton({primaryColor, secondaryColor, label, onClick}){

    return (
        <button
          className={`ml-10 rounded-full bg-${primaryColor}-500 text-${secondaryColor} font-bold w-8 h-8 flex items-center justify-center hover:text-${primaryColor} hover:border-2 hover:border-${primaryColor} hover:bg-${secondaryColor} cursor-pointer`}
          onClick={onClick}
        >
          {label}
        </button>
      );
}