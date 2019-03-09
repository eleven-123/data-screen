import styles from './index.css';

function BasicLayout(props) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>智能零售驾驶舱</h2>
      </header>
      <div className={styles.content}>
        { props.children }
      </div>      
    </div>
  );
}

export default BasicLayout;
