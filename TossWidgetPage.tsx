import { useEffect } from "react";

declare global {
  interface Window {
    TossPayments: any;
  }
}

const TossWidgetPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.tosspayments.com/v1/payment";
    script.async = true;
    script.onload = () => {
      if (!window.TossPayments) {
        alert("⚠ TossPayments 로딩 실패");
        return;
      }

      const clientKey = "test_ck_5OWRapdA8dP5dB4NPlyB8o1zEqZK";
      const tossPayments = window.TossPayments(clientKey);

      const payButton = document.getElementById("pay-button");
      payButton?.addEventListener("click", () => {
        tossPayments.requestPayment("카드", {
          amount: 5000,
          orderId: String(Date.now()),
          orderName: "아메리카노 2잔",
          successUrl: "http://localhost:8080/payment/success",
          failUrl: "http://localhost:8080/payment/fail",
        });
      });
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>💳 Toss 결제창 테스트 (React)</h2>
      <button id="pay-button">결제하기</button>
    </div>
  );
};

export default TossWidgetPage;
