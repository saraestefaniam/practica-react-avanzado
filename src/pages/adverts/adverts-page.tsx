import { useEffect, useState } from "react";
import { getAdverts, getAdvertsTags } from "./advert-service";
import { Link } from "react-router-dom";
import type { Advert } from "./types";

function AdvertsPage() {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [loading, setLoading] = useState(true)
  
  const [searchAdvert, setSearchAdvert] = useState("")
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    async function showTags() {
      try {
        const tagsResponse = await getAdvertsTags()
        setAvailableTags(tagsResponse.data)
      } catch (error) {
        console.error("Error getting tags", error)
      }
    }
    showTags()
  }, [])



  useEffect(() => {
    async function showAdverts() {
      try {
        setLoading(true)
        
        const filters: { name?: string, tags?:string} = {}

        if(searchAdvert) {
          filters.name = searchAdvert
        }

        if(selectedTags.length > 0) {
          filters.tags = selectedTags.join(',')
        }

        const advertsResponse = await getAdverts(filters);
        setAdverts(advertsResponse.data);
      } catch (error) {
        console.error("There was an error getting the ads", error);
      } finally {
        setLoading(false)
      }
    }
    const handler = setTimeout(() => {
      showAdverts();
    }, 300)
    return () => {
      clearTimeout(handler)
    }
  }, [searchAdvert, selectedTags]);

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


  return (
    <div>
      <h1>Ads list</h1>
      <div>
        <input 
        type="text"
        placeholder="Search by name"
        value={searchAdvert}
        onChange={handleSearchChange}
      />
      </div>
      
      <div>
        <h3>Select tag to filter</h3>
        {availableTags.map((tag) => (
          <label key={tag}>
            <input 
              type="checkbox"
              value={tag}
              checked={selectedTags.includes(tag)}
              onChange={handleTagChange}
            />
            {tag}
          </label>
        ))}
        {availableTags.length === 0 && <p>No tags available</p>}
      </div>
      {adverts.length === 0 ? (
        <div>
          {searchAdvert || selectedTags.length > 0 ?(
            <p>No ads match current filters</p>
          ) : (
            <p>
              There are no ads available
              Be the first to create one! <Link to="/adverts/new">here</Link>
            </p>
          )}
        </div>
      ): (
        <ul>
        {adverts.map((advert) => (
          <li key={advert.id}>
            <h2><Link to={`/adverts/${advert.id}`}>{advert.name}</Link></h2>
            <p>Price: {advert.price}</p>
            <p>{advert.sale ? "On sale" : "To buy"}</p>
            <p>Tags: {advert.tags.join(", ")}</p>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}

export default AdvertsPage;
