const menuButton=document.querySelector(".menu-toggle");
const nav=document.querySelector("#primary-nav");
menuButton?.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded",String(open));
});
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

document.querySelectorAll("[data-compare]").forEach(box=>{
  const slider=box.querySelector('input[type="range"]');
  slider.addEventListener("input",()=>box.style.setProperty("--pos",slider.value+"%"));
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const lightbox=document.querySelector(".lightbox");
const lightboxImage=lightbox.querySelector("img");
document.querySelectorAll(".gallery-item").forEach(item=>item.addEventListener("click",()=>{
  lightboxImage.src=item.dataset.full;
  lightboxImage.alt=item.querySelector("img").alt;
  lightbox.showModal();
}));
lightbox.querySelector("button").addEventListener("click",()=>lightbox.close());
lightbox.addEventListener("click",e=>{if(e.target===lightbox)lightbox.close();});
document.querySelector("#year").textContent=new Date().getFullYear();