import React from 'react'
import '../../static/css/person.less'
import action from '../../store/action'
import {connect} from 'react-redux'
import NavBottom from '../../component/NavBottom'
import {Icon} from 'antd'
import {myCollection} from '../../api/person'
import {queryCollect,queryDetail} from '../../api/detail'
import {Link} from 'react-router-dom'

class Collection extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            personInfo: {},
            mycol: []
        }
    }

    async componentDidMount() {
        let result = await queryCollect();
        let ary=[];
        if (result.code === 0) {
            for (let i = 0; i < result.data.length; i++) {
                let {id,category} = result.data[i];
                let item=await queryDetail({
                    ID:id,
                    category:category
                });
                if(parseFloat(item.code)===0){
                    ary.push(item.data[0])
                }
            }
            this.setState({
                mycol: ary
            })
        }
        if (!this.props.personInfo) {
            this.props.queryInfo()
        }
    }

    render() {
        if (!this.props.personInfo) return '';
        let data= this.state.mycol;
        return <section className="person_collection">
            <h3><Icon type="left" onClick={() => {
                this.props.history.go(-1)
            }}/>我的收藏</h3>
            {data.length===0?<div className="empty-collection">
                收藏佳空空,不如先去逛逛~
            </div>:<div className="collection">
                {data.map((item, index) => {
                    let {pic, name, dec, price, id, category} = item;
                    return <dl key={index}>
                        <Link to={{
                            pathname: '/detail',
                            search: `?ID=${id}&category=${category}`
                        }}>
                            <dt><img src={pic} alt=""/></dt>
                            <dd>
                                <h4>{name}</h4>
                                <p>{dec}</p>
                                <span>价格:￥{price}</span>
                            </dd>
                        </Link>
                    </dl>
                })}
            </div>}
            <NavBottom />
        </section>
    }
}

export default connect(state => ({...state.person}), action.person)(Collection)
