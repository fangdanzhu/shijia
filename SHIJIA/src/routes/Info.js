import React from 'react'
import {Icon, Button, Upload, message} from 'antd'
import NavBottom from '../../component/NavBottom'
import PersonDetail from './PersonDetail'
import {Route, Link} from 'react-router-dom'
import {personInfo, exitLogin} from '../../api/person'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import action from '../../store/action'
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

class Info extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            loading: false,
            imageUrl: null
        }
    }

    async componentDidMount() {
        let {personInfo, queryInfo} = this.props;
        !personInfo ? await queryInfo() : null
    }

    exit = async (ev) => {
        ev.preventDefault()
        let result = await exitLogin();

        if (result.code === 0) {
            console.log()
            this.props.history.push('/person')
        }
    }
    //处理头像
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
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

    render() {
        if (!this.props.personInfo) return '';
        let {userName, phone} = this.props.personInfo;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">选则头像</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;

        return <section className="info">
            <div className="content">
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="http://localhost:8000/person/photoUpload"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ?
                        <img src={imageUrl} alt="avatar" style={{width: '1rem', height: '1rem'}}/> : uploadButton}
                </Upload>
                <span>昵称:{userName}</span>
                <span>联系方式:{phone}</span>
            </div>
            <ul className="info-item">
                <li><Icon type="solution"/><span>我的订单</span></li>
                <li><Link to='person/collection'><Icon type="star-o"/><span>我的收藏</span></Link></li>
                <li><Icon type="red-envelope"/><span>我的钱包</span></li>
                <li><Icon type="heart-o"/><span>我的地址</span></li>
                <li><Icon type="heart-o"/><span>我的关注</span></li>
                <li><Icon type="heart-o"/><span>我的关注</span></li>
            </ul>
            <div className="exitLogin">
                <Button type="danger" onClick={this.exit}>退出登陆</Button>
            </div>
            <NavBottom />
        </section>
    }

}


export default withRouter(connect(state => ({...state.person}), action.person)(Info))

