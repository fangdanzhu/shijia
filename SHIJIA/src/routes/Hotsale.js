import React from 'react'
import NavBottom from '../component/NavBottom'
import {Category} from "../api/couser"


import {Link, NavLink} from "react-router-dom"
import {Icon} from 'antd';

export default class Hotsale extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {song: [], page: 10, flag: false};
    }

    async componentWillMount() {
        let rueslt = await Category({category: "table"}),
            Data = rueslt.data,
            ruesltA = await Category({category: "sofa"}),
            DataA = ruesltA.data;
        Data.length !== 0 ? this.state.song.push(Data) : "";
        DataA.length !== 0 ? this.state.song.push(DataA) : "";
        let songa = Data.concat(DataA);
        this.setState({
            song: songa
        });
    }

    render() {
        let itre = this.state.song.map((item, index) => {
            return item
        });
        return <section>
            <div className="heardHot clearfix">
                <div className="uty"><p>适家头条</p></div>
                <NavLink to='/'><Icon type="left" style={{fontSize: 36, color: '#818181'}}/> </NavLink>
                <ul className="Hotstyle clearfix">
                    {itre.map((item, index) => {
                            let {id, name, pic, dec, price, category} = item;
                            return <li className="heartLing" key={index}>
                                <Link to={{
                                    pathname: '/detail',
                                    search: `?ID=${id}&category=${category}`
                                }}>
                                    <div className="Hty">
                                        <img src={pic} alt=""/>
                                        <span className="Htt">{name}</span>
                                        <span className="Htr">￥{price}元</span>
                                        <p>{dec}</p>
                                    </div>
                                </Link>
                            </li>
                        })
                    }
                </ul>
            </div>
            <NavBottom/>
        </section>
    }
}


