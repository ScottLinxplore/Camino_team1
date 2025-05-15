import { useState } from "react";
import styles from "./Page4.module.css";
import CheckoutSteps from "../../features/packageTour/page4/CheckoutSteps";
import PassengerForm from "../../features/packageTour/page4/PassengerForm";
import ContactForm from "../../features/packageTour/page4/ContactForm";
import EmergencyContact from "../../features/packageTour/page4/EmergencyContact";
import FlightInfo from "../../features/packageTour/page4/FlightInfo";
import AccommodationList from "../../features/packageTour/page4/AccommodationList";
import AmountSummary from "../../features/packageTour/page4/AmountSummary";
import { useNavigate, useLocation } from "react-router-dom";

function P_4_package() {
  const navigate = useNavigate();
  const location = useLocation();
  const { routeId, startDate, endDate, departure, returning, rooms, carCount } =
    location.state || {};

  const goToPage5 = () => {
    navigate("/page5");
  };

  const [currentStep, setCurrentStep] = useState(2);

  const calcRoomPrice = (roomName) => {
    if (roomName.includes("自行訂購")) return 0;
    if (roomName.includes("私人房") || roomName.includes("Private"))
      return 1000;
    if (roomName.includes("共用房") || roomName.includes("Bunk")) return 500;
    return 0;
  };

  const roomTotal =
    rooms?.reduce((acc, r) => acc + calcRoomPrice(r.room), 0) || 0;
  const flightTotal = (departure?.price || 0) + (returning?.price || 0);
  const shuttleTotal = (carCount || 0) * 2500;
  const totalAmount = flightTotal + roomTotal + shuttleTotal;
  console.log(rooms);

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <h2
        style={{
          fontSize: "60px",
          fontWeight: "bold",
          width: "100%",
        }}
      >
        填寫旅客資料
      </h2>
      <CheckoutSteps currentStep={currentStep} />

      <div className={styles["booking-container"]}>
        {/* 左側：填寫資料區 */}
        <div className={styles["booking-left"]}>
          <PassengerForm />
          <ContactForm />
          <EmergencyContact />
        </div>

        {/* 右側：摘要資訊區 */}
        <div className={styles["booking-right"]}>
          <FlightInfo departure={departure} returning={returning} />
          <AccommodationList rooms={rooms} />
          <AmountSummary totalAmount={totalAmount} onNext={goToPage5} />
        </div>
      </div>
    </div>
  );
}

export default P_4_package;
