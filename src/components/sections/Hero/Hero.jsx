import Button from '../../ui/Button/Button';
import Container from '../../ui/Container/Container';
import ProductMockup from './ProductMockup';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.title}>
            Every task, pulling in the same direction.
          </h1>
          <p className={styles.lead}>
            Rowline is a shared board for teams of 5 to 50. Plan the week, see who is working on
            what, and ship without asking anyone for a status update.
          </p>
          <div className={styles.actions}>
            <Button href="#contact">Book a demo</Button>
            <Button href="#pricing" variant="secondary">
              See pricing
            </Button>
          </div>
          <p className={styles.note}>Free for up to 5 people. No card required.</p>
        </div>

        <div className={styles.visual}>
          <ProductMockup />
        </div>
      </Container>
    </section>
  );
}
