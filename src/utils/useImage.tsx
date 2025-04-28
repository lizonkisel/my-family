import { useEffect, useState } from "react";

const useImage = (fileName: any) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(
    "https://avatars.mds.yandex.net/i?id=37ed513bb03f66864517ad250e888088_l-5321228-images-thumbs&n=13"
  );

  console.log(fileName);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await import(`../img/${fileName}`); // change relative path to suit your needs
        setImage(response.default);
      } catch (err) {
        /* eslint-disable-next-line */
        //@ts-ignore
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, [fileName]);

  return {
    loading,
    error,
    image
  };
};

export default useImage;

// Этот хук взят отсюда: https://stackoverflow.com/questions/53775936/import-image-dynamically-in-react-component
