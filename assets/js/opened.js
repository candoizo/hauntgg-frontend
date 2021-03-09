(async () => {
  console.log("Opened.js loaded!");

  const portals_closed_data = await fetch("/datadir/portals/opened/latest.json")
    .then(response => response.json());
    portals_closed_data.sort((a,b) => a.index - b.index);
  const list = document.querySelector("#list");

  let template = list.querySelector("#template");


  // let clone = template.cloneNode(true);
  // list.append(clone);


  portals_closed_data.map(x => {
    console.log("Portal data:", x);

    let clone = template.cloneNode(true);
    // clone.href = x.
    clone.querySelector("h3").innerText = `Opened Portal ${x.index}`
    clone.href = x.href

    let price = x.price > 10000 ? (((x.price / 1000) * 100) / 100).toFixed(2)  + "K" : x.price;

    clone.querySelector("#price").innerText = price
    clone.querySelector("#haunt").innerText = `👻 Haunt ${x.haunt}`

    list.append(clone);
    clone.classList.remove("hidden")

  })

})()
