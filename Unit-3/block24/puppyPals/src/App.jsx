import "./App.css";
import { puppyList } from "./data";
import { useState } from "react";

function App() {
  // for full array of puppies
  const [puppies, setPuppies] = useState(puppyList);

  // for featured puppy, useState(null) so that it can be conditionally rendered
  const [featPupID, setFeatPupID] = useState(null);

  // read ID and get info on featured puppy
  const featuredPup = puppies.find((pup) => pup.id === featPupID);
  console.log(featuredPup);

  return (
    <div>
      {puppies.map((puppy) => {
        return (
          <p
            onClick={() => {
              setFeatPupID(puppy.id);
            }}
            key={puppy.id}
          >
            {puppy.name}
          </p>
        );
      })}
      {featPupID && (
        <div>
          <h2>{featuredPup.name}</h2>
          <ul>
            <li>Age: {featuredPup.age}</li>
            <li>Email: {featuredPup.email}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
