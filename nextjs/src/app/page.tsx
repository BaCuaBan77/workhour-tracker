import Image from 'next/image'
import styles from './page.module.css'
import prisma from '../../prisma/prisma';

export default async function Home() {
  const feed = await prisma.user.findFirst({
    where: { name: 'Long Le' },
  });
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          {
            feed?.email
          }
        </p>
        
      </div>
    </main>
  )
}
