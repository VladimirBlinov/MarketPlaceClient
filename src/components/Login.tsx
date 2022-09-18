import { useForm } from "react-hook-form";
import './Register.scss'
import './Forms.scss'
import { getCurrentUser, login } from "../services/auth.service";
import { useLocation, useNavigate  } from "react-router-dom";
import { useAuth } from "../services/useAuth";
import IUser from "../entities/user.type";

export const Login = () => {
    const {
        register,
        formState:{
            errors,
        },
        watch,
        handleSubmit,
    } = useForm({
        mode: "onBlur"
    });
    
    const location = useLocation();
    const navigate = useNavigate();
    const {signin} = useAuth();

    // const fromPage = location.pathname ? (location.pathname) : ('/')

    const onSubmit = (data: any) => {

        login(data.email, data.password).then(
            () => {
                getCurrentUser().then((user) => {
                    console.log(user)
                    if (user){
                        signin(user, () => navigate('/profile', {replace: true}))
                    }
            })
        })};
    return (
        <div className="form-plug">
        <section className="form-login">
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className="login">
                Email:
                <input type="text" placeholder="Email" {...register("email", 
                    {required: "Обязательное поле", 
                    pattern: {value:/^\S+@\S+$/i,
                    message: "Неправильный Email"}
                    })} />
            </label>
            <div className="errmsg">
                {errors?.email && errors?.email?.message?.toString()}
            </div>

            <label className="login">
                Password:
                <input type="password" placeholder="Password" {...register("password", {required: "Обязательное поле", min: 8})} />
            </label>
            <div className="errmsg">
                {errors?.password && errors?.password?.message?.toString()}
            </div>
            
            <input type="submit" value="Submit" />
        </form>
       </section>
       </div>
    )
}
