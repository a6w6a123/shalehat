function searchBooking() {
    const bookingCode = document.getElementById("bookingCode").value;
    // هنا يمكنك إضافة كود للبحث عن الحجز باستخدام كود الحجز
    document.getElementById("bookingDetails").innerText = `تفاصيل الحجز لكود: ${bookingCode}`;
}

// إضافة وظائف أخرى حسب الحاجة
let chalets = []; // مصفوفة لتخزين الشاليهات

// وظيفة لإضافة شاليه
function addChalet(name, price, checkIn, checkOut, instructions) {
    const chalet = {
        name,
        price,
        checkIn,
        checkOut,
        instructions
    };
    chalets.push(chalet);
    localStorage.setItem('chalets', JSON.stringify(chalets)); // حفظ الشاليهات في localStorage
}

// وظيفة لعرض الشاليهات في الصفحة الرئيسية
function displayChalets() {
    const chaletSection = document.getElementById('chalets');
    chaletSection.innerHTML = ''; // مسح المحتوى السابق

    const savedChalets = JSON.parse(localStorage.getItem('chalets')) || [];

    savedChalets.forEach(chalet => {
        const chaletDiv = document.createElement('div');
        chaletDiv.innerHTML = `
            <h3>${chalet.name}</h3>
            <p>السعر: ${chalet.price} ج.م.</p>
            <p>وقت الدخول: ${chalet.checkIn}</p>
            <p>وقت الخروج: ${chalet.checkOut}</p>
            <p>تعليمات الدخول: ${chalet.instructions}</p>
        `;
        chaletSection.appendChild(chaletDiv);
    });
}

// استدعاء الوظيفة لعرض الشاليهات عند تحميل الصفحة
window.onload = function() {
    displayChalets();
};

// تعديل وظيفة الإضافة في لوحة التحكم
document.getElementById('chaletForm').onsubmit = function(event) {
    event.preventDefault();
    const formElements = event.target.elements;
    addChalet(formElements[0].value, formElements[1].value, formElements[2].value, formElements[3].value, formElements[4].value);
    event.target.reset(); // إعادة تعيين النموذج
    displayChalets(); // تحديث عرض الشاليهات
};
function displayChalets() {
    const chaletSection = document.getElementById('chalets');
    chaletSection.innerHTML = ''; // مسح المحتوى السابق

    const savedChalets = JSON.parse(localStorage.getItem('chalets')) || [];

    savedChalets.forEach((chalet, index) => {
        const chaletDiv = document.createElement('div');
        chaletDiv.innerHTML = `
            <h3>${chalet.name}</h3>
            <p>السعر: ${chalet.price} ج.م.</p>
            <p>وقت الدخول: ${chalet.checkIn}</p>
            <p>وقت الخروج: ${chalet.checkOut}</p>
            <p>تعليمات الدخول: ${chalet.instructions}</p>
            <button onclick="bookChalet(${index})">احجز الآن</button>
        `;
        chaletSection.appendChild(chaletDiv);
    });
}

// دالة لحجز الشاليه
function bookChalet(index) {
    const savedChalets = JSON.parse(localStorage.getItem('chalets'));
    const selectedChalet = savedChalets[index];
    alert(`لقد اخترت حجز الشاليه: ${selectedChalet.name}`);
    // هنا يمكنك إضافة منطق لإكمال عملية الحجز، مثل توجيه المستخدم إلى صفحة جديدة أو نموذج حجز
}
document.addEventListener('DOMContentLoaded', async function() {
    const bookingCode = '123456'; // هذا الكود يجب أن يتم استرجاعه بناءً على الحجز الفعلي
    try {
        // استرجاع بيانات الحجز بناءً على كود الحجز
        const bookingResponse = await fetch(`/api/bookings/${bookingCode}`);
        if (!bookingResponse.ok) throw new Error('Failed to fetch booking data');
        const bookingData = await bookingResponse.json();

        // ملء البيانات في الصفحة
        document.getElementById('bookingCode').textContent = bookingData.bookingCode;
        document.getElementById('customerName').textContent = bookingData.name;
        document.getElementById('customerPhone').textContent = bookingData.phone;
        document.getElementById('bookingDate').textContent = bookingData.date;
        document.getElementById('depositPaid').textContent = bookingData.depositPaid;
        document.getElementById('insurancePaid').textContent = bookingData.insurancePaid;

        // جلب بيانات الشاليه
        const chaletResponse = await fetch(`/api/chalets/${bookingData.chaletId}`);
        if (!chaletResponse.ok) throw new Error('Failed to fetch chalet data');
        const chaletData = await chaletResponse.json();

        // ملء بيانات الشاليه
        document.getElementById('chaletName').textContent = chaletData.name;
        document.getElementById('chaletPrice').textContent = chaletData.price;
        document.getElementById('checkInTime').textContent = chaletData.checkIn;
        document.getElementById('checkOutTime').textContent = chaletData.checkOut;

    } catch (error) {
        console.error(error);
        alert('حدث خطأ أثناء جلب البيانات.');
    }
});
