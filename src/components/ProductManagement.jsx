import React, { useState } from 'react'
import { collection,addDoc,serverTimestamp,onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const ProductManagement = () => {

    const [form,setForm] = useState({
        name:"",
        description:"",
        price:"",
        image:""
    });

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();

        await addDoc(collection(db,"products"),{
            ...form,
        })
        alert("Product Added successfully.!")
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter Name.' name='name' value={form.name} onChange={handleChange} />
            <input type="text" placeholder='Enter Description.' name='description' value={form.description} onChange={handleChange} />
            <input type="text" placeholder='Enter Price.' name='price' value={form.price} onChange={handleChange} />
            <input type="text" placeholder='Enter Image-Url.' name='image' value={form.image} onChange={handleChange} />
            <button>Add Product</button>
        </form>
    </div>
  )
}

export default ProductManagement