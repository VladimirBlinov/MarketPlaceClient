import { useForm } from "react-hook-form";
import './Register.scss'
import { login } from "../services/auth.service";
import { useNavigate  } from "react-router-dom";

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
    
    let navigate = useNavigate();

    const onSubmit = (data: any) => {
        login(data.email, data.password).then(
            () => {
              navigate("/profile");
              window.location.reload();
            })
    };
    return (
        <div className="form-plug">
        <section className="form-login">
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
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

            <label>
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

