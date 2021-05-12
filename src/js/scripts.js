(function () {
  const fakeButton = document.querySelector(".hamburger");
  const menu = document.querySelector("[data-menu]");
  const nav = document.querySelector(".nav--fallback");
  const navlinks = document.querySelector(".nav--fallback__links");
  const navlinkslist = document.querySelector(".nav--fallback__links__list");
  nav.classList.add("nav");
  nav.classList.remove("nav--fallback");

  navlinks.classList.add("nav__links");
  navlinks.classList.remove("nav--fallback__links");

  navlinkslist.classList.add("nav__links__list");
  navlinkslist.classList.remove("nav--fallback__links__list");

  const toggleMenuButton = document.createElement("button");
  toggleMenuButton.innerHTML = `<span class="hamburger__container" tabindex="-1"> 
                                <span class="hamburger__bars"></span> 
                                </span>`;
  toggleMenuButton.setAttribute("aria-expanded", false);
  toggleMenuButton.setAttribute("aria-controls", "menu");
  toggleMenuButton.classList.add("hamburger__button");

  fakeButton.parentNode.replaceChild(toggleMenuButton, fakeButton);

  toggleMenuButton.addEventListener("click", function () {
    let expanded = this.getAttribute("aria-expanded") === "true" || false;
    this.setAttribute("aria-expanded", !expanded);
    if (menu.hidden) {
      toggleMenuButton.classList.add("hamburger--active");
    } else {
      toggleMenuButton.classList.remove("hamburger--active");
    }
    menu.hidden = !menu.hidden;
  });
  document.querySelector(".nav__links").addEventListener("click", (e) => {
    menu.hidden = true;
    toggleMenuButton.classList.remove("hamburger--active");
  });
  menu.hidden = true;

  const mediaquery = window.matchMedia("(min-width: 840px)");
  const last = document.getElementById("last");
  if (mediaquery.matches) {
    new Glide(".glide", {
      perView: 3,
      bound: last,
      gap: "10px",
    }).mount();

    //Observers
    const inViewport = (entries, observer) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
        if (entry.isIntersecting) {
          Obs.unobserve(entry.target);
        }
      });
    };
    const Obs = new IntersectionObserver(inViewport, {threshold: 0.1});
    const obsOptions = {};

    const ELs_inViewport = document.querySelectorAll("[data-inviewport]");
    ELs_inViewport.forEach((EL) => {
      Obs.observe(EL, obsOptions);
    });
  } else {
    new Glide(".glide", {
      perView: 1,
      gap: "-10px",
    }).mount();
    document.querySelectorAll("[data-inviewport]").forEach((e) => {
      e.removeAttribute("data-inviewport");
      e.classList.add("is-inViewport");
    });
  }
  const io = new IntersectionObserver(
    entries => {
        console.log(entries[0]);
        if (entries[0].isIntersecting) {
            var recaptchaScript = document.createElement('script');
            recaptchaScript.src = 'https://www.google.com/recaptcha/api.js';
            recaptchaScript.defer = true;
            document.body.appendChild(recaptchaScript);
        }
    }
);
io.observe(document.querySelector('.contact__form'));

  lightGallery(document.getElementById('selector2'));

  lightGallery(document.getElementById('selector3'));

  document.getElementById('cform').addEventListener('submit', e => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const subject = document.querySelector('#subject').value;
    const message = document.querySelector('#message').value;
    const captcha = document.querySelector('#g-recaptcha-response').value;

     fetch('/contact', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message, captcha: captcha })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.msg);
         if(data.success) window.location.reload();
      });
  });
})();

WebFontConfig = {
  google: {
    families: ['Noto Sans', 'Tangerine', 'Handlee']
  }
};
(function(d) {
  var wf = d.createElement('script'), s = d.scripts[0];
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
  wf.async = true;
  s.parentNode.insertBefore(wf, s);
})(document);