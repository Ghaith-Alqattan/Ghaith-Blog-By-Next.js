import Image from 'next/image'
import classes from './hero.module.css'

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src={'/images/site/ghaith.jpg'}
          alt="An image Showing Ghaith"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi , I'm Ghaith</h1>
      <p>I Blog about web development - Especially Frontend Frameworks</p>
    </section>
  )
}
