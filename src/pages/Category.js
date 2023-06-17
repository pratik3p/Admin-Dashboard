import React, { useState,useEffect } from 'react'
import { Button, Card, Form, Tab, Table, Tabs } from 'react-bootstrap'
import axios from 'axios';
import { delCategory, fetchCaTegory, getCatByID, postCateGory, updateData } from './CategoryApi';
import moment from 'moment/moment';

const Category = () => {

  const [key, setKey]=useState("list-views");
  const[category,setCategory]=useState([]);
  const[categorydata,setCategorydata]=useState({categoryName:"",description:""});
  const[errors,setErrors]=useState({});
  const[onEdit,setOnEdit]=useState(false);
  const[categoryId,setCategoryId]=useState();

  useEffect(()=>{
    FetchData();
  },[key,categoryId]);

  const FetchData=async()=>{
 // console.log("Hii")
   let res= await fetchCaTegory(headers);
   
   var fetchedData=res.data.content;
   console.log(fetchedData);

   var tableData=[];

   fetchedData.map((cat)=>{
    //console.log(cat);

    tableData.push({
      categoryId:cat.categoryId,
      categoryName:cat.categoryName,
      description:cat.description,
      insertedDate:moment(cat.insertedDate).format("L"),
      createdBy:(cat.createdBy===null)? "No Name":cat.createdBy.userName,
    });

   });

   console.log(tableData);
   setCategory(tableData);
  }

    //! headers and tokens
    const user=JSON.parse(sessionStorage.getItem("user"));
   

    const headers={
      "Content-Type":"application/json",
      Authorization:"Bearer " + user.accessToken
    }



  const changehandler=(e)=>{
    setCategorydata({...categorydata,[e.target.name]:e.target.value, createdBy:{userId:user.userId} })
  }

  
  const setField=(field)=>{
    if(!!errors[field]){
      setErrors({...errors,[field]:null});
    }
  }

  const validateForm=()=>{
    const newErrors={};
    if(!categorydata.categoryName || categorydata.categoryName===""){
      newErrors.categoryName="CategoryName cannot be Empty"
    }else if(categorydata.categoryName.length<5){
      newErrors.categoryName="CategoryName is too short"
    }

    if(!categorydata.description || categorydata.description===""){
      newErrors.description="Description cannot be Empty"
    }

    return newErrors;
  }


  const postData = async (e)=>{

    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {

      postCateGory(categorydata,headers);
      setKey("list-view");
      setCategorydata({categoryName: "", description: ""});
      
    }   
  };

  const handleEdit=async(id)=>{
    console.log(id);
    setKey("Add");
    setOnEdit(true); 

    var res=await getCatByID(headers, id);
    console.log(res);
    setCategoryId(res.data.categoryId);
    setCategorydata({categoryName:res.data.categoryName,description:res.data.description});
  }

  const updateDaata= async(e)=>{
    e.preventDefault(); 
    console.log(categoryId);  

    var putData={...categorydata,categoryId, updatedBy:{userId:user.userId}}
    console.log(putData);
    var resp= await updateData(headers,putData);
    setKey("list-view");
    setOnEdit(false);
    setCategorydata({categoryName:"",description:""});
  }

  const removeCat=async(id)=>{

   await delCategory(id,headers);
   FetchData();
  }
  return (
    <React.Fragment>
        <main id="main" className='main'>
          <div>
            <h1>Category</h1>
            <nav>
              <ol className='breadcrumb'>
                <li className='breadcrumb-item'>Home</li>
                <li className='breadcrumb-item active'>Category</li>

              </ol>
            </nav>
          </div>

          <Card>
            <Card.Body>
            <Tabs
               activeKey={key}
               onSelect={(key)=>{setKey(key)}}
               className="mb-3"
            >
              <Tab eventKey="Add" title={onEdit ? "Edit" : "Add"}>
              <Form>
      <Form.Group className="mb-3">
        <Form.Label>Category Name:</Form.Label>
        <Form.Control 
        type="text" 
        name="categoryName" 
        placeholder="Enter Category Name" 
        value={categorydata.categoryName} 
        onChange={(e)=>{changehandler(e)
        setField("categoryName", e.target.value);}}
        isInvalid={!!errors.categoryName}
         />
         <Form.Control.Feedback type="invalid">{errors.categoryName}</Form.Control.Feedback>
       
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name="description" 
        placeholder="Enter Description"
         value={categorydata.description} 
         onChange={(e)=>{changehandler(e)
         setField("description", e.target.value);}}
          isInvalid={!!errors.description}
         />
         <Form.Control.Feedback type="invalid">
          {errors.description}
          </Form.Control.Feedback>

      </Form.Group>

      {onEdit ? <Button variant="primary" type="submit" onClick={updateDaata}>
        Update
      </Button> : <Button variant="primary" type="submit" onClick={postData}>
        Submit
      </Button>}
      
    </Form>
              </Tab>
              <Tab eventKey="list-view" title="List">
              <Table striped bordered >
      <thead>
        <tr>
          <th>ID</th>
          <th>Category Name</th>
          <th>Description Name</th>
          <th>Created By</th>
          <th>Time Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
         {category.map((c)=>{
          return(
            <tr>
              <td>{c.categoryId}</td>
              <td>{c.categoryName}</td>
              <td>{c.description}</td>
              <td>{c.createdBy}</td>
              <td>{c.insertedDate}</td>
              <td>
                <button className="btn btn-success m-2" onClick={()=>{handleEdit(c.categoryId)}}>Edit</button>
                <button className="btn btn-danger" onClick={()=>{removeCat(c.categoryId)}}>delete</button>
              </td>
            </tr>
          );
         })}
      </tbody>
    </Table>
              </Tab>
               
            </Tabs>
            </Card.Body>
          </Card>


        </main>
    </React.Fragment>
  )
}

export default Category