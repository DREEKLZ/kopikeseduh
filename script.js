const WA_NUMBER = '6289669085603'; // Ganti dengan nomor WhatsApp bisnis, format 62 tanpa tanda +
const products = [
 {id:1,name:'Salut Ethiopia',kind:'beans',kindLabel:'BIJI KOPI UTUH',origin:'Ethiopia · Arabika',price:95000,tag:'SIGNATURE',desc:'Biji kopi pilihan dengan aroma floral dan karakter rasa cerah. Cocok untuk kamu yang suka mengeksplorasi seduhan.',weight:'200 gram',stock:12,image:'assets/salut-coffee.jpg'},
 {id:2,name:'Memorable Colombia',kind:'ground',kindLabel:'KOPI BUBUK',origin:'Colombia · Decaf',price:75000,tag:'DECAF',desc:'Kopi bubuk dengan karakter lembut dan seimbang. Pilihan praktis untuk dinikmati kapan saja.',weight:'200 gram',stock:8,image:'assets/memorable-coffee.jpg'},
 {id:3,name:'Gayo Wine Process',kind:'beans',kindLabel:'BIJI KOPI UTUH',origin:'Aceh · Arabika',price:90000,tag:'SINGLE ORIGIN',desc:'Biji arabika dari dataran tinggi Gayo dengan aroma khas dan lapisan rasa buah yang menarik.',weight:'200 gram',stock:10,image:'assets/gayo-wine.jpg'},
 {id:4,name:'Temanggung Robusta',kind:'ground',kindLabel:'KOPI BUBUK',origin:'Temanggung · Robusta',price:65000,tag:'BOLD & RICH',desc:'Kopi bubuk dengan body tebal dan rasa kuat. Pas untuk seduhan harian dan kopi susu.',weight:'200 gram',stock:15,image:'assets/temanggung-robusta.jpg'},
 {id:5,name:'Arabika Flores',kind:'beans',kindLabel:'BIJI KOPI UTUH',origin:'Flores · Arabika',price:85000,tag:'AROMATIC',desc:'Biji kopi pilihan dengan aroma manis dan karakter yang nyaman dinikmati sebagai kopi hitam.',weight:'200 gram',stock:7,image:'assets/arabika-flores.jpg'},
 {id:6,name:'House Blend Keseduh',kind:'ground',kindLabel:'KOPI BUBUK',origin:'Blend pilihan',price:80000,tag:'DAILY BREW',desc:'Racikan kopi dengan rasa seimbang, cocok untuk teman memulai hari. Sudah digiling agar praktis diseduh.',weight:'200 gram',stock:9,image:'assets/house-blend.jpg'}
];
let cart = JSON.parse(localStorage.getItem('keseduh-cart') || '[]').filter(x => products.some(p => p.id === x.id));
let activeFilter = 'all';
const rupiah = n => new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);
const productCard = p => `<article class="product-card"><div class="product-photo"><img src="${p.image}" alt="Kemasan ${p.name}" loading="lazy" onerror="this.onerror=null;this.src='assets/salut-coffee.jpg'"><span class="tag">${p.tag}</span><span class="kind-pill">${p.kindLabel}</span></div><div class="product-info"><div class="product-meta"><span class="product-category">${p.origin}</span><span class="weight">${p.weight} · Stok: ${p.stock}</span></div><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><span class="price">${rupiah(p.price)}</span><div class="product-actions"><button class="small-btn" onclick="viewProduct(${p.id})" aria-label="Detail ${p.name}">Detail</button><button class="small-btn primary" onclick="addToCart(${p.id})" aria-label="Tambah ${p.name} ke keranjang">+ Keranjang</button></div></div></div></article>`;
function filteredProducts(){let list=[...products];if(activeFilter!=='all')list=list.filter(p=>p.kind===activeFilter);const q=(document.getElementById('searchProducts')?.value||'').trim().toLowerCase();if(q)list=list.filter(p=>`${p.name} ${p.kindLabel} ${p.origin} ${p.desc}`.toLowerCase().includes(q));const sort=document.getElementById('sortProducts')?.value;if(sort==='low')list.sort((a,b)=>a.price-b.price);if(sort==='high')list.sort((a,b)=>b.price-a.price);return list;}
function renderProducts(){document.getElementById('featuredProducts').innerHTML=[products[0],products[1],products[2]].map(productCard).join('');renderShop();}
function renderShop(){const list=filteredProducts();document.getElementById('allProducts').innerHTML=list.length?list.map(productCard).join(''):'<div class="no-results">Kopi yang kamu cari belum ditemukan. Coba kata kunci lain, ya.</div>';document.getElementById('resultCount').textContent=`Menampilkan ${list.length} produk`;}
function setFilter(filter){activeFilter=filter;document.querySelectorAll('.filter-tab').forEach(b=>b.classList.toggle('active',b.dataset.filter===filter));renderShop();}
function saveCart(){localStorage.setItem('keseduh-cart',JSON.stringify(cart));renderCart();}
function addToCart(id){let p=products.find(x=>x.id===id);if(!p)return;let item=cart.find(x=>x.id===id);let inCart=item?item.qty:0;if(inCart>=p.stock){toast('Stok '+p.name+' tidak mencukupi.');return;}if(item)item.qty++;else cart.push({id,qty:1});saveCart();toast('Kopi berhasil ditambahkan ke keranjang.');}
function changeQty(id,delta){let item=cart.find(x=>x.id===id);if(!item)return;let p=products.find(x=>x.id===id);if(delta>0&&item.qty>=p.stock){toast('Stok maksimum '+p.stock+' untuk produk ini.');return;}item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart();}
function removeItem(id){cart=cart.filter(x=>x.id!==id);saveCart();}
function renderCart(){let count=cart.reduce((s,x)=>s+x.qty,0),subtotal=cart.reduce((s,x)=>s+x.qty*products.find(p=>p.id===x.id).price,0);document.getElementById('cartCount').textContent=count;document.getElementById('cartSubtotal').textContent=rupiah(subtotal);let target=document.getElementById('cartItems');if(!cart.length){target.innerHTML='<div class="empty-cart">Belum ada kopi di sini.<br><a href="#shop" onclick="closeCart()">Yuk, pilih kopi favoritmu →</a></div>';return;}target.innerHTML=cart.map(x=>{let p=products.find(p=>p.id===x.id);return `<div class="cart-item"><img src="${p.image}" alt="${p.name}" onerror="this.onerror=null;this.src='assets/salut-coffee.jpg'"><div><h4>${p.name}</h4><small>${p.kindLabel} · ${p.weight}</small><b class="cart-price">${rupiah(p.price)}</b><div class="qty-control"><button onclick="changeQty(${p.id},-1)" aria-label="Kurangi">−</button><span>${x.qty}</span><button onclick="changeQty(${p.id},1)" aria-label="Tambah">+</button></div></div><button class="remove-item" onclick="removeItem(${p.id})">Hapus</button></div>`}).join('');}
function viewProduct(id){
 let p=products.find(x=>x.id===id);
 const sampleReviews=[
  {name:'Rina',rating:5,text:'Aroma kopinya enak dan kemasannya rapi. Cocok untuk teman pagi.'},
  {name:'Dimas',rating:5,text:'Rasanya sesuai deskripsi, pengiriman juga mudah dikonfirmasi.'},
  {name:'Ayu',rating:4,text:'Kopi terasa nikmat dan praktis diseduh. Ingin coba varian lainnya.'}
 ];
 document.getElementById('modalContent').innerHTML=`<div class="modal-product"><img src="${p.image}" alt="${p.name}" onerror="this.onerror=null;this.src='assets/salut-coffee.jpg'"><div class="modal-details"><span class="product-category">${p.kindLabel} · ${p.origin}</span><h2>${p.name}</h2><p>${p.desc}</p><p class="detail-weight">Isi bersih: ${p.weight}</p><p><b>Bahan/jenis:</b> ${p.kindLabel} · ${p.origin}</p><p><b>Isi paket:</b> 1 kemasan kopi ${p.weight}</p><p class="stock-count"><b>Stok tersedia:</b> ${p.stock} pcs</p><div class="price">${rupiah(p.price)}</div><button class="btn btn-light" style="margin-top:24px" onclick="addToCart(${p.id})">Tambah ke keranjang ↗</button><section class="modal-reviews"><h3>Ulasan pembeli</h3><p class="sample-review-note">3 ulasan contoh untuk tampilan — ganti dengan ulasan asli pelanggan sebelum dipublikasikan.</p>${sampleReviews.map(r=>`<article class="modal-review"><div><b>${r.name}</b><span>${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span></div><p>${r.text}</p></article>`).join('')}</section></div></div>`;
 document.getElementById('productModal').classList.add('show');
}
function closeModal(){document.getElementById('productModal').classList.remove('show');}
function openCart(){document.getElementById('cartDrawer').classList.add('open');document.getElementById('overlay').classList.add('show');}
function closeCart(){document.getElementById('cartDrawer').classList.remove('open');document.getElementById('overlay').classList.remove('show');}
function toast(msg){let el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),2200);}
function navigate(){let id=location.hash.replace('#','')||'home';if(!document.getElementById(id))id='home';document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));document.querySelectorAll('.nav-link').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));document.getElementById('mainNav').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'});}
document.getElementById('openCart').addEventListener('click',openCart);document.getElementById('closeCart').addEventListener('click',closeCart);document.getElementById('overlay').addEventListener('click',closeCart);document.getElementById('closeModal').addEventListener('click',closeModal);document.getElementById('productModal').addEventListener('click',e=>{if(e.target.id==='productModal')closeModal()});document.getElementById('menuToggle').addEventListener('click',()=>document.getElementById('mainNav').classList.toggle('open'));document.getElementById('sortProducts').addEventListener('change',renderShop);document.getElementById('searchProducts').addEventListener('input',renderShop);document.querySelectorAll('.filter-tab').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));document.querySelectorAll('[data-filter-link]').forEach(a=>a.addEventListener('click',()=>setFilter(a.dataset.filterLink)));window.addEventListener('hashchange',navigate);
document.getElementById('checkoutBtn').addEventListener('click',()=>{if(!cart.length){toast('Keranjang masih kosong.');return;}let lines=cart.map(x=>{let p=products.find(p=>p.id===x.id);return `• ${p.name} (${p.kindLabel}, ${p.weight}) x${x.qty} — ${rupiah(p.price*x.qty)}`}).join('\n');let total=cart.reduce((s,x)=>s+x.qty*products.find(p=>p.id===x.id).price,0);let message=`Halo Kopi Keseduh, saya ingin memesan:\n${lines}\n\nTotal sementara: ${rupiah(total)}\nMohon konfirmasi stok, pilihan tingkat gilingan bila diperlukan, dan ongkir. Terima kasih.`;window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`,'_blank');});
document.getElementById('contactForm').addEventListener('submit',e=>{e.preventDefault();let d=new FormData(e.target);let msg=`Halo Kopi Keseduh, saya ${d.get('name')} (${d.get('email')}).\n${d.get('message')}`;window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,'_blank');});
renderProducts();renderCart();navigate();


// Ulasan pembeli: tersimpan lokal pada browser/perangkat ini.
const REVIEW_KEY = 'keseduh-reviews';
function renderReviews(){
  const list=document.getElementById('reviewList');
  if(!list)return;
  let reviews=[];
  try{reviews=JSON.parse(localStorage.getItem(REVIEW_KEY)||'[]')}catch(e){reviews=[]}
  if(!reviews.length){list.innerHTML='<p class="review-empty">Belum ada ulasan. Jadilah pembeli pertama yang berbagi pengalaman.</p>';return;}
  list.innerHTML=reviews.slice().reverse().map(r=>`<article class="review-card"><div class="review-top"><b>${escapeReview(r.name)}</b><span>${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span></div><small>${escapeReview(r.product)}</small><p>${escapeReview(r.text)}</p></article>`).join('');
}
function escapeReview(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
const reviewForm=document.getElementById('reviewForm');
if(reviewForm){
  reviewForm.addEventListener('submit',e=>{
    e.preventDefault();
    const d=new FormData(reviewForm);
    const review={name:d.get('reviewName').trim(),product:d.get('reviewProduct').trim(),rating:Number(d.get('reviewRating')),text:d.get('reviewText').trim(),date:new Date().toISOString()};
    let reviews=[];
    try{reviews=JSON.parse(localStorage.getItem(REVIEW_KEY)||'[]')}catch(err){reviews=[]}
    reviews.push(review);
    localStorage.setItem(REVIEW_KEY,JSON.stringify(reviews));
    reviewForm.reset();renderReviews();toast('Terima kasih, ulasan tersimpan di perangkat ini.');
  });
}
renderReviews();
