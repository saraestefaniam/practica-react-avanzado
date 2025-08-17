import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { getAdvertsSelector, getUi } from "../../store/selectors";
import { advertsLoaded, tags as tagsAction } from '../../store/actions';

function AdvertsPage() {
  const dispatch = useAppDispatch()
  const adverts = useAppSelector(getAdvertsSelector)
  const loading = useAppSelector(getUi).pending
  const availableTags = useAppSelector(state => state.tags.data)
  const tagsLoaded = useAppSelector(state => state.tags.loaded) 
  
  const [searchAdvert, setSearchAdvert] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    if(!tagsLoaded)
    dispatch(tagsAction())
  }, [dispatch, tagsLoaded])


  useEffect(() => {
    dispatch(advertsLoaded())
  }, [dispatch])

  //controlling filter for name
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAdvert(event.target.value)
  }

  //controlling filter for tags
  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tag = event.target.value
    if (event.target.checked) {
      setSelectedTags((prevTags) => [...prevTags, tag])
    } else {
      setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag))
    }
  }

  if (loading) {
    return <p>Loading ads...</p>
  }

  const filteredAdverts = adverts.filter(advert => {
      const matchesName = advert.name.toLocaleLowerCase().includes(searchAdvert.toLocaleLowerCase())
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => advert.tags.includes(tag))
    
    return matchesName && matchesTags
  })



  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Ads list</h1>
      <div className="mb-8 max-w-lg mx-auto">
        <input 
        type="text"
        placeholder="Search by name"
        value={searchAdvert}
        onChange={handleSearchChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
      />
      </div>
      
      <div className="mb-8 max-w-lg mx-auto flex flex-wrap gap-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Select tag to filter</h3>
        <div className="flex flex-wrap gap-4">
          {availableTags.map((tag) => (
          <label key={tag} className="inline-flex items-center cursor-pointer bg-white px-4 py-2 rounded-full shadow-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
            <input 
              type="checkbox"
              value={tag}
              checked={selectedTags.includes(tag)}
              onChange={handleTagChange}
              className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <span className="ml-2 text-base font-medium">{tag}</span>
          </label>
        ))}
        {availableTags.length === 0 && <p className="text-gray-500 text-sm">No tags available</p>}
        </div>
      </div>
      {adverts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md mx-auto max-w-2xl">
          {searchAdvert || selectedTags.length > 0 ?(
            <p className="text-2xl text-gray-600 font-medium mb-4">No ads match current filters</p>
          ) : (
            <p className="text-2xl text-black-600 font-medium mb-4">There are no ads available </p>
          )}
            <p className="mt-6 text-lg">
              Be the first to create one! <Link to="/adverts/new" className="text-blue-600 hover:text-blue-800 underline font-semibold">Create New Advert</Link></p>
        </div>
      ): (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAdverts.map((advert) => (
          <Link key={advert.id} to={`/adverts/${advert.id}`} className="
              block
              bg-white
              border
              border-gray-200
              rounded-xl
              shadow-lg 
              p-5
              flex
              flex-col
              justify-between
              items-start
              hover:shadow-xl
              transition-shadow
              duration-300
              cursor-pointer
            ">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2 leading-tight">{advert.name}</h2>
            <p className="text-xl font-bold text-indigo-700 mb-3">Price: {advert.price}</p>
            <p className={`text-base font-semibold ${advert.sale ? "text-green-700" : "text-red-700"} mb-1`}>{advert.sale ? "On sale" : "To buy"}</p>
            <p className="text-sm text-gray-600 mb-4">Tags: <span className="font-medium">{advert.tags.join(", ")}</span></p>
          </Link>
        ))}
      </div>
      )}
    </div>
  );
}

export default AdvertsPage;
