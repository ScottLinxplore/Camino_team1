import AccommodationCard from "./AccommodationCard";
import style from "./AccommodationList.module.css";
import React from "react";

export default function AccommodationList({ rooms }) {
  const calcRoomPrice = (room) => {
    if (room.includes("自行訂購")) return 0;
    if (room.includes("私人房") || room.includes("Private")) return 1000;
    if (room.includes("共用房") || room.includes("Bunk")) return 500;
    return 0;
  };

  // ✅ 分類相同房型，統整所有日期
  const groupedRoomsMap = {};
  if (rooms?.length) {
    rooms.forEach((r) => {
      const roomName = r.room;
      if (!groupedRoomsMap[roomName]) {
        groupedRoomsMap[roomName] = {
          name: roomName,
          dates: [],
          price: calcRoomPrice(roomName),
        };
      }
      groupedRoomsMap[roomName].dates.push(r.date);
    });

    // 日期排序
    Object.values(groupedRoomsMap).forEach((group) => {
      group.dates.sort((a, b) => new Date(a) - new Date(b));
    });
  }

  const grouped = Object.values(groupedRoomsMap);

  // ✅ 日期合併成連續範圍格式
  const formatDate = (d) => {
    const date = new Date(d);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const mergeDates = (dateList) => {
    const dateObjs = dateList.map((d) => new Date(d)).sort((a, b) => a - b);
    const ranges = [];
    let start = dateObjs[0];
    let end = dateObjs[0];

    for (let i = 1; i <= dateObjs.length; i++) {
      const curr = dateObjs[i];
      const prev = dateObjs[i - 1];
      const nextDay = new Date(prev);
      nextDay.setDate(prev.getDate() + 1);

      if (curr && curr.toDateString() === nextDay.toDateString()) {
        end = curr;
      } else {
        ranges.push({ start, end });
        start = curr;
        end = curr;
      }
    }

    return ranges
      .map(({ start, end }) =>
        start.getTime() === end.getTime()
          ? formatDate(start)
          : `${formatDate(start)}～${formatDate(end)}`
      )
      .join("、");
  };

  return (
    <div>
      <h3 className={style["section-title"]}>住宿資訊</h3>
      {grouped.map((group, i) => (
        <AccommodationCard
          key={i}
          name={group.name}
          roomType={group.name}
          date={mergeDates(group.dates)}
          day={group.dates.length}
          price={group.price * group.dates.length}
        />
      ))}
    </div>
  );
}
