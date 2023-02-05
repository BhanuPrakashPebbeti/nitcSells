import { useParams } from "react-router";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { SERVER_URL } from "../../EditableStuff/Config";
import { alertContext } from "../../Context/Alert";
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const Product = () => {
  const params = new useParams();
  const id = params.id;
  const navigate = useNavigate();
  const { showAlert } = useContext(alertContext);
  const [product, setProduct] = useState(null);
  const [contacts, setContacts] = useState(null);
  const getProduct = async () => {
    let data;
    try {
      data = await axios.get(`${SERVER_URL}/product/getProduct/${id}`);
      console.log('data', data.data[0][0]);
      const c = data.data[0][0].userId
      setProduct(data.data[0][0]);
      const data2 = await axios.get(`${SERVER_URL}/user/getuser/${c}`);
      console.log('data2', data.data[0][0]);
      setContacts(data2.data[0][0]);
    } catch (err) {
      showAlert(data.data.err, "danger");
    }
  }

  const deleteProduct = async () => {
    let res;
    try {
      res = await axios.delete(`${SERVER_URL}/product/deleteproduct/${product.productId}`);
      navigate('/');
    } catch (err) {
      showAlert("Something went wrong!", "danger");
    }
  }

  useEffect(() => {
    const u = localStorage.getItem("username");
    if (!u) {
      navigate('/login')
    }
  }, [])
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const u = localStorage.getItem("userId");
    if (u) {
      setUserId(u);
    }
    getProduct();
  }, []);
  return (
    <>
      <Navbar />
      {product && <div className="product-container container">
        <Helmet>
          <title>Product - NITC</title>
        </Helmet>
        <div className="row p-5">
          <div className="col-lg-5">
            <img
              src={"https://drive.google.com/uc?expert=view&id=" + product.imageId}
              alt={product.productName}
              className="img-fluid rounded"
              style={{ width: "30rem", objectFit: "contain" }}
            />
          </div>
          <div className="col-lg-7">
            <div className="product-details">
              <h3 className="text-center pt-4 pt-lg-1 pb-1">{product.productName}</h3>
              <div className=" row">
                <div className="col col-md-2 text-center text-md-end">
                  Price:
                </div>
                <div className="col col-md-10">
                  {product.productPrice}
                </div>
              </div>
              <div className=" row">
                <div className="col col-md-2 text-center text-md-end">
                  Description:
                </div>
                <div className="col col-md-10">
                  {product.productDescription}
                </div>
              </div>
              {contacts &&
                <>
                  <div className=" row">
                    <div className="col col-md-2 text-center text-md-end">
                      Mobile No:
                    </div>
                    <div className="col col-md-10">
                      {contacts.mobileNo}
                    </div>
                  </div>
                  <div className=" row">
                    <div className="col col-md-2 text-center text-md-end">
                      Email:
                    </div>
                    <div className="col col-md-10">
                      {contacts.mail}
                    </div>
                  </div>
                </>
              }
              {userId == product.userId && <button className="btn btn-danger mt-3 col-md-10" onClick={deleteProduct} style={{ width: "100px" }}>Delete</button>}

            </div>
          </div>
        </div>
      </div>}
      <Footer />
    </>
  );
};

export default Product;
