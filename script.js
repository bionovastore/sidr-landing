let data = {};
let deliveryPrices = {
  "أدرار": { desk: 600, home: 1100 },
  "الشلف": { desk: 400, home: 700 },
  "الأغواط": { desk: 500, home: 900 },
  "أم البواقي": { desk: 400, home: 800 },
  "باتنة": { desk: 400, home: 800 },
  "بجاية": { desk: 400, home: 700 },
  "بسكرة": { desk: 500, home: 900 },
  "بشار": { desk: 600, home: 1100 },
  "البليدة": { desk: 250, home: 500 },
  "البويرة": { desk: 400, home: 650 },
  "تمنراست": { desk: 800, home: 1300 },
  "تبسة": { desk: 500, home: 800 },
  "تلمسان": { desk: 400, home: 800 },
  "تيارت": { desk: 400, home: 800 },
  "تيزي وزو": { desk: 400, home: 650 },
  "الجزائر": { desk: 200, home: 400 },
  "الجلفة": { desk: 500, home: 900 },
  "جيجل": { desk: 400, home: 700 },
  "سطيف": { desk: 400, home: 700 },
  "سعيدة": { desk: 400, home: 800 },
  "سكيكدة": { desk: 400, home: 700 },
  "سيدي بلعباس": { desk: 400, home: 700 },
  "عنابة": { desk: 400, home: 700 },
  "قالمة": { desk: 400, home: 800 },
  "قسنطينة": { desk: 400, home: 700 },
  "المدية": { desk: 400, home: 600 },
  "مستغانم": { desk: 400, home: 700 },
  "المسيلة": { desk: 500, home: 800 },
  "وهران": { desk: 400, home: 700 },
  "بومرداس": { desk: 350, home: 600 },
  "تيبازة": { desk: 350, home: 600 },
  "عين الدفلى": { desk: 400, home: 600 },
  "النعامة": { desk: 500, home: 1000 },
  "عين تموشنت": { desk: 400, home: 700 },
  "غرداية": { desk: 500, home: 1000 }
};

// Load wilayas
window.onload = function () {
  data = algeria;
  loadWilayas();
};

// Load wilayas
function loadWilayas() {
  const wilayaSelect = document.getElementById("wilaya");
  wilayaSelect.innerHTML = '<option value="">اختر الولاية</option>';

  Object.keys(data).forEach(w => {
    let opt = document.createElement("option");
    opt.value = w;
    opt.textContent = w;
    wilayaSelect.appendChild(opt);
  });
}

// communes
function updateCommunes() {
  const w = document.getElementById("wilaya").value;
  const c = document.getElementById("commune");

  c.innerHTML = '<option value="">اختر البلدية</option>';

  if (data[w]) {
    data[w].forEach(cm => {
      let opt = document.createElement("option");
      opt.value = cm;
      opt.textContent = cm;
      c.appendChild(opt);
    });
  }
}

// PRICE CALCULATION
function updatePrice() {
  const wilaya = document.getElementById("wilaya").value;
  const delivery = document.getElementById("delivery").value;

  if (!wilaya || !deliveryPrices[wilaya]) return;

  const price = deliveryPrices[wilaya][delivery];

  document.getElementById("priceBox").innerText =
    `💰 سعر التوصيل: ${price} دج`;
}

// Telegram order
document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const lastname = document.getElementById("lastname").value;
  const phone = document.getElementById("phone").value;
  const wilaya = document.getElementById("wilaya").value;
  const commune = document.getElementById("commune").value;
  const delivery = document.getElementById("delivery").value;

  const price = deliveryPrices[wilaya][delivery];

  const message = `
🟢 طلب جديد - بودرة السدر

👤 الاسم: ${name} ${lastname}
📞 الهاتف: ${phone}
📍 الولاية: ${wilaya}
🏙 البلدية: ${commune}
🚚 التوصيل: ${delivery}
💰 التوصيل: ${price} دج
💵 السعر الإجمالي: ${2300 + price} دج
`;

  const botToken = "8955038552:AAH5UrtfQtNtkxIoFx7OvfRK7K1FNxV44Mk";
  const chatId = "-5334151238";

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  });

  alert("تم إرسال طلبك بنجاح 🌿");
});