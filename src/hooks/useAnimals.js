import { useEffect, useState } from "react";
//import { client } from "../client";
import { myGlobals } from '../globals';

const getAnimal = (animal) => ({
  id: animal.sys.id,
  name: animal.fields.name,
  latinName: animal.fields.latinName,
  thumbnails: animal.fields.thumbnails?.map((thumb) => ({
    url: thumb.fields.file.url,
    title: thumb.fields.title,
  })),
  idVideo: animal.fields.video.fields.file.fileName
    .replace("watch?v=", "")
    .replace("&feature=youtu.be", ""),
  img: animal.fields.image?.fields.file.url + "?w=400&h=300&fit=fill",
});

function useAnimals() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => { 
   fetch(`${myGlobals.APP_ROOT}/animals`)
       .then((res) => res.json())
       .then(json => {
          setAnimals(json);
       })
       .catch(() => console.log("Request failed"));
  }, []);

  return animals;
}

export default useAnimals;
