const setup = () => {

  // do this twice in a then clause
  Promise.resolve(window.EntryPoint.common.erc721.get_closed_portals('listed', 200)).then(
    async x => {

      let listing_array = await window.EntryPoint.common.erc721.parse_listing_array(x);
      console.log(await listing_array[0], await listing_array.reverse()[0]);
      listing_array.map(async (listing) => {
        new_thing(await listing)
      });

      document.querySelector("#web3connect").classList.remove('animate-pulse')
      document.querySelector("#web3connect").innerText = "Metamask + Matic found, using live data!"

    }
  ).then(() => {
    console.log("Successfully loaded past entries! listen for new ones");
    window.EntryPoint.common.erc721.export_new_listings(new_thing);
  }).catch(e => console.log("fail:", e));
}

let new_thing = async (res) => {
  console.log('new thing? ', res);

  // make sure its IS a potion, and not "the void" 👻
  // if (!window.EntryPoint.common.potion_types().includes(res.type) || res.type == 0) {
  //   return;
  // }

  // if not a closed portal, nty
  if (res.type != 0) return;

  let list = document.querySelector("#list");
  let node = document.querySelector('a.filter#template'); //avoid grabbing a copied template
  let clone = node.cloneNode(true);
  clone.classList.remove("filter");
  clone.id = res.href;

  clone.href += res.href;
  // clone.querySelector("img.mainimg").src += res.type + ".svg"
  clone.querySelector('#price').innerText = humanize_num(res.price);
  // clone.querySelector("#haunt").innerText = res.rarity;
  // clone.dataset.rarity = res.rarity;
  // clone.dataset.name = res.name;
  clone.dataset.price = res.price;
  // clone.dataset.quanity = res.quanity;
  clone.dataset.index = res.href; // lowest listing is oldest
  clone.dataset.number = res.number;
  // c++;
  clone.querySelector("h3").innerText = "Unopened Portal #" + res.number;
  clone.classList.add(res.rarity);

  // no rarity for portals yet. @todo for open portals maybe
  // // if rarity filter is active, add the .hide mod
  // let rarity_filter_opt = document.querySelector("#filter");
  // if (
  //   rarity_filter_opt.value.toLowerCase() !== res.rarity && rarity_filter_opt.selectedIndex > 0
  // ) clone.classList.add("hide")

  let insert_at = 0; // usually add to top for latest sort default
  let sort_filter_opt = document.querySelector("#sort");
  if (sort_filter_opt.selectedIndex == 1) {
    // sort by price instead of latest

    // map until you find a price higher than yours, bail, insert
    [...list.children].some((x, index) => {
      console.log('mapping children for price, im', x.dataset, res);
      if (parseInt(x.dataset.price) > parseInt(res.price)) {
        console.log("sorting by price, so inserting this at: ", index)
        return (insert_at = index);
        // return true;

      }
    });
  }

  list.insertBefore(clone, list.children[insert_at]);


  // if (list.children.length > 250) {
  //   list.children[list.children.length].remove();
  //   console.log("removed node because too many!");
  //   // elem.parentNode.removeChild(list.children[list.children.length]);
  // }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mm_check(setup));
} else {
  // DOM is ready!
  mm_check(setup);
}
