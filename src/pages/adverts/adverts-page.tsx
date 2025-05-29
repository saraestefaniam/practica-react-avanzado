import { useEffect, useState } from "react";
import { getAdverts } from "./advert-service";

interface Advert {
  id: string;
  name: string;
  price: number;
  sale: boolean;
  tags: string[];
  photo?: string;
}

function AdvertsPage() {
  const [adverts, setAdverts] = useState<Advert[]>([]);

  useEffect(() => {
    async function showAdverts() {
      try {
        const advertsResponse = await getAdverts();
        setAdverts(advertsResponse.data);
      } catch (error) {
        console.error("There was an error getting the ads", error);
      }
    }
    showAdverts();
  }, []);

  if (adverts.length === 0) {
    return <p>There are no ads available.</p>;
  }

  return (
    <div>
      <h1>Ads list</h1>
      <ul>
        {adverts.map((advert) => (
          <li key={advert.id}>
            <h2>{advert.name}</h2>
            <p>Price: {advert.price}</p>
            <p>{advert.sale ? "On sale" : "To buy"}</p>
            <p>Tags: {advert.tags.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdvertsPage;
