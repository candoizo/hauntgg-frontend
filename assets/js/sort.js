let resort = () => {

  let list = document.querySelector("#list");
  let d = document.querySelector("select#sort").selectedIndex;

  if (d == 0)
  [...list.children]
  .sort((a,b)=>parseInt(a.dataset.price) - parseInt(b.dataset.price))
  .forEach(node=>list.appendChild(node));

  else if (d == 1)
  [...list.children]
  .sort((a,b)=>parseInt(a.dataset.index) - parseInt(b.dataset.index))
  .forEach(node=>list.appendChild(node));
}

let crap_filter = () => {
  let list = document.querySelector("#list");
  let d = document.querySelector("select#filter").selectedIndex;

  if (d == 0) {
    // unhide all
    [...list.children].forEach(x => {
      x.classList.remove("hide")
    })
  }

  else if (d == 1) {
    // xp only
    [...list.children].forEach(x => {
      if (!x.querySelector('h3').innerText.toLowerCase().includes("xp"))
      x.classList.add("hide")
      else x.classList.remove("hide")
    })
  }

  else if (d == 2) {
    // kinship only
    [...list.children].forEach(x => {
      if (!x.querySelector('h3').innerText.toLowerCase().includes("kinship"))
      x.classList.add("hide")
      else x.classList.remove("hide")
    })
  }
};


let rarity_filter = (e) => {
  console.log("rarity_filter", e);
  let list = document.querySelector("#list");
  // let select_rarity = document.querySelector("select#filter").value;

  if (e.toLowerCase() === "all") {
    // unhide all
    [...list.children].forEach(x => {
      x.classList.remove("hide")
    })
  }

  else {
    // xp only
    [...list.children].forEach(x => {
      if (x.dataset.rarity.toLowerCase() !== e.toLowerCase())
      x.classList.add("hide")
      else x.classList.remove("hide")
    })
  }

};


let search_filter = (e) => {
  console.log("Search filter", e);

  let list = document.querySelector("#list");

  [...list.children].map(x => {
    if (e.length > 0 && !x.dataset.name.toLowerCase().includes(e.toLowerCase()))
    x.classList.add("notsearched")
    else x.classList.remove("notsearched")
  });

  let select_rarity = document.querySelector("select#filter").value;
  // if (select_rarity.toLowerCase() !== "all")
  rarity_filter(select_rarity)

}
