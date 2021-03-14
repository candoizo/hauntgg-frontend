let humanize_num = (x) => {
  return x > 10000 ? (((x / 1000) * 100) / 100).toFixed(2) + "K" : x;
}

let invert_list = (list) => {
  // list should be an interatble element with .children property
  if (list)
    [...list.children].reverse().map(node => list.appendChild(node));

}

// checks for metamask, calls function if successful
let mm_check = async (cb) => {
  let connect = document.querySelector("#web3connect");
  try {

    let dapp = await window.EntryPoint.mm.on_metamask_matic_network;

    if (dapp) {
      connect.innerText = "Metamask + Matic found! Loading live data...";
      cb();
    } else {
      throw dapp;
    }

  } catch (e) {
    if (connect) {
      connect.innerText = "😞 Metamask / Matic not found, want a snapshot?";
      connect.href = "./snapshot/";
      connect.classList.remove("animate-pulse");
    } else console.log("tried to mm check, could find the web3 connect btn");
  }
};

// takes a dataset tag to try and sort the listings by
// limited to numeric sorting i believe
let smart_sort = (sortby) => {

  console.log("smart_sort this list by: ", sortby);

  let list = document.querySelector("#list");

  let nodes = [...list.children];

  if (nodes)
    nodes.sort((a, b) => parseInt(b.dataset[sortby]) - parseInt(a.dataset[sortby]));


  // by default we would sort high index on top because newer
  if (sortby === "price" || sortby === "number") // same for "number" in portal section
  nodes.reverse(); // we want to sort low by default with price

  let invert = document.querySelector("#invert").checked;
  if (invert) nodes.reverse()

  // i could cancel out the reverse

  nodes.map(node => list.appendChild(node));


    // let d = document.querySelector("select#sort").selectedIndex;
    //
    // // latest listing
    // if (d == 0) {
    //
    //   let sort = [...list.children]
    //     .sort((a, b) => parseInt(b.dataset.index) - parseInt(a.dataset.index));
    //
    //   // if (invert) sort = sort.reverse();
    //   sort.forEach(node => list.appendChild(node));
    // }
    //
    // // price
    // if (d == 1) {
    //   let sort = [...list.children]
    //     .sort((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price))
    //
    //   // if (invert) sort = sort.reverse();
    //   sort.forEach(node => list.appendChild(node));
    // }

    // @todo: maybe bring this before the above and reverse before sorting
    // let invert = document.querySelector("#invert").checked;
    // if (invert) invert_list(list);

  // else if (d == 1)
  // [...list.children]
  // .sort((a,b)=>parseInt(a.dataset.index) - parseInt(b.dataset.index))
  // .forEach(node=>list.appendChild(node));
}
