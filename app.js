// NÁCAR BEAUTY — personalizá estos datos antes de publicar.
const BUSINESS = {
  whatsapp: "573000000000", // Reemplazar por el número real: código país + número, sin + ni espacios.
  currency: "COP",
  locale: "es-CO"
};

const services = [
  {name:"Manicure & Pedicure", category:"Uñas", icon:"✧", description:"Cuidado de manos y pies, esmaltado y embellecimiento.", price:"Desde $35.000"},
  {name:"Uñas: sistemas y diseño", category:"Uñas", icon:"♡", description:"Aplicación, mantenimiento y diseños personalizados.", price:"Desde $60.000"},
  {name:"Corte & Peinado", category:"Cabello", icon:"✦", description:"Cortes, brushing, peinados y asesoría de estilo.", price:"Desde $30.000"},
  {name:"Color & Tratamientos", category:"Cabello", icon:"❋", description:"Coloración, hidratación y tratamientos capilares.", price:"Cotizar"},
  {name:"Maquillaje", category:"Maquillaje", icon:"✺", description:"Maquillaje social y para ocasiones especiales.", price:"Desde $80.000"},
  {name:"Depilación", category:"Estética", icon:"✧", description:"Servicios de depilación y cuidado de la piel.", price:"Desde $20.000"},
  {name:"Cuidado facial", category:"Estética", icon:"☼", description:"Rituales de limpieza y cuidado facial.", price:"Desde $55.000"},
  {name:"Cuidado corporal", category:"Estética", icon:"♡", description:"Experiencias de bienestar y cuidado corporal.", price:"Cotizar"},
  {name:"Asesoría beauty", category:"Asesoría", icon:"✦", description:"Orientación para elegir productos y rutinas.", price:"Consultar"}
];

const products = [
  {name:"Ritual hidratante", category:"Skincare", description:"Producto demostrativo para cuidado diario.", price:45000, image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80"},
  {name:"Sérum facial", category:"Skincare", description:"Producto demostrativo para tu catálogo.", price:58000, image:"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80"},
  {name:"Cuidado capilar", category:"Cabello", description:"Línea demostrativa de cuidado del cabello.", price:52000, image:"https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=700&q=80"},
  {name:"Kit profesional", category:"Uñas", description:"Insumos demostrativos para manicure.", price:69000, image:"https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=700&q=80"},
  {name:"Paleta de maquillaje", category:"Maquillaje", description:"Artículo demostrativo para maquillaje.", price:75000, image:"https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=80"},
  {name:"Crema corporal", category:"Skincare", description:"Producto demostrativo de hidratación.", price:39000, image:"https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=700&q=80"},
  {name:"Accesorios beauty", category:"Uñas", description:"Complementos para tu rutina de belleza.", price:28000, image:"https://images.unsplash.com/photo- nail-tools?auto=format&fit=crop&w=700&q=80"},
  {name:"Tratamiento capilar", category:"Cabello", description:"Producto demostrativo para el cabello.", price:62000, image:"https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=700&q=80"}
];

const serviceGrid = document.getElementById("serviceGrid");
const productGrid = document.getElementById("productGrid");
const bookingService = document.getElementById("bookingService");
const toast = document.getElementById("toast");
let cart = [];

function renderServices(){
  serviceGrid.innerHTML = services.map((s,i)=>`
    <article class="service-card">
      <span class="service-icon">${s.icon}</span>
      <h3>${s.name}</h3>
      <p>${s.description}</p>
      <div class="service-bottom"><span class="service-price">${s.price}</span><a class="service-book" href="#reservar" data-service="${s.name}">Reservar ↗</a></div>
    </article>`).join("");
  bookingService.innerHTML = '<option value="">Seleccioná un servicio</option>' + services.map(s=>`<option value="${s.name}">${s.name}</option>`).join("");
}
function money(value){return new Intl.NumberFormat(BUSINESS.locale,{style:"currency",currency:BUSINESS.currency,maximumFractionDigits:0}).format(value)}
function renderProducts(category="Todos"){
  const shown = category==="Todos" ? products : products.filter(p=>p.category===category);
  productGrid.innerHTML = shown.map(p=>`
    <article class="product-card">
      <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80'">
      <div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><p>${p.description}</p>
      <div class="product-footer"><span class="product-price">${money(p.price)}</span><button class="add-cart" data-product="${p.name}">Agregar +</button></div></div>
    </article>`).join("");
}
function showToast(message){
  toast.textContent=message; toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),2400);
}
document.getElementById("categoryFilters").addEventListener("click",e=>{
  const btn=e.target.closest("[data-category]"); if(!btn)return;
  document.querySelectorAll(".filter-pill").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active"); renderProducts(btn.dataset.category);
});
productGrid.addEventListener("click",e=>{
  const btn=e.target.closest("[data-product]"); if(!btn)return;
  cart.push(btn.dataset.product);
  document.getElementById("cartCount").textContent=cart.length;
  showToast(`${btn.dataset.product} agregado a tu bolsa.`);
});
serviceGrid.addEventListener("click",e=>{
  const link=e.target.closest("[data-service]"); if(!link)return;
  bookingService.value=link.dataset.service;
});
document.getElementById("bookingDate").min=new Date().toISOString().split("T")[0];
document.getElementById("bookingForm").addEventListener("submit",e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(e.currentTarget).entries());
  const booking={...data,id:Date.now(),status:"Pendiente"};
  const saved=JSON.parse(localStorage.getItem("nacarBookings")||"[]");
  saved.push(booking); localStorage.setItem("nacarBookings",JSON.stringify(saved));
  const message=`Hola, quiero solicitar una cita en NÁCAR BEAUTY.%0A Nombre: ${encodeURIComponent(data.name)}%0A Servicio: ${encodeURIComponent(data.service)}%0A Fecha: ${encodeURIComponent(data.date)}%0A Hora: ${encodeURIComponent(data.time)}%0A Teléfono: ${encodeURIComponent(data.phone)}%0A Notas: ${encodeURIComponent(data.notes||"Sin notas")}`;
  document.getElementById("bookingMessage").textContent="Solicitud guardada en este dispositivo. Abrimos WhatsApp para que puedas enviarla y confirmar disponibilidad.";
  if(BUSINESS.whatsapp && !BUSINESS.whatsapp.includes("000000")){
    window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${message}`,"_blank","noopener");
  } else {
    showToast("Configurá el WhatsApp comercial en app.js para recibir reservas.");
  }
  e.currentTarget.reset();
});
document.getElementById("whatsappLink").href=`https://wa.me/${BUSINESS.whatsapp}`;
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
renderServices(); renderProducts();
