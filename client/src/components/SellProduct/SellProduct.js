import React, { useEffect, useState } from 'react';
import './SellProduct.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../../EditableStuff/Config';
import Img1 from '../../12.png'
import Img2 from '../../22.png'


const SellProduct = () => {
    const [prod, setProd] = useState({
        productname: "",
        productprice: "",
        image: "",
        userid: "",
        productdescription: ""
    });

    const [add, setAdd] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const u = localStorage.getItem("userId");
        if (!u) {
            navigate('/login')
        }
        setProd({ ...prod, ['userid']: u });
    }, [])
    console.log('prod', prod);
    const handleInput = (e) => {
        setProd({ ...prod, [e.target.name]: e.target.value });
    }

    const handlePhoto = (e) => {
        setProd({ ...prod, [e.target.name]: e.target.files[0] });
        console.log('image', e.target.files[0])
    }

    const AddProduct = async (e) => {
        e.preventDefault();

        setAdd(true);
        try {
            const d = new FormData();
            d.append("image", prod.image);
            d.append("productname", prod.productname);
            d.append("productprice", prod.productprice);
            d.append("userid", prod.userid);
            d.append("productdescription", prod.productdescription);

            const data = await axios.post(`${SERVER_URL}/product/postproduct`, d);

            if (data.status === 422 || !data) {
                window.alert("Invalid Regsitration");
                console.log("Invalid Regsitration");
            }
            else {
                console.log("Regsitration Successfull");
                navigate('/');
                setAdd(false);
            }
        } catch (err) {
            console.log('err', err);
        }
    }

    return (
        <>
            <Navbar />
            <img src={Img1} className="e1" />
            <img src={Img2} className="e2" />
            <div className='sell-container text-center py-5'>
                <h1 className='pb-3 text-bold'>Sell Product</h1>
                <form method="POST" onSubmit={AddProduct} encType="multipart/form-data">
                    <div className='py-3'>
                        <label className='input_label'>Name</label>
                        <div>
                            <input className='input_input border py-3 px-4' type="text" name="productname" value={prod.productname} onChange={handleInput} placeholder="Enter Product Name" required />
                        </div>
                    </div>
                    <div className='py-3'>
                        <label className='input_label'>Price</label>
                        <div>
                            <input className='input_input border py-3 px-4' type="text" name="productprice" value={prod.productprice} onChange={handleInput} placeholder="Enter Product Price" required />
                        </div>
                    </div>

                    <div className='py-3'>
                        <label for="file-input" className='input_label2'>
                            <span className='input_label'>Product Images</span>
                            <div className={`input_input border py-3 px-4 align-items-center text-start`} style={prod.image ? {} : { color: "grey" }}>{prod.image ? prod.image.name : "Uplaod Product Image"}</div>
                        </label>
                        <div>
                            <input type="file" id="file-input" name="image" style={{ display: "none" }} onChange={handlePhoto} required />
                        </div>
                    </div>

                    <div className='py-3'>
                        <label className='input_label'>Description</label>
                        <div>
                            <textarea className='input_input border py-3 px-4' type="text" name="productdescription" style={{ outline: "none" }} onChange={handleInput} placeholder="Enter Product Details and Description" required>{prod.productdescription}</textarea>
                        </div>
                    </div>
                    <div className='py-3'>
                        <div>
                            {
                                add ?
                                    <input className='input_input2 border py-3 px-4 btn btn-primary' type="submit" value="Submitting..." disabled />
                                    :
                                    <input className='input_input2 border py-3 px-4 btn btn-primary' type="submit" value="Submit" />
                            }
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default SellProduct
