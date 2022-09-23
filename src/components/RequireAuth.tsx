import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom"
import IUser from "../entities/User";
import * as AuthService from "../services/auth.service";
import { useAuth } from "../services/useAuth";

type Props = {
    children: JSX.Element,
  };

const RequireAuth = ({children}: Props) => {
    const location = useLocation();
    const user = useAuth();

    if(!user){
        return <Navigate to='/login' state={{from: location}}/>
    }

    // const [currentUser, setCurrentUser] = useState<IUser| undefined>();
    // useEffect(() => {
    //     AuthService.getCurrentUser()
    //     .then((user) => {if (user) { setCurrentUser(user);
    //     }})
    //     .then((currentUser) => {if(currentUser == undefined){
    //             return <Navigate to='/login' state={{from: location}}/>
    //     }});
    // }, []);
    return children;
}

export {RequireAuth}