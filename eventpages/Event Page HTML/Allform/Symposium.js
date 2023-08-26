
async function onsubmit(){
  var Name = document.getElementById("Name");
    var Collegename = document.getElementById("Collegename");
    var Email= document.getElementById("Email");
    var stream= document.getElementById("stream");
    var depart= document.getElementById("depart");
    var Whatsappnum = document.getElementById("Whatsappnum");
    var Altnum= document.getElementById("Altnum");
  var details ={Name,Collegename,Email,stream,depart,Whatsappnum,Altnum};

  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);

  const dataToSend = {
    details: JSON.stringify(details),
    eventId: "88887e9f-787e-4382-abdd-bc69fe8f43c4",
  };

  console.log(dataToSend);

  script.onload = async () => {
    await fetch("https://eutopia-2.onrender.com/register/create-order", {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((t) => {
        if (t.status === 400) {
          alert("Already registered");
          return;
        }
        t.json();
      })
      .then((data) => {
        if (data.currency === undefined) {
          alert("Free Event! You are now registered");
          return;
        }
        const options = {
          key: "rzp_live_eHbQVVuI7h7HAQ",
          currency: data.currency,
          amount: data.amount,
          order_id: data.id,
          name: "Symposium Registration",
          description: "Thank you for Registering!",
          notes: data.notes,
          handler: function (response) {
            alert("Payment Successful");
            window.location.pathname("/index.html")
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      })
      .catch((e) => {
        alert("Something went wrong please log in again and try again");
        localStorage.removeItem("token");
        window.location.pathname = "/sign-in/signIN.html";
        console.error(e);
        return;
      });
  };
}

const submitBtn = document.getElementById("symp_submit");

submitBtn.addEventListener("click", onsubmit);