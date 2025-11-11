import Layout from '../../components/layout'; // Imports the layout from compnents folder
import { getAllPostIds, getPostData } from '../../lib/posts-json'; // Imports the code we need from new file posts-json
import Head from 'next/head'; // Imports head from Next.js
import Date from '../../components/date'; // Imports Date from the date module we installed
import utilStyles from '../../styles/utils.module.css'; // Imports the CSS from utils.module.css file 
import Link from 'next/link'; // Imports the link function from Next.js


// Exports the layout of the post data and adds CSS
// Structures the data in to JSX
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <Link href={postData.sourceURL}>Source</Link>
      </article>
    </Layout>
  );
}

// Gets teh staic paths for the blog posts 
export async function getStaticPaths() {
  // Variable for the Post id's
  const paths = getAllPostIds();
  return {
    // If the path is not found it won't fall back
    paths,
    fallback: false,
  };
}

// Exports the Static Props from 
export async function getStaticProps({ params }) {
  // Uses async to post the props and data to our blog posts
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}