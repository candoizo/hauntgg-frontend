let humanize_num = (x) => {
  return x > 10000 ? (((x / 1000) * 100) / 100).toFixed(2) + "K" : x;
}

let invert_list = (e) => {

  let list = document.querySelector("#list");
  if (e)
    [...list.children].reverse().map(node => list.appendChild(node));

}
