import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import Icon from '../../layout/Icon';
import './Login.css';
import LogoImg from '../../assets/imgs/logo-w200px.png';
import { withKeycloak } from 'react-keycloak';
import { runInAction } from 'mobx';

@inject("userStore")
@observer
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    submitForm(event) {
        event.preventDefault();
        this.props.userStore.registerLogin(this.state.username, this.state.password);
    }
    
    _renderErrorMessage({errorMessage}) {
        if(errorMessage){
            return (
                <p className="bg--danger text-danger">{errorMessage}</p>
            );
        }
        return false;
    }

    _renderForm() {
        const { keycloak, keycloakInitialized } = this.props;
        console.log("Keycloak:", keycloak);
        return (
            // <form id="formLoginPage" onSubmit={(e) => this.submitForm(e)}>
            //     <div className="form-group has-feedback">
            //         <input type="email" className="form-control" placeholder="E-mail" onChange={(e) => { this.setState({username : e.target.value})}} />
            //         <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
            //     </div>
            //     <div className="form-group has-feedback">
            //         <input type="password" className="form-control" placeholder="Password" onChange={(e) => {this.setState({password : e.target.value})}} />
            //         <span className="glyphicon glyphicon-lock form-control-feedback"></span>
            //     </div>
            //     <div className="row">
            //         <div className="col-xs-8">
            //             <div className="checkbox icheck">
            //                 <label className="">
            //                     <div className="icheckbox_square-blue remember-me" aria-checked="false" aria-disabled="false" >
            //                         <input type="checkbox" />
            //                         <ins className="iCheck-helper"></ins>
            //                     </div> Lembrar-me
            //                 </label>
            //             </div>
            //         </div>
            //         {/* <!-- /.col --> */}
            //         <div className="col-xs-4">
            //             <button type="submit" className="btn btn-primary btn-block btn-flat">Entrar</button>
            //         </div>
            //         {/* <!-- /.col --> */}
            //     </div>
            // </form>
            <button className="btn btn-primary btn-block btn-flat" onClick={() => keycloak.login()}>Entrar</button>
        );
    }

    render(){
        const { userStore,  } = this.props;        
        return (
            <div className="login-box">
                <div className="login-logo">
                    <Link to="/"><img alt="Ir para a página inicial de HandBall.cloud" src={LogoImg} /></Link>
                </div>
                {/* <!-- /.login-logo --> */}
                <div className="login-box-body">
                    {/* <p className="login-box-msg">Assine para iniciar sua seção</p>

                    {this._renderErrorMessage(userStore)} */}

                    {this._renderForm()}

                    {/* <div className="social-auth-links text-center">
                    <p>- OU -</p>
                    <Link to="/" className="btn btn-block btn-social btn-facebook btn-flat"><Icon type="fab" name="facebook-f" /> Entre usando Facebook</Link>
                    <Link to="/" className="btn btn-block btn-social btn-google btn-flat"><Icon type="fab" name="google-plus-g" /> Entre usando Google+</Link>
                    </div> */}
                    {/* <!-- /.social-auth-links --> */}

                    {/* <Link to="/">Esqueci minha senha</Link><br/>
                    <Link to="/" className="text-center">Não tenho conta. Quero me registrar!</Link> */}

                </div>
                {/* <!-- /.login-box-body --> */}
            </div>
        );
    }
}

export default withKeycloak(Login);