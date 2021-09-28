const KEY = "key=22615360-5cbe46b430b53ed17aa097d2d";
const BASEURL = "https://pixabay.com/api/";

const getImages = (images, page) => {
  const options = `${KEY}&q=${images}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`;
  const url = `${BASEURL}?${options}`;

  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      Promise.reject(new Error("Нету таких фотографий"));
    })
    .then((data) => data.hits);
};

export default getImages;
