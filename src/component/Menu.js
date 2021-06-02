import React from "react";
import {Nav, Navbar} from "react-bootstrap"
import {Link} from "react-router-dom";

function Menu() {
    return (
        <>
                <Navbar bg={'danger'} className={"align-content-center"}>
                    <Navbar.Brand>
                        <Navbar.Text className={"text-white"}>Metrabyte Starter Pack</Navbar.Text>
                    </Navbar.Brand>
                        <Nav.Link className={"text-white"} as={Link} to="/">Profile</Nav.Link>
                        <Nav.Link className={"text-white"} as={Link} to="/covid">Covid</Nav.Link>
                </Navbar>
        </>)
}
export default  Menu;