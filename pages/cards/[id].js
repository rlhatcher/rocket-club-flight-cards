import Layout from '../../components/layout'
import { getAllCardIds } from '../../lib/cards'

export async function getStaticPaths() {
  const paths = getAllCardIds()
  return {
    paths,
    fallback: false
  }
}

export default function Card() {
  return <Layout>...</Layout>
}

