import { useEffect, useState } from "react";
//import { client } from "../client";
import { myGlobals } from '../globals';

//getting information from contentful
//we use get Animal to retrieve a new simplified object and save it  line 7-17: object
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
  //crop: animal.fields?.fields.file.url + "?w=300&h=200&fit=crop",
  img: animal.fields.image?.fields.file.url + "?w=400&h=300&fit=fill",
});

//hook created to include list of animals from API
function useAnimals() {
  //animals=current state, setAnimals=state setter
  const [animals, setAnimals] = useState([]); //we define useState and start with empty array
  //useEffect executes something at the end of the whole execution in React
  //useEffect = actions are exectued after the DOM is loaded (at the end)
  //fetch can have a lot of data, we need client.getEntries otherwise website won´t be shown
  //with client.getEntries we can have loading state
  useEffect(() => { 
   fetch(`${myGlobals.APP_ROOT}/animals`)
       .then((res) => res.json())
       .then(json => {
        //  console.log(json)
          setAnimals(json);
       })
       .catch(() => console.log("Request failed"));
  }, []);

  return animals;
}

export default useAnimals;
