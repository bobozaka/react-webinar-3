import React from "react";
import PropTypes from "prop-types";
import styles from "./Item.module.scss";

const Item = (props) => {
  const { code, title, price, countValue } = props.item;
  const { modal, addProduct, removeProduct } = props;

  // Форматирование прайса с пробелами между каждыми тремя цифрами
  const formattedPrice = price.toLocaleString(undefined, {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });

  return (
    <div className={styles.item}>
      <div className={styles.itemCodeAndTitle}>
        <div className={styles.itemCode}>{code}</div>
        <div className={styles.itemTitle}>{title}</div>
      </div>
      <div className={styles.itemActions}>
        <div className={styles.itemActionsText}>
          <p>{formattedPrice + " ₽"}</p>
          {modal && <p>{countValue + " шт"}</p>}
        </div>
        {!modal ? (
          <button onClick={() => addProduct(props.item)}>Добавить</button>
        ) : (
          <button onClick={() => removeProduct(props.item)}>Удалить</button>
        )}
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
};

export default React.memo(Item);
