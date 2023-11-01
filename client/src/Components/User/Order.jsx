import React,{useState, useEffect} from "react";

import Layout from "../Layout/Layout";
import UserMenu from "../Layout/UserMenu";
import { useAuth } from "../Context/Auth"; 
import moment from "moment"
import axios from "axios";

const Order = () => {

  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();


  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:9999/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((movie, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={movie._id}>
                        <div className="col-md-4">
                          <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            className="card-img-top"
                            alt={movie.name}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{movie.name}</p>
                          <p>{movie.description}</p>
                          <p>Price : {movie.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
