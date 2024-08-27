import { FaSearch } from 'react-icons/fa'; 

interface searchProps{
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
}

export const Search:React.FC<searchProps> = ({onChange}) => {
    return (
        <div className="relative">
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
               
             
            <input
                className="pl-8 rounded-xl bg-customDark p-1 text-white placeholder-gray-400"
                type="text"
                name="search"
                id="search"
                placeholder="Search..."
                onChange={onChange}
            />
        </div>
    );
}
