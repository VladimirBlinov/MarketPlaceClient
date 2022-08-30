import { useForm } from "react-hook-form";
import { getCurrentUser } from "../services/auth.service";
import { useNavigate  } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import IUser from "../entities/user.type";
import axios from "axios";

const API_URL = "http://localhost:8080";

const Profile: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<IUser>();
    useEffect(() => {
        getCurrentUser().then( user =>
        setCurrentUser(user))
    }, [])
 
    return (
        <div className="user-profile">
            <h3>{currentUser?.email}</h3>
            <h3>{currentUser?.id}</h3>
            <h3>{currentUser?.userrole}</h3>
            <h3>{currentUser?.active}</h3>
        </div>
    )
}

export default Profile