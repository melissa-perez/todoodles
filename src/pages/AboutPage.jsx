import styles from './AboutPage.module.css';
function AboutPage() {
  return (
    <>
      <p className={styles.about}>
        This is a todo-list app made using React with Airtable API. You can add,
        edit, complete, and search/filter todos.
      </p>
      <p className={styles.about}>
        The author is Melissa Perez. This app was made as part of Code the
        Dream's React(Jay) course.
      </p>
    </>
  );
}

export default AboutPage;
