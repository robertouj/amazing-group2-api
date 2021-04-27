import { useEffect, useState } from "react";
import { client } from "../client";

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
/*   
  useEffect(() => {
    client.getEntries()
    //if the server replies
    //response is a variable, depends on map function
      .then((response) => {
        console.log(response);
        const newAnimals = response.items.map((item) => getAnimal(item));
        setAnimals(newAnimals); //-> actions after answer, asynchronous callback
      })
      .catch((error) => console.log("Request failed: " + error));
    //.catch -> in order to control error -> browser will display "Request failed" if promise is not fulfilled, but rejected
  }, []);
 */
  useEffect( () => {
     fetch("http://localhost:5000/posts", )
      .then( res => res.json())
      .then( json => {
        console.log(json)
        // setFetched(json);
        // setIsLoading(false);

      })
      .catch( () => console.log("request failed ")) 

/*       const putmethod = {
        method: 'POST', // Method itself
        headers: {
         'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        body: JSON.stringify({ "id": 2, "title": "json-server", "author": "typicode" }) // We send data in JSON format
       }
       
       // make the HTTP put request using fetch api
       fetch("http://localhost:5000/posts", putmethod)
       .then(response => response.json())
       .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
       .catch(err => console.log(err)) // Do something with the error */
     
  }, [])




  return animals;
}

export default useAnimals;