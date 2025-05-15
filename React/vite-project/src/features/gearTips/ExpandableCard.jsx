import React from "react";
import styles from "./ExpandableCard.module.css";

const ExpandableCard = ({
  imageSrc,
  shortText,
  fullSections,
  index,
  expanded,
  onClick,
}) => {
  const isEven = index % 2 === 0;

  return (
    <div className={styles.cardWrapper}>
      <div
        className={`${styles.expandableWrapper} ${
          expanded ? styles.expanded : styles.collapsed
        }`}
        onClick={onClick}
      >
        <div
          className={`${styles.cardContainer} ${
            isEven ? styles.row : styles.rowReverse
          }`}
        >
          <div className={styles.cardImageWrapper}>
            <img
              src={imageSrc}
              alt="card"
              className={`${styles.cardImage} ${
                isEven ? styles.mr : styles.ml
              }`}
            />
          </div>

          <div
            className={`${styles.cardTextWrapper} ${
              isEven ? styles.left : styles.right
            }`}
          >
            <div
              className={`${styles.cardFullText} ${
                isEven ? styles.fullWidth : styles.narrowWidth
              }`}
            >
              <p className={styles.cardTitle}>{shortText}</p>
              {expanded &&
                Array.isArray(fullSections) &&
                fullSections.map((section, idx) => (
                  <div key={idx} className={styles.sectionBlock}>
                    {section.title && (
                      <p className={styles.sectionTitle}>{section.title}</p>
                    )}
                    <ul className={styles.sectionList}>
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandableCard;
