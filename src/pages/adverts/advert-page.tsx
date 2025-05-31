import { useNavigate, useParams } from "react-router-dom";
import type { Advert } from "./types";
import { useEffect, useState } from "react";
import { getAdvertById, deleteAdvert } from "./advert-service";

function AdvertPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [advert, setAdvert] = useState<Advert | null>(null);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function showAdvertDetail() {
      if (!id) {
        navigate("/404", { replace: true });
        return;
      }

      try {
        const detailResponse = await getAdvertById(id);
        setAdvert(detailResponse.data);
      } catch (error) {
        console.error("Error getting details", error);
        setError(true);
      }
    }
    showAdvertDetail();
  }, [id, navigate]);

  if (error) {
    navigate("/404", { replace: true });
    return null;
  }

  if (!advert) {
    return <p>Loading advert...</p>;
  }

  return (
    <div>
      <h1>{advert.name}</h1>
      <p>Price: {advert.price}</p>
      <p>{advert.sale ? "On sale" : "To buy"}</p>
      <p>Tags: {advert.tags.join(", ")}</p>

      <button onClick={() => setShowModal(true)}>Delete advert</button>
      {showModal && (
        <div>
          <p>Are you sure you want to delete this advert?</p>
          <button
            onClick={async () => {
              try {
                await deleteAdvert(advert.id);
                navigate("/adverts");
              } catch (error) {
                console.error("Error deleting advert", error);
              }
            }}
          >
            Yes, delete
          </button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default AdvertPage;
