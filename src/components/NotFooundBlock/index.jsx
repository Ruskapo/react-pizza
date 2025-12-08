import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span className={styles.emoji}>😕</span>
        <br />
        УПС, не туда жмакнули
      </h1>
      <p className={styles.ander_text}>
        Вероятней всего, Вы перешли не туда куда нужно. Попробуйте перезапустить
        сайт.
      </p>
    </div>
  );
};

export default NotFoundBlock;
