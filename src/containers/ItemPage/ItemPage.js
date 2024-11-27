import React, {useContext, useState} from "react"
import CurrencyContext from "../../components/create_context/CreateContext";
import DocumentTitle from "../../components/helmet/document_title";
import { useParams, Link } from "react-router-dom";
import FilterSelect from "../../components/filter_select/FilterSelect";
import "./ItemPage.css"

function ItemPage() {
   DocumentTitle("Catalog Item")
   const { index } = useParams();
   const data = useContext(CurrencyContext);
   const card = data.find((el) => el.id === parseInt(index));

   const [selectedDuration, setSelectedDuration] = useState(card?.duration || '');
   const [selectedCity, setSelectedCity] = useState('');

   const handleDurationChange = (event) => {
       setSelectedDuration(event.target.value);
   };

   const handleCityChange = (event) => {
       setSelectedCity(event.target.value);
   };

   const durationOptions = Array.from({length: 17}, (_, i) => ({
       value: String(i + 5),
       label: `${i + 5} days`
   }));

   const citiesByCountry = {
       Italy: [
           { value: 'rome', label: 'Rome' },
           { value: 'venice', label: 'Venice' },
           { value: 'milan', label: 'Milan' },
           { value: 'florence', label: 'Florence' }
       ],
       Greece: [
           { value: 'athens', label: 'Athens' },
           { value: 'santorini', label: 'Santorini' },
           { value: 'rhodes', label: 'Rhodes' },
           { value: 'mykonos', label: 'Mykonos' }
       ],
       Spain: [
           { value: 'barcelona', label: 'Barcelona' },
           { value: 'madrid', label: 'Madrid' },
           { value: 'valencia', label: 'Valencia' },
           { value: 'seville', label: 'Seville' }
       ],
       Poland: [
           { value: 'krakow', label: 'Krakow' },
           { value: 'warsaw', label: 'Warsaw' },
           { value: 'gdansk', label: 'Gdansk' },
           { value: 'wroclaw', label: 'Wroclaw' }
       ],
       Thailand: [
           { value: 'bangkok', label: 'Bangkok' },
           { value: 'phuket', label: 'Phuket' },
           { value: 'pattaya', label: 'Pattaya' },
           { value: 'chiangmai', label: 'Chiang Mai' }
       ],
       Egypt: [
           { value: 'cairo', label: 'Cairo' },
           { value: 'hurghada', label: 'Hurghada' },
           { value: 'sharm', label: 'Sharm El Sheikh' },
           { value: 'luxor', label: 'Luxor' }
       ],
       Turkey: [
           { value: 'istanbul', label: 'Istanbul' },
           { value: 'antalya', label: 'Antalya' },
           { value: 'alanya', label: 'Alanya' },
           { value: 'bodrum', label: 'Bodrum' }
       ],
       Georgia: [
           { value: 'tbilisi', label: 'Tbilisi' },
           { value: 'batumi', label: 'Batumi' },
           { value: 'kutaisi', label: 'Kutaisi' },
           { value: 'borjomi', label: 'Borjomi' }
       ]
   };

   if (!card) {
       return <div>Card not found</div>;
   }

   return (
       <>
           <div className='itempage_content'>
               <div className='content_info'>
                   <img src={card.imgpath} alt={card.title} />
                   <article className="content_info_text">
                       <h1>{card.title}</h1>
                       <p>{card.text}</p>
                       <div className="select_group">
                           <FilterSelect
                               label="Duration:"
                               options={durationOptions}
                               place={selectedDuration}
                               onFunction={handleDurationChange}
                           />
                           <FilterSelect
                               label="City:"
                               options={citiesByCountry[card.title] || []}
                               place={selectedCity}
                               onFunction={handleCityChange}
                           />
                       </div>
                   </article>
               </div>
               <div className='content_underline'>
                   <div className="content_underline_price">
                       <p>Price: {card.price}$</p>
                   </div>
                   <div className='content_underline_buttons'>
                       <Link to='/catalog'>
                           <button className='underline_button'>Go back</button>
                       </Link>
                       <Link to='/cast'>
                           <button className='underline_button'>Add to cast</button>
                       </Link>
                   </div>
               </div>
           </div>
       </>
   );
}

export default ItemPage;