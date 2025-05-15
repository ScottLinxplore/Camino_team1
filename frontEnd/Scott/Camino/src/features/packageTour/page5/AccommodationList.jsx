import AccommodationCard from "./AccommodationCard";
import styles from"./AccommodationList.module.css"

export default function AccommodationList() {
  const rooms = [
    {
      image: "./project/05.jpg",
      name: "Hostel Ramuntcho",
      address: "1 rue de France, 聖讓－皮耶德波爾, 法國",
      roomType: "床鋪所(1張床位, Bunk Room)",
      date: "2025/7/15 - 2025/8/9",
      guests: "1位大人",
      price: "XXXX",
    },
    {
      image: "./project/06.jpg",
      name: "Hostel Ramuntcho",
      address: "1 rue de France, 聖讓－皮耶德波爾, 法國",
      roomType: "床鋪所(1張床位, Private Room)",
      date: "2025/8/9 - 2025/8/11",
      guests: "1位大人",
      price: "XXXX",
    },
  ];

  return (
    <div className={styles["room-setion"]}>
      <h4>住宿資訊</h4>
      {rooms.map((room, idx) => (
        <AccommodationCard key={idx} {...room} />
      ))}
    </div>
  );
}
