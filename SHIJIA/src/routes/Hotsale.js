import React from 'react'
import NavBottom from '../component/NavBottom'
import {Category} from "../api/couser"
<<<<<<< HEAD
import {Link,NavLink} from "react-router-dom"
import {Icon } from 'antd';

export default class Hotsale extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {song: [], page: 10, flag: false};

    }
    async componentWillMount() {
        let rueslt = await Category({category:"table"}),
             Data=rueslt.data,
                ruesltA = await Category({category:"sofa"}),
                DataA=ruesltA.data;
        Data.length!==0?this.state.song.push( Data):"";
        DataA.length!==0?this.state.song.push(DataA):"";
         let songa=Data.concat(DataA);


        this.setState({
              song: songa
          });
        console.log(songa);

    }

    render() {
=======
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
        console.log(songa);

    }

    render() {

        let itre = this.state.song.map((item, index) => {
            return item
        });
        console.log(itre);
        return <section>
            <div className="heardHot">
                <div className="uty"><p>陶家头条</p></div>

                <NavLink to='/'><Icon type="left" style={{fontSize: 36, color: '#818181'}}/> </NavLink>

                <ul className="Hotstyle">
                    {
                        itre.map((item, index) => {
                            let {id, name, pic, dec, price, category} = item;

                            return <li className="heartLing" key={index}>
                                <Link to={{
                                    pathname: '/detail',
                                    search: `?ID=${id}&category=${category}`
                                }}>
                                    <div className="Hty">
                                        <img src={pic} alt=""/>
                                        <span className="Htt">{name}</span>
                                        <span className="Htr">{price}</span>
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
>>>>>>> 5f1f6f9dcee748906f7190f797b8b9991f73e9b6

        let itre =  this.state.song.map((item, index) => {
            return item
        });
        console.log(itre);
        return <section>
            <div  className="heardHot">
            <div className="uty"><p>陶家头条</p></div>

                <NavLink to='/'><Icon type="left" style={{ fontSize: 36, color: '#818181' }} /> </NavLink>

                <ul className="Hotstyle">
                {
                    itre.map((item, index) => {
                        let{id,name,pic,dec,price,category}=item;

                        return <li className="heartLing" key={index}>
                            <Link to={{
                                pathname:'/detail',
                                search: `?ID=${id}&category=${category}`
                            }}><div className="Hty">
                                     <img src={pic} alt=""/>
                                      <span className="Htt">{name}</span>
                                     <span className="Htr">{price}</span>
                                     <p>{dec}</p>
                                 </div></Link>
                        </li>
                        })
                }
            </ul>
            </div>
            <NavBottom/>
        </section>
    }

}

