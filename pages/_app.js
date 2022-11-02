import NavBar from "../components/navbar"

export default function App({ Component, pageProps }) {
  return (
    <div>
      <NavBar />
      <Component {...pageProps} />
      <span>하이이이이222</span>
    </div>
  )
}