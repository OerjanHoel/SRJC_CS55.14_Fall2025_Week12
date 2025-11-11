import Head from 'next/head'; // Imports head from Next.js
import Link from 'next/link'; // Imports link from Next.js
import Layout, { siteTitle } from '../components/layout'; // Imports layout and sisteTitle from layout.js. siteTitle a variable in layout.js
import utilStyles from '../styles/utils.module.css'; // Imports CSS from utils.module.css file
import { getSortedPostsData } from '../lib/posts-json'; // Imports function from posts-json.js
// import Date from '../components/date'; // Imports the Date module we installed

// Function creates the static html for our blog posts
export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
// Function creates Home based on the importet 
// compnonents from next.js and layout.js file
// Compnents are JSX elements
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello, my name is Oerjan and I am studying for my AS in Full Stack web development.
          At the moment I am working as System administrator.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog Articles</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              {/*<br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small> */}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}