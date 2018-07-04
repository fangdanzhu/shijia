
import React from 'react'
import {Upload, Icon, message} from 'antd'
import {connect} from 'react-redux'

import axios from "axios";
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}
 class Login extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state={
            loading: false,
            imageUrl:null
		}
	}

     handleChange = (info) => {
         if (info.file.status === 'uploading') {
             this.setState({ loading: true });
             return;
         }
         if (info.file.status === 'done') {
             // Get this url from response in real world.
             getBase64(info.file.originFileObj, imageUrl => this.setState({
                 imageUrl,
                 loading: false,
             }));
         }
     };





	close=()=>{
		console.log(this.props.history);
		this.props.history.go(-1)
	};
	render(){

        const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">Upload</div>
			</div>
        );
        const imageUrl = this.state.imageUrl;


		return <section className="mask">
					<div className="exit" onClick={this.close}>
						<Icon type='close' />
					</div>
					<div className="main">
						<form>
								<div><Icon type="user-add" /><input type="text"  placeholder="请输入手机号"/></div>
								<div><Icon type="lock" /><input type="password" placeholder="请输入密码" /></div>
								<button onClick={this.handle}>登陆</button>

								</form>

						<Upload
							name="avatar"
							listType="picture-card"
							className="avatar-uploader"
							showUploadList={false}
							action="http://localhost:8000/course/photoUpload"
							beforeUpload={beforeUpload}
							onChange={this.handleChange}
						>
                            {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
						</Upload>

						<ul>
									<li><a href="javascript:;">忘记密码</a><a href="javascript:;">注册账号</a></li>
									<li><h4>其他登陆方式</h4></li>
									<li>
										<Icon type="qq" />
										<Icon type="weibo-circle" />
										<Icon type="weibo" />
									</li>
								</ul>
								<p>我已阅读<b>《并适家用户协议》</b></p>
							</div>
							
				
		       </section>
	}
     handle=ev=>{
		axios.get('/course/info',{
		params:{

            category:'table',
			limit:2
		}
		}).then(result=>{
            console.log(result);
        })
	 }
}

export default connect()(Login)
