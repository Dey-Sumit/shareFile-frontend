import "../../styles/globals.css";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_ENDPOINT_SERVER;
function MyApp({ Component, pageProps }) {
  return (
    <div className="grid h-screen font-serif text-white bg-gray-900 place-items-center">
      <div>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
