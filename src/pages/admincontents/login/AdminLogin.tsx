import React, { useEffect, useState } from 'react';
import '../css/admin.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../components/common/loadingspinner/LoadingSpinner';
import { LOGIN } from '../../../graphql';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {

    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm({});
    const { errors }: any = formState;

    const [queryVariables, setQueryVariables] = useState<any>(null);

    const { loading, error: loginError, data: loginResult, refetch } = useQuery(LOGIN, {
        variables: queryVariables,
        skip: !queryVariables,
    });

    const onSubmit = (data: any) => {
        console.log(data);
        setQueryVariables({ 
            username: data?.username,
            password: data?.password
        });
        refetch().then((result: any) => {
            console.log("Login result:::", result);
            if(result?.data && 
                result?.data?.users?.[0]?.email && 
                result?.data?.users?.[0]?.id) {
                navigate("/admin/managecontents");
            }
            if(!result || !result?.data) {
                showToast("Unable to login.", false);
            }
        }).catch((error: any) => {
            console.log("Error while login::", error);
            showToast(error?.message || "Something went wrong.", false);
        });
    };

    const showToast = (message: any, status: any) => {
        if(status) {
          toast.success(message, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }
        if(!status) {
          toast.error(message, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }
    }

    useEffect(() => {
    }, []);

    return (
        <div className='admin-login-container'>
            <div className='login-form'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-field">
                        <div className="label">Username</div>
                        <input
                            className="form-input input"
                            type="text"
                            {
                                ...register("username", 
                                { 
                                    required: true, 
                                })
                            }
                        />
                        {errors.username && <p className="error-message">This is required.</p>}
                    </div>

                    <div className="form-field">
                        <div className="label">Password</div>
                        <input
                            className="form-input input"
                            type="password"
                            {
                                ...register("password", 
                                { 
                                    required: true, 
                                })
                            }
                        />
                        {errors.password && <p className="error-message">This is required.</p>}
                    </div>

                    <div className="text-center mt-4 mb-2">
                        {loading ? (
                            <LoadingSpinner />
                        ) : (
                            <button className="button-submit" type='submit'>
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}
