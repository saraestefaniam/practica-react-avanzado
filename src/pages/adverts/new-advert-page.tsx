import { useState, useEffect } from "react";
import { getAdvertsTags } from "./advert-service";
import { useNavigate } from "react-router-dom";
import { createAdvert } from "./advert-service";
import TheForm from "../../components/UI/form";

const NewAdvertPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [sale, setSale] = useState(true);
  const [photo, setPhoto] = useState<File | null>(null);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function showTags() {
      try {
        const tagsResponse = await getAdvertsTags();
        setAvailableTags(tagsResponse.data);
      } catch (error) {
        console.error("Error getting tags", error);
      }
    }
    showTags();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !price || tags.length === 0) {
      setError("Please complete all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("sale", sale.toString());
    tags.forEach((tag) => formData.append("tags", tag));

    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const newAdvertResponse = await createAdvert(formData);
      navigate(`/adverts/${newAdvertResponse.data.id}`);
    } catch (error) {
      console.error("Error creating advert", error);
      setError("There was an error creating the advert");
    }
  };

  return (
    <div>
      <h1>Create a new Advert</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TheForm
          label="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TheForm
          label="price"
          type="number"
          value={price}
          onChange={(event) => setPrice(Number(event.target.value))}
        />

        <div>
          <label>
            <input 
              type="radio"
              value="true"
              checked={sale === true}
              onChange={() => setSale(true)}
            />
            On sale
          </label>
          <label>
            <input 
              type="radio"
              value="false"
              checked={sale === false}
              onChange={() => setSale(false)}
            />
            To buy
          </label>
        </div>

        <div>
          <label>Tags:</label>
          {availableTags.map((tag) => (
            <label key={tag}>
              <input 
                type="checkbox"
                value={tag}
                checked={tags.includes(tag)}
                onChange={(event) => {
                  if (event.target.checked) {
                    setTags([...tags, tag])
                  } else {
                    setTags(tags.filter((t) => t !== tag))
                  }
                }}
              />
              {tag}
            </label>
          ))}
        </div>

        <div>
          <label>Photo</label>
          <input 
            type="file"
            accept="image/"
            onChange={(event) => {
              if(event.target.files && event.target.files.length > 0){
                setPhoto(event.target.files[0])
              }
            }}
          />
        </div>

        <p>{error}</p>

        <button type="submit">Create Advert</button>
      </form>
    </div>
  );
};

export default NewAdvertPage;
