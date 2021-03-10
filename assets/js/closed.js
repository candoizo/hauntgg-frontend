// (async () => {
//
//   let portals_closed_data = await fetch("/datadir/portals/closed/latest.json")
//     .then(response => response.json());
//
//   // something like query if then do dx
//   let d = document.querySelector("select").selectedIndex;
//   if (d == 0)
//     portals_closed_data.sort((a, b) => a.index - b.index);
//   else if (d == 1)
//     portals_closed_data.sort((a, b) => a.price - b.price);
//
//   let list = document.querySelector("#list");
//   let template = list.querySelector("#template");
//   portals_closed_data.map(x => {
//     // console.log("Portal data:", x);
//
//     let clone = template.cloneNode(true);
//     clone.querySelector("h3").innerText = `Unopened Portal ` + x.index
//     clone.href = x.href
//     clone.dataset.price = x.price;
//     clone.dataset.index = x.index;
//
//     let price = x.price > 10000 ? (((x.price / 1000) * 100) / 100).toFixed(2) + "K" : x.price;
//
//     clone.querySelector("#price").innerText = price
//     clone.querySelector("#haunt").innerText = '👻 Haunt '+ x.haunt
//     list.append(clone);
//     clone.classList.remove("hidden")
//
//   })
//
// })()

let resort = () => {

  let list = document.querySelector("#list");
  let d = document.querySelector("select").selectedIndex;

  if (d == 0)
  [...list.children]
  .sort((a,b)=>parseInt(a.dataset.price) - parseInt(b.dataset.price))
  .forEach(node=>list.appendChild(node));
  // [...list.children]
  // .sort((a,b)=>parseInt(a.querySelector('#price').innerText) - parseInt(b.querySelector('#price').innerText))
  // .forEach(node=>list.appendChild(node));
  else if (d == 1)
  [...list.children]
  .sort((a,b)=>parseInt(a.dataset.index) - parseInt(b.dataset.index))
  .forEach(node=>list.appendChild(node));
  // [...list.children]
  // .sort((a,b)=>parseInt(a.querySelector('h3').innerText) - parseInt(b.querySelector('#price').innerText))
  // .forEach(node=>list.appendChild(node));


  // let d = document.querySelector("select").selectedIndex;
  // if (d == 0)
  //   list.sort((a, b) => parseInt(a.querySelector('#price').innerText) - parseInt(b.querySelector('#price').innerText))
  // else if (d == 1)
  //   list.sort((a, b) => a.querySelector("h3").innerText.split(" ")[2] - b.querySelector("h3").innerText.split(" ")[2]);

  // list.sort((a,b) => )
}
