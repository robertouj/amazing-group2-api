import { useState } from "react";
//import { client } from "../client";
import { myGlobals } from '../globals';

const getAnimal = (animal) => ({
  idVideo: animal.fields.video.fields.file.fileName
    .replace("watch?v=", "")
    .replace("&feature=youtu.be", ""),
  name: animal.fields.name,
  latinName: animal.fields.latinName,
  thumbnails: animal.fields.thumbnails?.map((thumb) => ({
    url: thumb.fields.file.url,
    title: thumb.fields.title,
  })),
  img: animal.fields.image?.fields.file.url + "?w=400&h=300&fit=pad",
});

function useSelectedAnimal() {
  const [selectedAnimal, setSelectedAnimal] = useState([]); 
  const [isLoading, setIsloading] = useState(false);

    const fetchAnimal = (id) => {
      setIsloading(true);
      console.log("this is the id: ",id);
      fetch(`${myGlobals.APP_ROOT}/animals/${id}`)
        .then((res) => res.json())
        .then((json) => {
          console.log(json)
          setSelectedAnimal(json);
          setIsloading(false);
        })
        .catch(() => console.log("Request failed"));
    };

  return [selectedAnimal, fetchAnimal, isLoading];
}

export default useSelectedAnimal;
