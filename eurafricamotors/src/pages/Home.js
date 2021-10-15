import CustomAppBar from "../components/AppBar"
import { useHistory } from "react-router";

export default function Home() {
  const history = useHistory()
  const location = history.location.pathname
  var user
  if (history.location.state) {
    user = history.location.state.response
  }
  return <div>
    <CustomAppBar location={location}
      user={user} />
    <h2>Home</h2>
  </div>;
}