import axios from "axios";

export const postCateGory= async (cdata,head)=>{
    console.log(head);
    try{
        await  axios({
            method:"POST",
            url:"https://virtullearning.cloudjiffy.net/BitStreamIOLMSWeb/category/v1/createCategory",  

            headers:head,
            data:JSON.stringify(cdata),

        }).then(function(res){
            console.log(res.data);
            if(res.data.responseCode===201){
                alert(res.data.message);
            }else{
                alert(res.data.error);
            }
        });

    }catch(error){
        alert(error);
    }
   
} 

export const fetchCaTegory=async(head)=>{
   return await axios({
        method:"GET",
        url:"https://virtullearning.cloudjiffy.net/BitStreamIOLMSWeb/category/v1/getAllCategoryByPagination/{pageNumber}/{pageSize}?pageNumber=0&pageSize=10",
        headers:head
    });
}

export const getCatByID=async(head,id)=>{
    return await axios({
         method:"GET",
         url:`https://virtullearning.cloudjiffy.net/BitStreamIOLMSWeb/category/v1/getCategoryByCategoryId/{categoryId}?categoryId=${id}`,
         headers:head
     });
 }

 export const updateData=async(headers,data)=>{
    await axios({
        method:"PUT",
        url:"https://virtullearning.cloudjiffy.net/BitStreamIOLMSWeb/category/v1/updateCategory",
        data:JSON.stringify(data),
        headers:headers,
    }).then(function(res){
        console.log(res);
    });
    
 }

 export const delCategory=(id,headers)=>{
     axios({
        method:"Delete",
        url:`https://virtullearning.cloudjiffy.net/BitStreamIOLMSWeb/category/v1/deleteCategoryById/${id}`,
        headers:headers,
     });
 }