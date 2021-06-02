import React from "react";
import {Col, Container, Image, Card, Row} from "react-bootstrap"
import Project from "./Project";
function Profile() {
    return (
        <>
            <Container fluid>
                <Row xs={12} xl={12} className="p-1 ml-0 ">
                    <Col xs={12} xl={4} className={"p-3 mr-1"}>
                        <Image src="mypic.jpg" height={500} width={500} roundedCircle className={"align-content-center"}/>
                    </Col>
                    <Col xs={12} xl={4} className={"p-1"}>
                        <Card bg={"dark"} className={"text-white"}>
                            <Card.Header>📋 Name</Card.Header>
                            <Card.Body >
                                <Card.Text>Supakorn Boonsongnern (First)</Card.Text>
                                <Card.Text>ศุภกร บุญสูงเนิน (เฟิส)</Card.Text>
                            </Card.Body>
                        </Card>
                        <br/>
                        <Card bg={"success"} className={"text-white"}>
                            <Card.Header>❤️ Favourite</Card.Header>
                            <Card.Body >
                                <Card.Text>Play Games 🎮</Card.Text>
                                <Card.Text>Listen Music 🎵</Card.Text>
                            </Card.Body>
                        </Card>
                        <br/>
                        <Card bg={"secondary"} className={"text-white"}>
                            <Card.Header>🖥️ Programming language</Card.Header>
                            <Card.Body >
                                <Card.Text>Javascript</Card.Text>
                                <Card.Text>Java</Card.Text>
                                <Card.Text>Python</Card.Text>
                                <Card.Text>C++</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} xl={4} className={"p-1"}>
                        <Card bg={"danger"} className={"text-white"}>
                            <Card.Header>📝 Description</Card.Header>
                            <Card.Body >
                                <Card.Text>
                                    เป็นนักศึกษาปี 3 จากพระนครเหนือ ของภาควิชาการคอมพิวเตอร์
                                </Card.Text>
                                <Card.Text>
                                    ชอบการเรียนคอมพิวเตอร์มาตั้งแต่เด็กจึงตัดสินใจมาเรียน
                                    ด้านนี้
                                </Card.Text>
                                <Card.Text>
                                    ชอบอ่านข่าวอัพเดตเรื่องต่างๆทางด้านไอที รวมถึงอุปกรณ์ใหม่ๆ แต่ไม่มีเงินซื้อ T T
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br/>
                        <Card bg={"info"} className={"text-light"} >
                            <Card.Header>☎️ Contacts</Card.Header>
                            <Card.Body >
                                <Card.Text>first545455@gmail.com</Card.Text>
                                <Card.Text>0922085128</Card.Text>
                                <Card.Text>Line ID first5455</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Project/>
            </Container>
        </>)
}
export default  Profile;