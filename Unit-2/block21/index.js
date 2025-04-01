const url =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2503-FTB-ET-WEB-FT/events";

// API Calls
const getAllParties = async () => {
  try {
    const response = await fetch(url);
    const json = await response.json(); // object == [{}{}{}{}]
    return json.data;
  } catch (error) {
    console.error(error);
  }
};
//add new party function
const addNewParty = async (formData) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
};
//delete function
const deleteParty = async (id) => {
  // [{id: 1, name: "Ryan's Party"}{id: 2, name: "Tor's Party"}]
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    console.log(`successfully deleted ${id}`);
  } catch (error) {
    console.error(error);
  }
};

// DOM manipulation
const renderParties = async () => {
  // call api to get all parties as json
  const arrContent = await getAllParties();
  // define our html components
  const buttonOutput = document.querySelector("#buttons output");
  const nameOutput = document.querySelector("#partyName output");
  const dateOutput = document.querySelector("#partyDateTime output");
  const locationOutput = document.querySelector("#partyLocation output");
  const descriptionOutput = document.querySelector("#partyDescription output");

  // clear elements so they dont stack up over each other
  buttonOutput.innerHTML = "";
  nameOutput.innerHTML = "";
  dateOutput.innerHTML = "";
  locationOutput.innerHTML = "";
  descriptionOutput.innerHTML = "";

  for (let obj of arrContent) {
    // create new elements for each party to live in
    const newButton = document.createElement("button");
    const newName = document.createElement("p");
    const newDate = document.createElement("p");
    const newLocation = document.createElement("p");
    const newDescription = document.createElement("p");

    // put content into new elements
    newButton.textContent = "Delete";
    newButton.setAttribute("class", obj.id);
    newName.textContent = obj.name;
    newDate.textContent = new Date(obj.date).toLocaleString();
    newLocation.textContent = obj.location;
    newDescription.textContent = obj.description;

    // sort elements into correct outputs
    buttonOutput.append(newButton);
    nameOutput.append(newName);
    dateOutput.append(newDate);
    locationOutput.append(newLocation);
    descriptionOutput.append(newDescription);
  }
};

const deleteButton = document.querySelector("#buttons");
deleteButton.addEventListener("click", async function (event) {
  const id = event.target.className;
  await deleteParty(id);
  await renderParties();
});

const form = document.querySelector("form");
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  // get form data into array
  const data = new FormData(event.target);
  const formData = {
    name: data.get("name"),
    description: data.get("description"),
    date: new Date(data.get("date")).toISOString(),
    location: data.get("location"),
  };

  // send array to function to send through api
  await addNewParty(formData);
  await renderParties();
});

// do initial render
renderParties();
