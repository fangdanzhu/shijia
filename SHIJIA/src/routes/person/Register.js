import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react'
import {connect} from 'react-redux';
import axios from "axios";

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
	constructor(props){
		super(props);
		this.state={
			userName:'',
			passWord:''
		}
	}
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({userName:'2'},()=>{
                });
                this.setState({passWord:values.passWord});

            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
				</FormItem>
				<FormItem>
                    {getFieldDecorator('passWord', {
                        rules: [{ required: true, message: 'Please input your PassWord!' }],
                    })(
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
				</FormItem>
				<FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
						<Checkbox>Remember me</Checkbox>
                    )}
					<a className="login-form-forgot" href="">Forgot password</a>
					<Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleOnclick}>
						Log in
					</Button>
					Or <a href="">register now!</a>
				</FormItem>
			</Form>
        );
    }
    handleOnclick=ev=>{
        console.log(this.state);
        console.log(this.state.userName,this.state.passWord);
        axios.post('http://localhost:8000/person/register',{
			userName:'lllllllll',
			passWord:'000000'
		}).then(result=>{
            console.log(result);
        })
    }
}

export default Form.create()(NormalLoginForm);