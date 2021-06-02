import React, {useEffect, useState} from "react";
import {Card, Col, Container, Row} from "react-bootstrap"
import axios from "axios";
import {Doughnut} from 'react-chartjs-2'

function Covid() {
    const[covid,setCovid]=useState(0);
    const[death,setDeath]=useState(0);
    const[recover,setRecover]=useState(0);
    const data = {
        labels: ['Death', 'Recovered', 'Infected'],
        datasets: [
            {
                label: 'Thailand-Covid',
                data: [death,recover,covid],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                ],
                borderWidth: 1,
            },
        ],
    };
    useEffect(()=>{
        let caseCovid;
        let caseDeath;
        let caseRecovered;
        async function fetch(){
            await axios.get('https://disease.sh/v3/covid-19/countries/thailand?strict=true')
                .then(res =>{
                    caseCovid = res.data.cases;
                    caseDeath = res.data.deaths;
                    caseRecovered = res.data.recovered;
                })
            setCovid(caseCovid);
            setDeath(caseDeath);
            setRecover(caseRecovered);
        }
        fetch();
    })
    return (
        <>
            <Container>
                <Row className={"p-3"}>
                    <Col xs={12} xl={3}>
                        <Card bg={"warning"} className={"text-white"}>
                            <Card.Header>
                                <Card.Text >
                                    Thailand's Covid Report
                                </Card.Text>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>ติดเชื้อทั้งหมด {covid.toLocaleString()} คน</Card.Text>
                                <Card.Text>คนตายทั้งหมด {death.toLocaleString()} คน</Card.Text>
                                <Card.Text>หายป่วยแล้ว {recover.toLocaleString()} คน</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} xl={6}>
                        <Doughnut data={data}/>
                    </Col>
                </Row>
            </Container>
        </>)
}
export default  Covid;