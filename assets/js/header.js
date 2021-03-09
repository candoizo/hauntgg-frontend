let add_navtoggle = () => {
  let nav = document.querySelector('.navbar-burger');
  nav && nav.addEventListener('click', () => {
    // let menu = document.querySelector(`#` + e.target.dataset.target);
    let menu = document.querySelector("#navMenu");
    toggle_class(menu, 'hidden')
  });
}

let toggle_class = (arg1, c) => {
  if (arg1.classList.contains(c))
    arg1.classList.remove(c);
  else arg1.classList.add(c);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', add_navtoggle());
} else {
  // DOM is ready!
  add_navtoggle();
}
