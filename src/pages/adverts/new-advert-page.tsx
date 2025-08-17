import { useState, useEffect } from "react";
//import { getAdvertsTags } from "./advert-service";
import { useNavigate } from "react-router-dom";
//import { createAdvert } from "./advert-service";
import TheForm from "../../components/UI/form";
import { useAppDispatch, useAppSelector } from "../../store";
import { tags as tagsAction, advertsCreate } from "../../store/actions";
import { getUi } from "../../store/selectors";

const NewAdvertPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(NaN);
  const [tags, setTags] = useState<string[]>([]);
  const [sale, setSale] = useState(true);
  const [photo, setPhoto] = useState<File | null>(null);
  const navigate = useNavigate();
  const disabled = !name || !price || tags.length === 0;
  const dispatch = useAppDispatch();
  const tagsLoaded = useAppSelector((state) => state.tags.loaded);
  const availableTags = useAppSelector((state) => state.tags.data);
  const error = useAppSelector(getUi).error;

  useEffect(() => {
    if (!tagsLoaded) dispatch(tagsAction());
  }, [dispatch, tagsLoaded]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !price || tags.length === 0) {
      dispatch({ type: "ui/reset-error" });
      return dispatch({
        type: "adverts/created/rejected",
        payload: new Error("Please complete all required fields"),
      });
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("sale", sale.toString());
    tags.forEach((tag) => formData.append("tags", tag));
    if (photo) {
      formData.append("photo", photo);
    }

    const newAdvert = await dispatch(advertsCreate(formData));

    if (newAdvert) {
      navigate(`/adverts/${newAdvert.id}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create a new Advert
        </h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <TheForm
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                        placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              label="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <TheForm
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                        placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              label="price"
              type="number"
              value={price}
              onChange={(event) => setPrice(Number(event.target.value))}
              required
            />
          </div>
          <div className="mb-4">
            <div className="flex gap-4">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="true"
                  name="sale"
                  checked={sale === true}
                  onChange={() => setSale(true)}
                  required
                  className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">On sale</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="false"
                  name="sale"
                  checked={sale === false}
                  onChange={() => setSale(false)}
                  className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">To buy</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags:
            </label>
            {availableTags.map((tag) => (
              <label
                key={tag}
                className="inline-flex items-center cursor-pointer bg-gray-50 px-3 py-1 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <input
                  type="checkbox"
                  value={tag}
                  checked={tags.includes(tag)}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setTags([...tags, tag]);
                    } else {
                      setTags(tags.filter((t) => t !== tag));
                    }
                  }}
                  className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="ml-2">{tag}</span>
              </label>
            ))}
          </div>

          <div className="mb-6">
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Photo
            </label>
            <input
              type="file"
              accept="image/"
              onChange={(event) => {
                if (event.target.files && event.target.files.length > 0) {
                  setPhoto(event.target.files[0]);
                }
              }}
              className="
                block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
              "
            />
          </div>

          <p className="text-red-500 text-sm mb-4">{error?.message}</p>

          <button
            type="submit"
            disabled={disabled}
            className="
              w-full
              inline-flex
              justify-center
              py-3
              px-4
              border
              border-transparent
              rounded-md
              shadow-sm
              text-lg
              font-semibold
              text-white
              bg-indigo-600
              hover:bg-indigo-800
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
              transition-colors duration-200
            "
          >
            Create Advert
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewAdvertPage;
