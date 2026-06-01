import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getProducts = async () => {
    await onSnapshot(collection(db, "products"), (snapshot) => {
      const productData = snapshot.docs.map((p) => ({
        docId: p.id,
        ...p.data(),
      }));
      setProducts(productData);
    });
  };

  useEffect(() => {
    getProducts();
  }, [products]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
         const docRef = doc(db, "products", `${editId}`);
         await updateDoc(docRef,{
            ...form
         })
         alert("Product updated successfully.!!");
         setEditId(null)
    } else {
      await addDoc(collection(db, "products"), {
        ...form,
      });
      alert("Product Added successfully.!");
    }
  };

  const handleDelete = async (docId) => {
    const docRef = doc(db, "products", `${docId}`);
    await deleteDoc(docRef);
    alert("Product deleted successfully.!");
  };

  const handleEdit = async (p) => {
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image,
    });

    setEditId(p.docId);
  };

  return (
    <div>
      <table>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Pirce</th>
          <th>Action</th>
        </tr>
        {products.map((p) => (
          <tr key={p.docId}>
            <td>
              <img src={p.image} alt="" />
            </td>
            <td>{p.name}</td>
            <td>{p.description}</td>
            <td>{p.price}</td>
            <td>
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p.docId)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name."
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Description."
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Price."
          name="price"
          value={form.price}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Image-Url."
          name="image"
          value={form.image}
          onChange={handleChange}
        />
        <button>Add Product</button>
      </form>
    </div>
  );
};

export default ProductManagement;
