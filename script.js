// PRODUK
const products = [
    { id:1, name:"Akun Roblox (Fist It)", price:40000, img:"img/gambar1.jpg" },
    { id:2, name:"Akun Roblox (Fist It)", price:35000, img:"img/gambar2.jpg" },
    { id:3, name:"Akun Roblox (Fist It)", price:40000, img:"https://via.placeholder.com/300x150?text=Roblox" }
];

const cart = [];


// ✅ CEK apakah produk sudah dibeli
function isBought(id) {
    return localStorage.getItem("bought_" + id) === "1";
}

// ✅ Tandai produk sebagai sudah dibeli
function setBought(id) {
    localStorage.setItem("bought_" + id, "1");
}


// Tampilkan Produk
function renderProducts() {
    let html = "";
    products.forEach(p => {

        // ✅ Jika sudah dibeli, tombol diganti
        const disabled = isBought(p.id) ? "disabled" : "";
        const btnText = isBought(p.id) ? "Sudah Dibeli ✅" : "Beli";

        html += `
        <div class='card'>
            <img src='${p.img}' alt='${p.name}' onclick="openImgModal('${p.img}')">
            <h3>${p.name}</h3>
            <p>Harga: Rp ${p.price.toLocaleString()}</p>

            <button class='btn' id="btn-${p.id}" onclick='addToCart(${p.id})' ${disabled}>
                ${btnText}
            </button>
        </div>
        `;
    });

    document.getElementById("productList").innerHTML = html;
}


// Tambah ke Keranjang
function addToCart(id) {

    // ✅ Cegah diclick kalau sudah dibeli
    if (isBought(id)) {
        alert("Produk ini sudah kamu beli ✅");
        return;
    }

    const item = products.find(p => p.id === id);
    cart.push(item);
    renderCart();
    toggleCart(true);
}


// Tampilkan Keranjang
function renderCart() {
    let html = "";
    cart.forEach((c, i) => {
        html += `
        <div style='margin-bottom:10px; border-bottom:1px solid #333; padding-bottom:10px;'>
            ${c.name} - Rp ${c.price.toLocaleString()}<br>
            <button class='btn' style='background:red' onclick='removeItem(${i})'>Hapus</button>
        </div>
        `;
    });

    document.getElementById("cartItems").innerHTML = html || "Keranjang kosong";
}


// Hapus item
function removeItem(i) {
    cart.splice(i,1);
    renderCart();
}


// Show/Hide keranjang
function toggleCart(force) {
    const box = document.getElementById("cartBox");
    if(force === true) box.classList.add("show");
    else box.classList.toggle("show");
}


// ✅ CHECKOUT — Langsung kirim ke WhatsApp
function checkout() {

    if(cart.length === 0) return alert("Keranjang kosong!");

    const total = cart.reduce((a,b) => a + b.price, 0);

    let waText = "Pesanan Baru:%0A%0A";

    cart.forEach(item => {
        waText += "- " + item.name + " (Rp " + item.price.toLocaleString() + ")%0A";

        // ✅ Kunci produk supaya tidak bisa dibeli lagi
        setBought(item.id);

        // ✅ Ubah tombol pada halaman produk
        const btn = document.getElementById("btn-" + item.id);
        if (btn) {
            btn.disabled = true;
            btn.innerText = "Sudah Dibeli ✅";
        }
    });

    waText += "%0ATotal: Rp " + total.toLocaleString() + "%0A";
    waText += "%0ASiap diproses admin.";

    window.open("https://wa.me/62881026466058?text=" + waText);

    alert("✅ Pesanan berhasil dikirim!");

    cart.length = 0;
    renderCart();
}


// Fullscreen Gambar
function openImgModal(src) {
    document.getElementById("modalImg").src = src;
    document.getElementById("imgModal").style.display = "flex";
}

function closeImgModal() {
    document.getElementById("imgModal").style.display = "none";
}

renderProducts();