import React, { useState } from 'react';
import axios from 'axios';
import serverProxy from '../../config';
import { useHistory } from 'react-router-dom';
//import UserContext from '../../context/context';
import CreateProduct from '../../components/store/CreateProduct/CreateProduct'

const CreateProductPage = () => {
    //const { userData, setUserData } = useContext(formContext);  
    const history = useHistory();

    const [ formInputErrors, setFormInputErrors ] = useState(null)
    const [ formInputs, setFormInputs ] = useState({
        title: '',
        price: '',
        image: null,
        description: ''
    })

   
     //initialize form classes
     let 
     initialClass = "form-control form-input-bordercolor",
     titleClass = initialClass,
     priceClass = initialClass,
     descriptionClass = initialClass,
     imageClass = initialClass;

     //initialize error messages
    let
    initialErrorMessage = null,
    titleErrorMessage = initialErrorMessage,
    priceErrorMessage = initialErrorMessage,
    imageErrorMessage = initialErrorMessage,
    descriptionErrorMessage = initialErrorMessage;
    
 

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
    
    //submit form
    const submitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', formInputs.title);
        formData.append('price', formInputs.price);
        //check if image is selected
        if(formInputs.image){
            formData.append('image', formInputs.image, formInputs.image.name);
        }
        formData.append('description', formInputs.description);

        //send to backend
        const sendData = async () => {
           try {
               const addProductRes = await axios.post(`${serverProxy}/addproduct`, formData); 
               if(addProductRes.data.success){
                   history.push('/');
               }

           } catch (error) {
               if(error.response === undefined){
                  return setFormInputErrors(null)
               }
               setFormInputErrors(error.response.data.message)
               console.log(error.response.data)
           }
        }
        sendData();
    }
     
    //modify form classes if there are errors and display error messages
    if(formInputErrors){
        //check title
        const isTitleError = formInputErrors.find(e => e.param === 'title')    
        const addTitleClass = isTitleError ? 'is-invalid' : 'is-valid';
        const titArr = titleClass.split(' ');
        titArr.push(addTitleClass)
        titleClass = titArr.join(' ');
        titleErrorMessage = isTitleError && isTitleError.msg;

        //check price
        const isPriceError = formInputErrors.find(e => e.param === 'price')    
        const addPriceClass = isPriceError ? 'is-invalid' : 'is-valid';
        const priArr = priceClass.split(' ');
        priArr.push(addPriceClass)
        priceClass = priArr.join(' ');
        priceErrorMessage = isPriceError && isPriceError.msg;

        //check image
        const isImageError = formInputErrors.find(e => e.param === 'image')    
        const addImageClass = isImageError ? 'is-invalid' : 'is-valid';
        const imgArr = imageClass.split(' ');
        imgArr.push(addImageClass)
        imageClass = imgArr.join(' ');
        imageErrorMessage = isImageError && isImageError.msg;

        //check description
        const isDescriptionError = formInputErrors.find(e => e.param === 'description')    
        const addDescriptionClass = isDescriptionError ? 'is-invalid' : 'is-valid';
        const desArr = descriptionClass.split(' ');
        titArr.push(addDescriptionClass)
        descriptionClass = desArr.join(' ');
        descriptionErrorMessage = isDescriptionError && isDescriptionError.msg;
    }

    //organize error classes and messages for various fields
    const showError = {
        title: [ titleClass, titleErrorMessage ],
        price: [ priceClass, priceErrorMessage ],
        image: [ imageClass, imageErrorMessage ],
        description: [ descriptionClass, descriptionErrorMessage ]
    }

    
    return ( 
        <CreateProduct 
           title={formInputs.title}
           price={formInputs.price}
           image={formInputs.image}
           description={formInputs.description}
           showError={showError}
           change={(event) => changeHandler(event)}
           submit={submitHandler}
        />
     );
}
 
export default CreateProductPage;