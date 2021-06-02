import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, Col, Row, Button, ButtonGroup, Modal, Form} from "react-bootstrap";




function Project(){
    const [project,setProject] = useState([]);
    const [show, setShow] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [formName,setFormName] = useState("");
    const [sortBy, updateSortBy] = useState("id");
    const [sortType, updateSortType] = useState("asc");
    const [formMode,setFormMode] = useState("add");
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [rating,setRating] = useState(1);
    const [dates,setDates] = useState(null);
    const [editId,setEditId] = useState(null);
    const [isrender,setIsrender] = useState(true);

    const handleSortBy = (event)=>{
        event.preventDefault();
        updateSortBy(event.target.id);
    }

    const handleSortType = (event)=>{
        event.preventDefault();
        updateSortType(event.target.id);
    }

    const handleClose = () => {
        setShow(false)
        setConfirm(false);
    };
    const handleAdd = () => {
        setFormMode("add");
        setFormName("Add New Project");
        setName('');
        setDescription('');
        setRating('');
        setRating('');
        setDates(null);
        setShow(true);
    }

    const handleEdit = async (event)=>{
        setFormMode("edit")
        setFormName("Edit Project");
        setShow(true);
        setEditId(event.target.id);
        await axios.get(`http://localhost:8080/api/v1/project/?projectId=${event.target.id}`)
            .then(response=>{
                setName(response.data.name);
                setDescription(response.data.description);
                setRating(response.data.rating);
                setRating(response.data.rating);
                setDates(response.data.dates);
            })
            .catch(error=>{
                console.log(error,"error fetch with id")
            })
    }

    const handleDelete = (event)=>{
        setConfirm(true);
        setEditId(event.target.id);
    }

    async function handleForm(event){
        if(formMode === "edit"){
            console.log("edit mode");
            editData(event);
        }
        else {
            console.log("add mode");
            addData(event);
        }
    }

    async function editData(event){
        event.preventDefault();
        await axios.put(`http://localhost:8080/api/v1/project/?projectId=${editId}`,{
            name: name,
            description: description,
            rating: rating,
            dates: dates
        })
        handleClose();
        setIsrender(true);
    }

    async function addData(event){
        event.preventDefault();
        await axios.post("http://localhost:8080/api/v1/project/",{
            name: name,
            description: description,
            rating: rating,
            dates: dates
        }).catch((error)=>{alert(error+" : Api Error")})
        handleClose();
        setIsrender(true);
    }
    async function deleteData() {
        await axios.delete(`http://localhost:8080/api/v1/project/?projectId=${editId}`)
        handleClose();
        setIsrender(true);
    }

    useEffect(()=>{
        async function fetchData(){
            await axios.get(`http://localhost:8080/api/v1/project/?sort=${sortBy}&type=${sortType}`)
                .then(response =>{
                    let cardObject=[];
                    for(let i =0 ;i < response.data.length;i++){
                        let star = ()=>{
                            let out = "";
                            for(let loop = 0 ;loop < response.data[i].rating;loop++){
                                out += "⭐" ;
                            }
                            return out;
                        }
                        cardObject[i]=[
                            <Col xs={12} xl={6} className={"p-1"}>
                                <Card bg={"primary"} text={"light"}>
                                    <Card.Header>
                                        <Card.Title>{response.data[i].name}</Card.Title>
                                        <Card.Subtitle>ID: {response.data[i].id}</Card.Subtitle>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text>{response.data[i].description}</Card.Text>
                                        <Card.Text>{star()}</Card.Text>
                                        <Card.Text>{response.data[i].dates}</Card.Text>
                                        <Button id={response.data[i].id} onClick={handleEdit} variant={"warning"}>Edit</Button>
                                        <Button id={response.data[i].id} onClick={handleDelete} variant={"danger"}>Delete</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ]
                    }
                    setProject(cardObject);
                })
            setIsrender(false);
        }
        fetchData();
    },[sortBy,sortType,isrender])

    return (
    <>
        <Modal show={confirm}>
            <Modal.Body>Delete Project?</Modal.Body>
            <Modal.Footer>
                <Button variant={"danger"} onClick={deleteData}>Yes</Button>
                <Button variant={"secondary"} onClick={handleClose}>No</Button>
            </Modal.Footer>
        </Modal>
        <Modal show={show}>
            <Form onSubmit={handleForm} id={"formadd"}>
            <Modal.Header>
                <Modal.Title>{formName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                    <Form.Group controlId={"formEdit"}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type={"text"} name={"name"} value={name} onChange={(event => {setName(event.target.value)})} required />
                        <Form.Control.Feedback type={"invalid"}>Please Enter Project name</Form.Control.Feedback>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as={"textarea"} name={"description"} value={description} onChange={(event => {setDescription(event.target.value)})} />
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as={"select"} name={"rating"} value={rating} onChange={(event => {setRating(event.target.value)})}>
                            <option value={1}>⭐</option>
                            <option value={2}>⭐⭐</option>
                            <option value={3}>⭐⭐⭐</option>
                            <option value={4}>⭐⭐⭐⭐</option>
                            <option value={5}>⭐⭐⭐⭐⭐</option>
                        </Form.Control>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type={"date"} name={"dates"} value={dates} onChange={(event => {setDates(event.target.value)})} required/>
                    </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"secondary"} onClick={handleClose}>Close</Button>
                <Button variant={"success"} type={"submit"}>Save</Button>
            </Modal.Footer>
        </Form>
        </Modal>
        <Row xs={6} className={"p-1"}>
            <Col xs={12} xl={6}>
                <Button variant={"success"} onClick={handleAdd}>🆕 Add New Project</Button>
            </Col>
            <Col xs={12} xl={6} >
                <ButtonGroup>
                    <Button variant={"warning"} disabled={sortBy === "id"} id={"id"} onClick={handleSortBy}>🆔 Sort By ID</Button>
                    <Button variant={"warning"} disabled={sortBy === "dates"} id={"dates"} onClick={handleSortBy}>📅 Sort By Date</Button>
                    <Button variant={"warning"} disabled={sortBy === "rating"} id={"rating"} onClick={handleSortBy}>⭐ Sort By Rating</Button>
                </ButtonGroup>

            </Col>
        </Row>
        <Row>
            <Col xs={12} xl={6} className={"offset-xl-6"}>
                <ButtonGroup>
                    <Button variant={"success"} disabled={sortType === "asc"} id={"asc"} onClick={handleSortType}>⬆️ Ascended</Button>
                    <Button variant={"danger"}  disabled={sortType === "des"} id={"des"} onClick={handleSortType}>⬇️ Descended</Button>
                </ButtonGroup>
            </Col>
        </Row>
        <Row xs={6} className={"p-1"}>
        {project}
        </Row>
     </>
    )
}
export default Project;