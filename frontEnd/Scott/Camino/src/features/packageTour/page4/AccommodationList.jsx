// import AccommodationCard from "./AccommodationCard";
// import style from "./AccommodationList.module.css";

// export default function AccommodationList() {
//   const rooms = [
//     {
//       name: "Bunk Room",
//       date: "2025/7/15 - 2025/8/9",
//       day: "24"
//     },
//     {
//       name: "Private Room",
//       date: "2025/8/9 - 2025/8/11",
//       day: "2"
//     },
//   ];

//   return (
//     <div className={style["room-setion"]}>
//       <h4>住宿資訊</h4>
//       {rooms.map((room, idx) => (
//         <AccommodationCard key={idx} {...room} />
//       ))}
//     </div>
//   );
// }
import AccommodationCard from "./AccommodationCard";
import style from "./AccommodationList.module.css";

export default function AccommodationList({ rooms }) {
  const calcRoomPrice = (room) => {
    if (room.includes("自行訂購")) return 0;
    if (room.includes("私人房") || room.includes("Private")) return 1000;
    if (room.includes("共用房") || room.includes("Bunk")) return 500;
    return 0;
  };

  const grouped = [];
  if (rooms?.length) {
    let current = {
      name: rooms[0].room,
      dates: [rooms[0].date],
      price: calcRoomPrice(rooms[0].room),
    };
    for (let i = 1; i < rooms.length; i++) {
      if (rooms[i].room === current.name) {
        current.dates.push(rooms[i].date);
      } else {
        grouped.push(current);
        current = {
          name: rooms[i].room,
          dates: [rooms[i].date],
          price: calcRoomPrice(rooms[i].room),
        };
      }
    }
    grouped.push(current);
  }
  console.log("rooms:", rooms);

  return (
    <div>
      <h3 className={style["section-title"]}>住宿資訊</h3>
      {grouped.map((group, i) => (
        <AccommodationCard
          key={i}
          name={group.name}
          roomType={group.name}
          date={`${group.dates[0]} - ${group.dates.at(-1)}`}
          day={group.dates.length}
          price={group.dates.length * group.price}
        />
      ))}
    </div>
  );
}
