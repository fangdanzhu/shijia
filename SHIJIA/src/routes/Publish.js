import React from 'react'
import NavBottom from '../component/NavBottom';
import { Input,Upload, Icon, message,Card ,Button ,Alert,Modal} from 'antd';
import {pushInfo} from "../api/push";
import {checkLogin} from "../api/person";
import axios from "../api/index";
const {TextArea}=Input;


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
const warning = () => {
    message.warning('请添加图片/或文字...');
};

const confirm = Modal.confirm;







export default class Hotsale extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={
            loading: false,
            imageUrl:null,
            val:'',
            isload:false,
            isDl:true
        }
    }
    success = () => {
        const hide = message.loading('发布中..', 0);
        // Dismiss manually and asynchronously
        setTimeout(()=>{
            hide();
            this.props.history.push('/memi');
        }, 2500);
    };


    async componentDidMount(){
            let isDl=await checkLogin();
            isDl=isDl.code===0?true:false;
                this.setState({isDl:isDl});
        let resu =await pushInfo({info:''});
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
                isload:true
            }));
        }
    };



    render(){
            if(!this.state.isDl){
                this.showConfirm();
            }
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;



        return <section className='pushBox'>
            <Card title="" extra={<Button href="javascript:;" onClick={this.push}>发布</Button>} style={{ width:'100%' }} >

                <TextArea rows={5}  placeholder="来吧，得瑟一下呗..."  onChange={this.chenge}  />

                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="http://localhost:8000/show/putPhoto"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" className='ImgBox' style={{maxWidth:300,maxHeight:200}} /> : uploadButton}
                </Upload>

            </Card>


			<NavBottom/>

		</section>
    }

    showConfirm=()=> {
        console.log(555);
        let that=this;
        confirm({
            title: '登录才能晒照哦?',
            content: '去逛逛觅me看看大家在发些什么也不错哦...',
            onOk() {
                that.props.history.push('/person/login');
                return false;
            },
            onCancel() {
                that.props.history.push('/memi');
                return;
            },
        })
    };

    chenge= async ev=>{
        await this.setState({
            val:ev.target.value
        });
    };
    push=async ()=>{
        if(!this.state.isload){
                warning();
            // this.success();

            return;
        }
        console.log(1);
        let result = await pushInfo({info:this.state.val});
        if(parseFloat(result.code)===0){
            this.success();
        }

    }
}

