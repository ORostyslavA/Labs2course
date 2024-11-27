import React from "react";
import "./Footer.css";
import {FacebookFilled, TwitterCircleFilled, LinkedinFilled ,GooglePlusCircleFilled} from '@ant-design/icons';
import Logo from "../../components/images/logo.png";

function Footer() {
    return(
        <footer>
            <div className="footer_content">
                <div className="footer_content_text">
                    <h3>Explore the World</h3>
                    <p>Book Your Dream Getaway Today!</p>
                </div>
                <img className="footer_content_logo" src={Logo} alt="Logo"/>
                <div className="footer_content_icons">
                    <FacebookFilled
                        style={{fontSize: '200%', marginRight: "20px", color: "#304D8A"}}/>
                    <TwitterCircleFilled
                        style={{fontSize: '200%', marginRight: "20px", color: " #35A2F4"}}/>
                    <LinkedinFilled 
                        style={{fontSize: '200%', marginRight: "20px", color: " #147BAF"}}/>
                    <GooglePlusCircleFilled
                        style={{fontSize: '200%', color: " #F44336"}}/>
                </div>
            </div>
            <div className="footer_autor">
                <p>2024 IoT © Copyright all rights reserved</p>
            </div>
        </footer>
    );
}

export default Footer;