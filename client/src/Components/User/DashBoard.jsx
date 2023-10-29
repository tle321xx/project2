import React from 'react'
import Layout from "../Layout/Layout";
import UserMenu from '../Layout/UserMenu';
import { useAuth } from '../Context/Auth';
const DashBoard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-flui m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>name: {auth?.user?.name}</h3>
              <h3>email: {auth?.user?.email}</h3>
              <h3>address: {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DashBoard