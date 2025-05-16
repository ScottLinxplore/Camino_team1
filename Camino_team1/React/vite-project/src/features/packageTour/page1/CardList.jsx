import React from "react";
import Card from "./Card";
import styles from "./CardList.module.css";

export default function CardList({ routes, mockUserId }) {
  return (
    <div className={styles.content}>
      {routes.map((route) => (
        <Card key={route.name} route={route} userId={mockUserId} />
      ))}
    </div>
  );
}
