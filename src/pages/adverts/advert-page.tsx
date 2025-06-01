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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-2xl flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          {advert.name}
        </h1>
        <p className="text-xl font-bold text-indigo-700 mb-3">
          Price: {advert.price}
        </p>
        <p
          className={`text-base font-semibold ${advert.sale ? "text-green-700" : "text-red-700"} mb-1`}
        >
          {advert.sale ? "On sale" : "To buy"}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Tags: {advert.tags.join(", ")}
        </p>
        <img
          src={
            advert.photo
              ? advert.photo
              : "https://st.depositphotos.com/2934765/53192/v/450/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg"
          }
          className="w-full h-80 w-80 object-cover rounded-lg mb-6 border border-gray-200 shadow-md"
        />

        <button
          onClick={() => setShowModal(true)}
          className="
          mt-4
          inline-flex
          justify-center
          py-3
          px-6
          border
          border-transparent
          rounded-md
          shadow-sm
          text-lg
          font-semibold
          text-white
          bg-red-600 /* Color rojo para acción de borrar */
          hover:bg-red-700
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-red-500
          transition-colors duration-200
        "
        >
          Delete advert
        </button>
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-sm w-full">
              <p className="text-xl font-semibold text-gray-800 mb-6">
                Are you sure you want to delete this advert?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={async () => {
                    try {
                      await deleteAdvert(advert.id);
                      navigate("/adverts");
                    } catch (error) {
                      console.error("Error deleting advert", error);
                    }
                  }}
                  className="
                  py-2
                  px-4
                  border
                  border-transparent
                  rounded-md
                  shadow-sm
                  text-sm
                  font-medium
                  text-white
                  bg-red-600
                  hover:bg-red-700
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                  transition-colors duration-200
                "
                >
                  Yes, delete
                </button>
                <button onClick={() => setShowModal(false)}
                  className="
                  py-2
                  px-4
                  border
                  border-gray-300
                  rounded-md
                  shadow-sm
                  text-sm
                  font-medium
                  text-gray-700
                  bg-white
                  hover:bg-gray-50
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  transition-colors duration-200
                "
                >Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdvertPage;
