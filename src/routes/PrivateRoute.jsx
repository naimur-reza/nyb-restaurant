import { useAppSelector } from "../hooks/hooks"
import { useCurrentUser } from "../redux/features/auth/authSlice"
import { Navigate   } from "react-router-dom"

const PrivateRoute = ({ children }) => {
 

    const user = useAppSelector(useCurrentUser)

    if (!user) {
        return <Navigate to="/login" />
    }

  return children
}

export default PrivateRoute

