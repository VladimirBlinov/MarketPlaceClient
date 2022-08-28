import { useForm } from "react-hook-form";
import './Register.scss'

export const Register = () => {
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
    
    
    const onSubmit = (data: any) => {
        alert(JSON.stringify(data))
    }

    return (
        <div className="form-plug">
        <section className="form-register">
        <h2>Sign up</h2>
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

            <label>
                Confirm Password
                <input type="password" placeholder="Confirm Password" {...register("confirm_password",
                 {required: true,
                  validate: (val: string) => {
                    if (watch('password') != val) {
                        return "Пароль не совпадает";
                    }}})
                } />
            </label>
            <div className="errmsg">
                {errors?.confirm_password && errors?.confirm_password?.message?.toString()}
            </div>
            
            <input type="submit" value="Submit" />
        </form>
       </section>
       </div>
    )
}