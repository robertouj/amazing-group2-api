import { useState } from "react";
import { client } from "../client";
import APP_ROOT from "../globals";


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

//we created this custom hook in order to retrieve the data from single animals to use for thumbnails and video
//if we click on thumbnail/carousel we want to display various images, we want to load pictures on request and do not want to load all of them once we load the page
//we create various useState with selectedAnimal
function useSelectedAnimal() {
  const [selectedAnimal, setSelectedAnimal] = useState([]); //empty array to start
  const [isLoading, setIsloading] = useState(false); //at the beginning: false

  //fetch resources asynchronously, we need a method to call this hook
  //fetchAnimal is like a method in a class

    const fetchAnimal = (id) => {
      setIsloading(true);
      fetch(`${APP_ROOT}/animals/${id}`)
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

// json-server --watch db.json

export default useSelectedAnimal;
