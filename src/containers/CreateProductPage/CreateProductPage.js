import React, { useState } from 'react';
import axios from 'axios';
import serverProxy from '../../config';
import { useHistory } from 'react-router-dom';
//import UserContext from '../../context/context';
import CreateProduct from '../../components/store/CreateProduct/CreateProduct'

const CreateProductPage = () => {
    //const { userData, setUserData } = useContext(formContext);
    const history = useHistory();
    
    const [ formInputs, setFormInputs ] = useState({
        title: '',
        price: '',
        image: null,
        description: ''
    })

   

    const changeHandler = (event) => {
        if(event.target.files){
            console.log(event.target.files, '------files-----');
          return setFormInputs({
                ...formInputs,
                image: event.target.files[0]
            })
        }
        setFormInputs({
            ...formInputs,
            [event.target.name]: event.target.value
        })
    }

    console.log(formInputs, '------+++------')

    const submitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', formInputs.title);
        formData.append('price', formInputs.price);
        formData.append('image', formInputs.image, formInputs.image.name);
        formData.append('description', formInputs.description);

        //send to backend
        const sendData = async () => {
           try {
               const addProductRes = await axios.post(`${serverProxy}/addproduct`, formData); 
               if(addProductRes.data.success){
                   history.push('/');
               }

           } catch (error) {
               console.log(error.response.data)
           }
        }
        sendData();
    }
    
    return ( 
        <CreateProduct 
           title={formInputs.title}
           price={formInputs.price}
           image={formInputs.image}
           description={formInputs.description}
           change={(event) => changeHandler(event)}
           submit={submitHandler}
        />
     );
}
 
export default CreateProductPage;